<?php

namespace App\Filament\Resources\ServiceRequests\Tables;

use App\Enums\ServiceUrgency;
use App\Filament\Support\SubmissionUi;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class ServiceRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->recordClasses(SubmissionUi::rowClasses(...))
            ->emptyStateIcon(Heroicon::OutlinedInbox)
            ->emptyStateHeading('No service requests yet')
            ->emptyStateDescription('New service requests submitted on the website appear here instantly, with a notification in the bell.')
            ->columns([
                SubmissionUi::referenceColumn(),
                SubmissionUi::nameColumn(),
                TextColumn::make('urgency')
                    ->badge()
                    ->formatStateUsing(fn (ServiceUrgency $state) => $state->name)
                    ->sortable(),
                TextColumn::make('system_type')->label('System')->wrap(),
                TextColumn::make('site_address')->label('Site')->limit(40)->toggleable(),
                SubmissionUi::statusColumn(),
                SubmissionUi::receivedColumn(),
            ])
            ->filters([
                SubmissionUi::statusFilter(),
                SelectFilter::make('urgency')->options(ServiceUrgency::class),
                TrashedFilter::make(),
            ])
            ->recordActions([
                SubmissionUi::updateStatusAction()->iconButton(),
                ViewAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    SubmissionUi::bulkStatusAction(),
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
