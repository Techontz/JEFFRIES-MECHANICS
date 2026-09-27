<?php

namespace App\Filament\Resources\CareerApplications;

use App\Filament\Resources\CareerApplications\Pages\ListCareerApplications;
use App\Filament\Resources\CareerApplications\Pages\ViewCareerApplication;
use App\Filament\Resources\CareerApplications\Schemas\CareerApplicationInfolist;
use App\Filament\Resources\CareerApplications\Tables\CareerApplicationsTable;
use App\Filament\Support\SubmissionUi;
use App\Models\CareerApplication;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class CareerApplicationResource extends Resource
{
    protected static ?string $model = CareerApplication::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedIdentification;

    protected static string|UnitEnum|null $navigationGroup = 'Requests';

    protected static ?int $navigationSort = 4;

    protected static ?string $recordTitleAttribute = 'reference';

    public static function infolist(Schema $schema): Schema
    {
        return CareerApplicationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CareerApplicationsTable::configure($table);
    }

    public static function getNavigationBadge(): ?string
    {
        return SubmissionUi::navigationBadge(static::$model);
    }

    public static function getNavigationBadgeColor(): string
    {
        return 'danger';
    }

    public static function getNavigationBadgeTooltip(): string
    {
        return 'New career applications';
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['reference', 'name', 'email', 'position'];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListCareerApplications::route('/'),
            'view' => ViewCareerApplication::route('/{record}'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
