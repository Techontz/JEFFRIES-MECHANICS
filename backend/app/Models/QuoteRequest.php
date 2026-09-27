<?php

namespace App\Models;

use App\Contracts\Submission;
use App\Filament\Resources\QuoteRequests\QuoteRequestResource;
use App\Models\Concerns\IsSubmission;
use Database\Factories\QuoteRequestFactory;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'status', 'name', 'company', 'email', 'phone', 'preferred_contact', 'service', 'market',
    'project_type', 'project_location', 'timeline', 'budget_range', 'description',
    'attachment_path', 'attachment_name', 'internal_notes', 'fingerprint', 'ip_address', 'user_agent',
])]
class QuoteRequest extends Model implements Submission
{
    /** @use HasFactory<QuoteRequestFactory> */
    use HasFactory, IsSubmission;

    protected static function referencePrefix(): string
    {
        return 'JMQ';
    }

    public static function submissionLabel(): string
    {
        return 'Quote request';
    }

    public static function submissionIcon(): Heroicon
    {
        return Heroicon::OutlinedDocumentCurrencyDollar;
    }

    public function submissionSummary(): string
    {
        return "{$this->service} · {$this->market} · {$this->project_location}";
    }

    public function adminUrl(): string
    {
        return QuoteRequestResource::getUrl('view', ['record' => $this]);
    }
}
