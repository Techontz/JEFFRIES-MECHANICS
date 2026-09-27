<?php

namespace App\Filament\Resources\ServiceRequests\Schemas;

use App\Filament\Support\SubmissionUi;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ServiceRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make([
                    SubmissionUi::contactSection(),
                    Section::make('Service call')
                        ->icon(Heroicon::OutlinedWrenchScrewdriver)
                        ->columns(2)
                        ->schema([
                            TextEntry::make('urgency')->badge(),
                            TextEntry::make('system_type')->label('System'),
                            TextEntry::make('site_address')->label('Site address')->icon(Heroicon::OutlinedMapPin)->columnSpanFull(),
                            TextEntry::make('description')->label('Issue description')->columnSpanFull()->prose(),
                        ]),
                ])->columnSpan(2),
                SubmissionUi::trackingSection()->columnSpan(1),
            ]);
    }
}
