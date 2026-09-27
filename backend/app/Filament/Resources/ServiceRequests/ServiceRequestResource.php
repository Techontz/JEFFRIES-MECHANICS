<?php

namespace App\Filament\Resources\ServiceRequests;

use App\Filament\Resources\ServiceRequests\Pages\ListServiceRequests;
use App\Filament\Resources\ServiceRequests\Pages\ViewServiceRequest;
use App\Filament\Resources\ServiceRequests\Schemas\ServiceRequestInfolist;
use App\Filament\Resources\ServiceRequests\Tables\ServiceRequestsTable;
use App\Filament\Support\SubmissionUi;
use App\Models\ServiceRequest;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class ServiceRequestResource extends Resource
{
    protected static ?string $model = ServiceRequest::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedWrenchScrewdriver;

    protected static string|UnitEnum|null $navigationGroup = 'Requests';

    protected static ?int $navigationSort = 2;

    protected static ?string $recordTitleAttribute = 'reference';

    public static function infolist(Schema $schema): Schema
    {
        return ServiceRequestInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ServiceRequestsTable::configure($table);
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
        return 'New service requests';
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['reference', 'name', 'company', 'email'];
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListServiceRequests::route('/'),
            'view' => ViewServiceRequest::route('/{record}'),
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
