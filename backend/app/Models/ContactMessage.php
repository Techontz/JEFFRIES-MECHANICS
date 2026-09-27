<?php

namespace App\Models;

use App\Contracts\Submission;
use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Models\Concerns\IsSubmission;
use Database\Factories\ContactMessageFactory;
use Filament\Support\Icons\Heroicon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'status', 'name', 'company', 'email', 'phone', 'subject', 'message',
    'internal_notes', 'fingerprint', 'ip_address', 'user_agent',
])]
class ContactMessage extends Model implements Submission
{
    /** @use HasFactory<ContactMessageFactory> */
    use HasFactory, IsSubmission;

    protected static function referencePrefix(): string
    {
        return 'JMC';
    }

    public static function submissionLabel(): string
    {
        return 'Contact message';
    }

    public static function submissionIcon(): Heroicon
    {
        return Heroicon::OutlinedChatBubbleLeftRight;
    }

    public function submissionSummary(): string
    {
        return $this->subject;
    }

    public function adminUrl(): string
    {
        return ContactMessageResource::getUrl('view', ['record' => $this]);
    }
}
