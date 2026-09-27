<?php

namespace App\Models;

use App\Services\FrontendCache;
use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

#[Fillable([
    'title', 'slug', 'market', 'service', 'location', 'completed_year', 'summary', 'description',
    'image_path', 'gallery', 'is_published', 'is_featured', 'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'gallery' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    protected static function booted(): void
    {
        static::saved(fn () => FrontendCache::refresh('projects'));
        static::deleted(fn () => FrontendCache::refresh('projects'));
        static::saving(fn (self $project) => $project->slug = $project->slug ?: Str::slug($project->title));

        static::deleted(function (self $project): void {
            Storage::disk('public')->delete(array_filter([$project->image_path, ...($project->gallery ?? [])]));
        });
    }

    public function imageUrl(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }

    /**
     * @return array<int, string>
     */
    public function galleryUrls(): array
    {
        return collect($this->gallery ?? [])
            ->filter()
            ->map(fn (string $path) => Storage::disk('public')->url($path))
            ->values()
            ->all();
    }

    /**
     * Published projects: featured first, then the admin-defined order.
     *
     * @param  Builder<static>  $query
     */
    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)
            ->orderByDesc('is_featured')
            ->orderBy('sort_order')
            ->latest();
    }
}
