<?php

namespace App\Filament\Resources\JobOpenings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;

class JobOpeningsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                TextColumn::make('title')->searchable()->weight('bold')->description(fn ($record) => $record->trade),
                TextColumn::make('employment_type')->badge()->color('gray'),
                TextColumn::make('location'),
                TextColumn::make('applications_count')->counts('applications')->label('Applications')->badge(),
                ToggleColumn::make('is_published')->label('Published'),
                TextColumn::make('updated_at')->since()->label('Updated')->sortable(),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
