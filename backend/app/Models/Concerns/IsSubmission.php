<?php

namespace App\Models\Concerns;

use App\Enums\SubmissionStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * Shared behaviour for website submissions: reference numbers, status, soft deletes.
 */
trait IsSubmission
{
    use SoftDeletes;

    abstract protected static function referencePrefix(): string;

    public static function bootIsSubmission(): void
    {
        static::creating(function (self $submission): void {
            $submission->reference ??= static::referencePrefix().'-'.now()->format('ymd').'-'.Str::upper(Str::random(5));
            $submission->status ??= SubmissionStatus::New;
        });
    }

    public function initializeIsSubmission(): void
    {
        $this->mergeCasts(['status' => SubmissionStatus::class]);
        $this->mergeHidden(['fingerprint', 'ip_address', 'user_agent', 'internal_notes']);
    }

    public function submitterName(): string
    {
        return $this->name;
    }

    /** @param  Builder<static>  $query */
    public function scopeUnhandled(Builder $query): void
    {
        $query->where('status', SubmissionStatus::New);
    }

    /** @param  Builder<static>  $query */
    public function scopeOpen(Builder $query): void
    {
        $query->whereIn('status', SubmissionStatus::open());
    }
}
