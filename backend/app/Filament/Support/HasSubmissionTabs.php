<?php

namespace App\Filament\Support;

use App\Enums\SubmissionStatus;
use Filament\Resources\Pages\ListRecords;
use Filament\Schemas\Components\Tabs\Tab;
use Illuminate\Database\Eloquent\Builder;

/**
 * Status tabs (with live counts) for submission list pages.
 *
 * @mixin ListRecords
 */
trait HasSubmissionTabs
{
    public function getTabs(): array
    {
        $model = static::getResource()::getModel();
        $count = fn (array $statuses) => $model::query()->whereIn('status', $statuses)->count() ?: null;
        $inProgress = [SubmissionStatus::Reviewing, SubmissionStatus::Contacted, SubmissionStatus::InProgress];

        return [
            'all' => Tab::make('All'),
            'new' => Tab::make('New')
                ->icon(SubmissionStatus::New->getIcon())
                ->badge($count([SubmissionStatus::New]))
                ->badgeColor('danger')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', SubmissionStatus::New)),
            'active' => Tab::make('In progress')
                ->badge($count($inProgress))
                ->badgeColor('warning')
                ->modifyQueryUsing(fn (Builder $query) => $query->whereIn('status', $inProgress)),
            'completed' => Tab::make('Completed')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', SubmissionStatus::Completed)),
            'rejected' => Tab::make('Rejected')
                ->modifyQueryUsing(fn (Builder $query) => $query->where('status', SubmissionStatus::Rejected)),
        ];
    }
}
