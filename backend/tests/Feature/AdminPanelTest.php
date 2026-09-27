<?php

namespace Tests\Feature;

use App\Enums\SubmissionStatus;
use App\Filament\Resources\QuoteRequests\Pages\ListQuoteRequests;
use App\Filament\Resources\QuoteRequests\Pages\ViewQuoteRequest;
use App\Models\CareerApplication;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Models\ServiceRequest;
use App\Models\User;
use App\Notifications\SubmissionReceived;
use Filament\Actions\Testing\TestAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_admins_can_access_the_panel(): void
    {
        $this->actingAs(User::factory()->create())->get('/admin')->assertForbidden();
        $this->actingAs(User::factory()->admin()->create())->get('/admin')->assertOk();
    }

    public function test_every_submission_view_page_renders(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        foreach ([QuoteRequest::class, ServiceRequest::class, ContactMessage::class, CareerApplication::class] as $model) {
            $record = $model::factory()->create();

            $this->get($record->adminUrl())->assertOk()->assertSee($record->reference);
        }
    }

    public function test_admin_can_update_status_from_the_list(): void
    {
        $this->actingAs(User::factory()->admin()->create());
        $quote = QuoteRequest::factory()->create();

        Livewire::test(ListQuoteRequests::class)
            ->assertCanSeeTableRecords([$quote])
            ->callAction(TestAction::make('updateStatus')->table($quote), [
                'status' => SubmissionStatus::Contacted,
                'internal_notes' => 'Called Dana, site walk Tuesday.',
            ])
            ->assertHasNoFormErrors();

        $quote->refresh();
        $this->assertSame(SubmissionStatus::Contacted, $quote->status);
        $this->assertSame('Called Dana, site walk Tuesday.', $quote->internal_notes);
    }

    public function test_viewing_a_submission_marks_its_notification_as_read(): void
    {
        $admin = User::factory()->admin()->create();
        $quote = QuoteRequest::factory()->create();
        $other = QuoteRequest::factory()->create();
        $admin->notify(new SubmissionReceived($quote));
        $admin->notify(new SubmissionReceived($other));

        $this->actingAs($admin);
        Livewire::test(ViewQuoteRequest::class, ['record' => $quote->getRouteKey()]);

        $this->assertSame(1, $admin->unreadNotifications()->count());
        $this->assertSame($other->id, $admin->unreadNotifications()->sole()->data['submission']['id']);
    }

    public function test_content_management_pages_render(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        foreach (['/admin/job-openings', '/admin/job-openings/create', '/admin/projects', '/admin/projects/create', '/admin/quote-requests', '/admin/service-requests', '/admin/contact-messages', '/admin/career-applications'] as $url) {
            $this->get($url)->assertOk();
        }
    }
}
