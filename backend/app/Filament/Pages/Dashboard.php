<?php

namespace App\Filament\Pages;

use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    protected ?string $subheading = 'New website submissions appear here and in the bell within seconds.';

    public function getColumns(): int|array
    {
        return ['md' => 2, 'xl' => 3];
    }
}
