<?php

namespace App\Filament\Widgets;

use App\Support\SubmissionTypes;
use Filament\Widgets\Widget;

class LatestSubmissions extends Widget
{
    protected static ?int $sort = 3;

    protected string $view = 'filament.widgets.latest-submissions';

    protected int|string|array $columnSpan = ['default' => 'full', 'xl' => 2];

    protected function getViewData(): array
    {
        return ['submissions' => SubmissionTypes::latest(8)];
    }
}
