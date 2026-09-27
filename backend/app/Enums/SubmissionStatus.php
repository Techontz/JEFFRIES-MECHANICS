<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Icons\Heroicon;

enum SubmissionStatus: string implements HasColor, HasIcon, HasLabel
{
    case New = 'new';
    case Reviewing = 'reviewing';
    case Contacted = 'contacted';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Rejected = 'rejected';

    public function getLabel(): string
    {
        return match ($this) {
            self::New => 'New',
            self::Reviewing => 'Reviewing',
            self::Contacted => 'Contacted',
            self::InProgress => 'In Progress',
            self::Completed => 'Completed',
            self::Rejected => 'Rejected',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::New => 'danger',
            self::Reviewing => 'warning',
            self::Contacted => 'info',
            self::InProgress => 'primary',
            self::Completed => 'success',
            self::Rejected => 'gray',
        };
    }

    public function getIcon(): Heroicon
    {
        return match ($this) {
            self::New => Heroicon::Sparkles,
            self::Reviewing => Heroicon::Eye,
            self::Contacted => Heroicon::Phone,
            self::InProgress => Heroicon::Wrench,
            self::Completed => Heroicon::CheckCircle,
            self::Rejected => Heroicon::XCircle,
        };
    }

    /**
     * Statuses that still need attention from the team.
     *
     * @return array<self>
     */
    public static function open(): array
    {
        return [self::New, self::Reviewing, self::Contacted, self::InProgress];
    }
}
