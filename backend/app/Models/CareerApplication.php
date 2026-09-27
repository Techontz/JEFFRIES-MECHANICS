<?php

namespace App\Models;

use App\Contracts\Submission;
use App\Filament\Resources\CareerApplications\CareerApplicationResource;
use App\Models\Concerns\IsSubmission;
use Database\Factories\CareerApplicationFactory;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'status', 'job_opening_id', 'position', 'name', 'email', 'phone', 'location', 'experience',
    'resume_path', 'resume_name', 'cover_letter', 'internal_notes', 'fingerprint', 'ip_address', 'user_agent',
])]
class CareerApplication extends Model implements Submission
{
    /** @use HasFactory<CareerApplicationFactory> */
    use HasFactory, IsSubmission;

    /** @return BelongsTo<JobOpening, $this> */
    public function jobOpening(): BelongsTo
    {
        return $this->belongsTo(JobOpening::class);
    }

    protected static function referencePrefix(): string
    {
        return 'JMA';
    }

    public static function submissionLabel(): string
    {
        return 'Career application';
    }

    public static function submissionIcon(): Heroicon
    {
        return Heroicon::OutlinedIdentification;
    }

    public function submissionSummary(): string
    {
        return $this->position.($this->experience ? " · {$this->experience}" : '');
    }

    public function adminUrl(): string
    {
        return CareerApplicationResource::getUrl('view', ['record' => $this]);
    }
}
