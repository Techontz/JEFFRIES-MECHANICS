<?php

namespace App\Models;

use App\Services\FrontendCache;
use Database\Factories\JobOpeningFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

#[Fillable(['title', 'slug', 'trade', 'location', 'employment_type', 'summary', 'description', 'is_published', 'sort_order'])]
class JobOpening extends Model
{
    /** @use HasFactory<JobOpeningFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return ['is_published' => 'boolean'];
    }

    protected static function booted(): void
    {
        static::saved(fn () => FrontendCache::refresh('jobs'));
        static::deleted(fn () => FrontendCache::refresh('jobs'));
        static::saving(fn (self $opening) => $opening->slug = $opening->slug ?: Str::slug($opening->title));
    }

    /** @return HasMany<CareerApplication, $this> */
    public function applications(): HasMany
    {
        return $this->hasMany(CareerApplication::class);
    }

    /** @param  Builder<static>  $query */
    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)->orderBy('sort_order')->orderBy('title');
    }
}
