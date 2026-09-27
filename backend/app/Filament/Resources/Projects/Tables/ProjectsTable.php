<?php

namespace App\Filament\Resources\Projects\Tables;

use App\Models\Project;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProjectsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('sort_order')
            ->reorderable('sort_order')
            ->columns([
                ImageColumn::make('image_path')->label('')->disk('public')->imageHeight(48)->imageWidth(72),
                TextColumn::make('title')->searchable()->weight('bold')->description(fn (Project $record) => $record->location),
                TextColumn::make('market')->label('Category')->badge()->color('gray'),
                TextColumn::make('service')->toggleable(),
                TextColumn::make('completed_year')->label('Year')->toggleable(),
                TextColumn::make('gallery')
                    ->label('Photos')
                    ->state(fn (Project $record) => count($record->gallery ?? []) + ($record->image_path ? 1 : 0))
                    ->badge()
                    ->color('gray'),
                IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean()
                    ->trueIcon(Heroicon::Star)
                    ->falseIcon(Heroicon::OutlinedStar)
                    ->trueColor('warning')
                    ->falseColor('gray'),
                ToggleColumn::make('is_published')->label('Published'),
            ])
            ->filters([
                TernaryFilter::make('is_published')->label('Published'),
                TernaryFilter::make('is_featured')->label('Featured'),
            ])
            ->recordActions([
                Action::make('preview')
                    ->label('View on site')
                    ->icon(Heroicon::OutlinedArrowTopRightOnSquare)
                    ->color('gray')
                    ->visible(fn (Project $record) => $record->is_published)
                    ->url(fn (Project $record) => rtrim(config('jeffries.frontend_url'), '/').'/our-work/'.$record->slug, shouldOpenInNewTab: true),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->emptyStateIcon(Heroicon::OutlinedPhoto)
            ->emptyStateHeading('No projects yet')
            ->emptyStateDescription('Add completed work with photos. Published projects appear automatically on the website’s Our Work page.');
    }
}
