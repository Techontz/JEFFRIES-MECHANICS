<?php

namespace App\Filament\Widgets;

use App\Support\SubmissionTypes;
use Filament\Widgets\ChartWidget;

class SubmissionsChart extends ChartWidget
{
    protected static ?int $sort = 4;

    protected ?string $heading = 'Website submissions — last 30 days';

    protected int|string|array $columnSpan = 'full';

    protected ?string $maxHeight = '260px';

    private const COLORS = ['#8E1B33', '#6B7280', '#C0A062', '#2F4858'];

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getData(): array
    {
        $days = collect(range(29, 0))->map(fn (int $daysAgo) => now()->subDays($daysAgo));

        $datasets = collect(SubmissionTypes::all())->values()->map(function (string $model, int $index) use ($days) {
            $counts = $model::query()
                ->where('created_at', '>=', $days->first()->copy()->startOfDay())
                ->pluck('created_at')
                ->countBy(fn ($date) => $date->toDateString());

            return [
                'label' => $model::submissionLabel().'s',
                'data' => $days->map(fn ($day) => $counts->get($day->toDateString(), 0))->all(),
                'backgroundColor' => self::COLORS[$index],
                'borderRadius' => 2,
            ];
        });

        return [
            'datasets' => $datasets->all(),
            'labels' => $days->map(fn ($day) => $day->format('M j'))->all(),
        ];
    }

    protected function getOptions(): array
    {
        return [
            'scales' => [
                'x' => ['stacked' => true, 'grid' => ['display' => false]],
                'y' => ['stacked' => true, 'beginAtZero' => true, 'ticks' => ['precision' => 0]],
            ],
            'plugins' => ['legend' => ['position' => 'bottom']],
        ];
    }
}
