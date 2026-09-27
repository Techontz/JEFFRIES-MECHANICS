<?php

namespace App\Filament\Resources\ContactMessages\Tables;

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

class ContactMessagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->recordClasses(SubmissionUi::rowClasses(...))
            ->emptyStateIcon(Heroicon::OutlinedInbox)
            ->emptyStateHeading('No contact messages yet')
            ->emptyStateDescription('New contact messages submitted on the website appear here instantly, with a notification in the bell.')
            ->columns([
                SubmissionUi::referenceColumn(),
                SubmissionUi::nameColumn(),
                TextColumn::make('subject'),
                TextColumn::make('message')->limit(60)->toggleable()->color('gray'),
                SubmissionUi::statusColumn(),
                SubmissionUi::receivedColumn(),
            ])
            ->filters([
                SubmissionUi::statusFilter(),
                SelectFilter::make('subject')->options(fn () => array_combine(config('jeffries.options.contact_subjects'), config('jeffries.options.contact_subjects'))),
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
