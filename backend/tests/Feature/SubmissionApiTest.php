<?php

namespace Tests\Feature;

use App\Enums\SubmissionStatus;
use App\Models\CareerApplication;
use App\Models\ContactMessage;
use App\Models\JobOpening;
use App\Models\QuoteRequest;
use App\Models\ServiceRequest;
use App\Models\User;
use App\Notifications\SubmissionReceived;
use App\Services\FormToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SubmissionApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['jeffries.spam.min_seconds' => 0]);
        Storage::fake('local');
    }

    /**
     * @return array<string, mixed>
     */
    private function quotePayload(array $overrides = []): array
    {
        return [
            'form_token' => FormToken::issue(),
            'name' => 'Dana Whitfield',
            'company' => 'Wyandotte County Facilities',
            'email' => 'Dana@Example.com',
            'phone' => '(913) 555-0142',
            'preferred_contact' => 'Email',
            'service' => 'Mechanical Services',
            'market' => 'Government & Municipal',
            'project_type' => 'System replacement / upgrade',
            'project_location' => 'Kansas City, KS',
            'timeline' => '1–3 months',
            'budget_range' => 'Not yet determined',
            'description' => 'Replace two rooftop units and associated ductwork at the county annex.',
            ...$overrides,
        ];
    }

    public function test_form_token_endpoint_issues_a_token(): void
    {
        $this->getJson('/api/form-token')
            ->assertOk()
            ->assertJsonStructure(['token']);
    }

    public function test_form_options_expose_configured_lists(): void
    {
        $this->getJson('/api/form-options')
            ->assertOk()
            ->assertJsonPath('services.0', 'Mechanical Services')
            ->assertJsonPath('urgencies.2.value', 'emergency');
    }

    public function test_quote_request_is_stored_and_admins_are_notified(): void
    {
        Notification::fake();
        $admin = User::factory()->admin()->create();
        $nonAdmin = User::factory()->create();

        $response = $this->postJson('/api/quote-requests', $this->quotePayload([
            'attachment' => UploadedFile::fake()->create('Site Plan (rev 2).pdf', 200, 'application/pdf'),
        ]));

        $response->assertCreated()->assertJsonPath('duplicate', false);

        $quote = QuoteRequest::sole();
        $this->assertSame($response->json('reference'), $quote->reference);
        $this->assertStringStartsWith('JMQ-', $quote->reference);
        $this->assertSame(SubmissionStatus::New, $quote->status);
        $this->assertSame('dana@example.com', $quote->email);
        $this->assertSame('site-plan-rev-2.pdf', $quote->attachment_name);
        Storage::disk('local')->assertExists($quote->attachment_path);

        Notification::assertSentTo($admin, SubmissionReceived::class);
        Notification::assertNotSentTo($nonAdmin, SubmissionReceived::class);
    }

    public function test_database_notification_links_to_the_submission(): void
    {
        $admin = User::factory()->admin()->create();

        $this->postJson('/api/quote-requests', $this->quotePayload())->assertCreated();

        $notification = $admin->unreadNotifications()->sole();
        $this->assertSame('filament', $notification->data['format']);
        $this->assertSame('Quote request', $notification->data['submission']['type']);
        $this->assertSame('Dana Whitfield', $notification->data['submission']['name']);
        $this->assertStringContainsString('/admin/quote-requests/', $notification->data['submission']['url']);
    }

    public function test_duplicate_quote_request_is_not_stored_twice(): void
    {
        Notification::fake();
        User::factory()->admin()->create();

        $first = $this->postJson('/api/quote-requests', $this->quotePayload())->assertCreated();
        $second = $this->postJson('/api/quote-requests', $this->quotePayload())->assertOk();

        $this->assertTrue($second->json('duplicate'));
        $this->assertSame($first->json('reference'), $second->json('reference'));
        $this->assertSame(1, QuoteRequest::count());
        Notification::assertCount(1);
    }

    public function test_honeypot_submissions_are_silently_discarded(): void
    {
        $this->postJson('/api/quote-requests', $this->quotePayload(['website' => 'http://spam.example']))
            ->assertCreated();

        $this->assertSame(0, QuoteRequest::count());
    }

    public function test_missing_or_tampered_form_token_is_rejected(): void
    {
        $this->postJson('/api/quote-requests', $this->quotePayload(['form_token' => 'nope']))
            ->assertUnprocessable()
            ->assertJsonValidationErrors('form_token');
    }

    public function test_forms_submitted_too_quickly_are_rejected(): void
    {
        config(['jeffries.spam.min_seconds' => 3]);

        $this->postJson('/api/quote-requests', $this->quotePayload())
            ->assertUnprocessable()
            ->assertJsonValidationErrors('form_token');
    }

    public function test_quote_request_validates_fields(): void
    {
        $this->postJson('/api/quote-requests', $this->quotePayload([
            'email' => 'not-an-email',
            'phone' => '12345',
            'service' => 'Rocket repair',
            'description' => 'Too short',
        ]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['email', 'phone', 'service', 'description']);
    }

    public function test_executable_uploads_are_rejected(): void
    {
        $this->postJson('/api/quote-requests', $this->quotePayload([
            'attachment' => UploadedFile::fake()->createWithContent('plans.php', '<?php echo "hi";'),
        ]))
            ->assertUnprocessable()
            ->assertJsonValidationErrors('attachment');

        $this->assertSame(0, QuoteRequest::count());
    }

    public function test_service_request_is_stored(): void
    {
        $this->postJson('/api/service-requests', [
            'form_token' => FormToken::issue(),
            'name' => 'Marcus Lee',
            'email' => 'marcus@example.com',
            'phone' => '816-555-0199',
            'site_address' => '100 Main St, Kansas City, KS',
            'system_type' => 'Boilers / chillers',
            'urgency' => 'emergency',
            'description' => 'Boiler tripped overnight; no heat in the east wing.',
        ])->assertCreated();

        $this->assertSame('emergency', ServiceRequest::sole()->urgency->value);
    }

    public function test_contact_message_is_stored(): void
    {
        $this->postJson('/api/contact-messages', [
            'form_token' => FormToken::issue(),
            'name' => 'Priya Shah',
            'email' => 'priya@example.com',
            'subject' => 'Prime contractor / teaming',
            'message' => 'We are bidding a school renovation and need a mechanical sub.',
        ])->assertCreated();

        $this->assertSame(1, ContactMessage::count());
    }

    public function test_career_application_requires_a_resume_and_uses_opening_title(): void
    {
        $opening = JobOpening::factory()->create(['title' => 'Journeyman Pipefitter']);

        $payload = [
            'form_token' => FormToken::issue(),
            'job_opening_id' => $opening->id,
            'name' => 'Luis Ortega',
            'email' => 'luis@example.com',
            'phone' => '913-555-0100',
            'experience' => '5–10 years',
        ];

        $this->postJson('/api/career-applications', $payload)
            ->assertUnprocessable()
            ->assertJsonValidationErrors('resume');

        $this->postJson('/api/career-applications', [
            ...$payload,
            'resume' => UploadedFile::fake()->create('Luis Ortega Resume.pdf', 120, 'application/pdf'),
        ])->assertCreated();

        $application = CareerApplication::sole();
        $this->assertSame('Journeyman Pipefitter', $application->position);
        $this->assertTrue($application->jobOpening->is($opening));
    }

    public function test_unpublished_job_openings_are_hidden_and_not_applicable(): void
    {
        $hidden = JobOpening::factory()->unpublished()->create();
        JobOpening::factory()->create(['title' => 'Service Technician']);

        $this->getJson('/api/job-openings')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Service Technician');

        $this->postJson('/api/career-applications', [
            'form_token' => FormToken::issue(),
            'job_opening_id' => $hidden->id,
            'name' => 'Luis Ortega',
            'email' => 'luis@example.com',
            'phone' => '913-555-0100',
            'resume' => UploadedFile::fake()->create('resume.pdf', 50, 'application/pdf'),
        ])->assertJsonValidationErrors('job_opening_id');
    }

    public function test_submissions_are_rate_limited(): void
    {
        foreach (range(1, 5) as $attempt) {
            $this->postJson('/api/contact-messages', [])->assertUnprocessable();
        }

        $this->postJson('/api/contact-messages', [])->assertTooManyRequests();
    }
}
