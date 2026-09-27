<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum ServiceUrgency: string implements HasColor, HasLabel
{
    case Routine = 'routine';
    case Priority = 'priority';
    case Emergency = 'emergency';

    public function getLabel(): string
    {
        return match ($this) {
            self::Routine => 'Routine — schedule at next availability',
            self::Priority => 'Priority — within 48 hours',
            self::Emergency => 'Emergency — system down',
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Routine => 'gray',
            self::Priority => 'warning',
            self::Emergency => 'danger',
        };
    }
}
