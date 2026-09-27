<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_published_projects_are_listed_featured_first(): void
    {
        Project::factory()->create(['title' => 'Boiler Replacement', 'sort_order' => 1]);
        Project::factory()->featured()->create(['title' => 'Municipal HVAC Retrofit', 'sort_order' => 5]);
        Project::factory()->unpublished()->create(['title' => 'Draft Project']);

        $this->getJson('/api/projects')
            ->assertOk()
            ->assertJsonCount(2, 'data')
            ->assertJsonPath('data.0.title', 'Municipal HVAC Retrofit')
            ->assertJsonPath('data.0.is_featured', true)
            ->assertJsonStructure(['data' => [['slug', 'market', 'service', 'summary', 'description', 'image_url', 'gallery']]]);
    }

    public function test_single_project_is_available_by_slug_only_when_published(): void
    {
        Storage::fake('public');
        $project = Project::factory()->create([
            'title' => 'County Annex Rooftop Units',
            'gallery' => ['projects/gallery/a.jpg', 'projects/gallery/b.jpg'],
        ]);
        $draft = Project::factory()->unpublished()->create();

        $this->getJson("/api/projects/{$project->slug}")
            ->assertOk()
            ->assertJsonPath('data.slug', 'county-annex-rooftop-units')
            ->assertJsonCount(2, 'data.gallery');

        $this->getJson("/api/projects/{$draft->slug}")->assertNotFound();
    }

    public function test_deleting_a_project_removes_its_photos(): void
    {
        Storage::fake('public');
        $cover = UploadedFile::fake()->image('cover.jpg')->store('projects', 'public');
        $photo = UploadedFile::fake()->image('photo.jpg')->store('projects/gallery', 'public');
        $project = Project::factory()->create(['image_path' => $cover, 'gallery' => [$photo]]);

        $project->delete();

        Storage::disk('public')->assertMissing([$cover, $photo]);
    }

    public function test_admin_project_editor_renders(): void
    {
        $this->actingAs(User::factory()->admin()->create());
        $project = Project::factory()->featured()->create();

        $this->get("/admin/projects/{$project->id}/edit")->assertOk()->assertSee($project->title);
    }

    public function test_saving_a_project_asks_the_website_to_refresh(): void
    {
        config(['jeffries.revalidate_secret' => 'test-secret', 'jeffries.frontend_url' => 'https://example.test']);
        Http::fake(['example.test/*' => Http::response(['revalidated' => true])]);
        $this->withoutDefer();

        Project::factory()->create();

        Http::assertSent(fn (Request $request) => $request->url() === 'https://example.test/api/revalidate'
            && $request->header('X-Revalidate-Secret')[0] === 'test-secret'
            && $request['scope'] === 'projects');
    }

    public function test_no_refresh_is_sent_without_a_secret(): void
    {
        config(['jeffries.revalidate_secret' => null]);
        Http::fake();
        $this->withoutDefer();

        Project::factory()->create();

        Http::assertNothingSent();
    }
}
