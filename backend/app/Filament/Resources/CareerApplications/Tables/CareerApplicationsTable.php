<?php

namespace App\Filament\Resources\CareerApplications\Tables;

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

class CareerApplicationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->recordClasses(SubmissionUi::rowClasses(...))
            ->emptyStateIcon(Heroicon::OutlinedInbox)
            ->emptyStateHeading('No career applications yet')
            ->emptyStateDescription('New career applications submitted on the website appear here instantly, with a notification in the bell.')
            ->columns([
                SubmissionUi::referenceColumn(),
                SubmissionUi::nameColumn('location'),
                TextColumn::make('position')->searchable()->wrap(),
                TextColumn::make('experience')->toggleable(),
                SubmissionUi::statusColumn(),
                SubmissionUi::receivedColumn(),
            ])
            ->filters([
                SubmissionUi::statusFilter(),
                SelectFilter::make('job_opening_id')->label('Opening')->relationship('jobOpening', 'title'),
                TrashedFilter::make(),
            ])
            ->recordActions([
                SubmissionUi::updateStatusAction()->iconButton(),
                SubmissionUi::downloadAction('resume_path', 'resume_name', 'Resume')->iconButton(),
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
