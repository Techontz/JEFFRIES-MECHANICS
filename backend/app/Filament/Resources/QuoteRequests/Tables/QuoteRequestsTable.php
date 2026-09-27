<?php

namespace App\Filament\Resources\QuoteRequests\Tables;

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

class QuoteRequestsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->recordClasses(SubmissionUi::rowClasses(...))
            ->emptyStateIcon(Heroicon::OutlinedInbox)
            ->emptyStateHeading('No quote requests yet')
            ->emptyStateDescription('New quote requests submitted on the website appear here instantly, with a notification in the bell.')
            ->columns([
                SubmissionUi::referenceColumn(),
                SubmissionUi::nameColumn(),
                TextColumn::make('service')->searchable()->wrap(),
                TextColumn::make('market')->toggleable(),
                TextColumn::make('project_location')->label('Location')->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('attachment_name')->label('File')->icon(Heroicon::OutlinedPaperClip)->limit(18)->placeholder('—')->toggleable(),
                SubmissionUi::statusColumn(),
                SubmissionUi::receivedColumn(),
            ])
            ->filters([
                SubmissionUi::statusFilter(),
                SelectFilter::make('service')->options(fn () => array_combine(config('jeffries.options.services'), config('jeffries.options.services'))),
                SelectFilter::make('market')->options(fn () => array_combine(config('jeffries.options.markets'), config('jeffries.options.markets'))),
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
