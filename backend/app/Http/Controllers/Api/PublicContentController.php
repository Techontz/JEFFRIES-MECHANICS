<?php

namespace App\Http\Controllers\Api;

use App\Enums\ServiceUrgency;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectResource;
use App\Models\JobOpening;
use App\Models\Project;
use App\Services\FormToken;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicContentController extends Controller
{
    public function formToken(): JsonResponse
    {
        return response()->json(['token' => FormToken::issue()])
            ->header('Cache-Control', 'no-store');
    }

    public function formOptions(): JsonResponse
    {
        return response()->json([
            ...config('jeffries.options'),
            'urgencies' => collect(ServiceUrgency::cases())
                ->map(fn (ServiceUrgency $urgency) => ['value' => $urgency->value, 'label' => $urgency->getLabel()])
                ->all(),
            'uploads' => config('jeffries.uploads'),
        ]);
    }

    public function jobOpenings(): JsonResponse
    {
        return response()->json([
            'data' => JobOpening::query()->published()
                ->get(['id', 'title', 'slug', 'trade', 'location', 'employment_type', 'summary', 'description']),
        ]);
    }

    public function projects(): AnonymousResourceCollection
    {
        return ProjectResource::collection(Project::query()->published()->get());
    }

    public function project(string $slug): ProjectResource
    {
        return new ProjectResource(Project::query()->where('is_published', true)->where('slug', $slug)->firstOrFail());
    }
}
