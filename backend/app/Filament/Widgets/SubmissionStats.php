<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\CareerApplications\CareerApplicationResource;
use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Resources\QuoteRequests\QuoteRequestResource;
use App\Filament\Resources\ServiceRequests\ServiceRequestResource;
use App\Models\CareerApplication;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Models\ServiceRequest;
use App\Support\SubmissionTypes;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class SubmissionStats extends StatsOverviewWidget
{
    protected static ?int $sort = 1;

    protected ?string $pollingInterval = '15s';

    protected int|array|null $columns = ['md' => 3];

    protected function getStats(): array
    {
        $new = SubmissionTypes::unhandledCount();
        $unread = auth()->user()->unreadNotifications()->count();

        return [
            Stat::make('New requests', $new)
                ->description($new ? 'Awaiting first response' : 'All caught up')
                ->descriptionIcon($new ? Heroicon::OutlinedBellAlert : Heroicon::OutlinedCheckCircle)
                ->color($new ? 'danger' : 'success'),
            Stat::make('Unread notifications', $unread)
                ->description('Bell icon, top right')
                ->descriptionIcon(Heroicon::OutlinedBell)
                ->color($unread ? 'warning' : 'gray'),
            Stat::make('Quote requests', QuoteRequest::count())
                ->description($this->thisWeek(QuoteRequest::class).' this week')
                ->descriptionIcon(Heroicon::OutlinedDocumentCurrencyDollar)
                ->chart($this->dailyCounts(QuoteRequest::class))
                ->color('primary')
                ->url(QuoteRequestResource::getUrl()),
            Stat::make('Open service calls', ServiceRequest::query()->open()->count())
                ->description(ServiceRequest::query()->unhandled()->count().' new')
                ->descriptionIcon(Heroicon::OutlinedWrenchScrewdriver)
                ->chart($this->dailyCounts(ServiceRequest::class))
                ->url(ServiceRequestResource::getUrl()),
            Stat::make('Contact messages', ContactMessage::count())
                ->description(ContactMessage::query()->unhandled()->count().' new')
                ->descriptionIcon(Heroicon::OutlinedChatBubbleLeftRight)
                ->url(ContactMessageResource::getUrl()),
            Stat::make('Career applications', CareerApplication::count())
                ->description(CareerApplication::query()->unhandled()->count().' new')
                ->descriptionIcon(Heroicon::OutlinedIdentification)
                ->url(CareerApplicationResource::getUrl()),
        ];
    }

    private function thisWeek(string $model): int
    {
        return $model::query()->where('created_at', '>=', now()->startOfWeek())->count();
    }

    /** @return array<int, int> Submissions per day for the last 14 days. */
    private function dailyCounts(string $model): array
    {
        $counts = $model::query()
            ->where('created_at', '>=', now()->subDays(13)->startOfDay())
            ->pluck('created_at')
            ->countBy(fn ($date) => $date->toDateString());

        return collect(range(13, 0))
            ->map(fn (int $daysAgo) => $counts->get(now()->subDays($daysAgo)->toDateString(), 0))
            ->all();
    }
}
