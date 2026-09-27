<?php

namespace App\Models;

use App\Contracts\Submission;
use App\Enums\ServiceUrgency;
use App\Filament\Resources\ServiceRequests\ServiceRequestResource;
use App\Models\Concerns\IsSubmission;
use Database\Factories\ServiceRequestFactory;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'status', 'name', 'company', 'email', 'phone', 'site_address', 'system_type', 'urgency',
    'description', 'internal_notes', 'fingerprint', 'ip_address', 'user_agent',
])]
class ServiceRequest extends Model implements Submission
{
    /** @use HasFactory<ServiceRequestFactory> */
    use HasFactory, IsSubmission;

    protected function casts(): array
    {
        return ['urgency' => ServiceUrgency::class];
    }

    protected static function referencePrefix(): string
    {
        return 'JMS';
    }

    public static function submissionLabel(): string
    {
        return 'Service request';
    }

    public static function submissionIcon(): Heroicon
    {
        return Heroicon::OutlinedWrenchScrewdriver;
    }

    public function submissionSummary(): string
    {
        return "{$this->system_type} · {$this->urgency->name} · {$this->site_address}";
    }

    public function adminUrl(): string
    {
        return ServiceRequestResource::getUrl('view', ['record' => $this]);
    }
}
