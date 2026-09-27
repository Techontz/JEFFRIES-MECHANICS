<?php

namespace App\Http\Resources;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Project
 */
class ProjectResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'market' => $this->market,
            'service' => $this->service,
            'location' => $this->location,
            'completed_year' => $this->completed_year,
            'summary' => $this->summary,
            'description' => $this->description,
            'image_url' => $this->imageUrl(),
            'gallery' => $this->galleryUrls(),
            'is_featured' => $this->is_featured,
        ];
    }
}
