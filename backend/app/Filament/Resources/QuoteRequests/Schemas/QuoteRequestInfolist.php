<?php

namespace App\Filament\Resources\QuoteRequests\Schemas;

use App\Filament\Support\SubmissionUi;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class QuoteRequestInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make([
                    SubmissionUi::contactSection([
                        TextEntry::make('preferred_contact')->label('Preferred contact')->placeholder('No preference'),
                    ]),
                    Section::make('Project')
                        ->icon(Heroicon::OutlinedBuildingOffice2)
                        ->columns(2)
                        ->schema([
                            TextEntry::make('service')->badge()->color('primary'),
                            TextEntry::make('market')->badge()->color('gray'),
                            TextEntry::make('project_type'),
                            TextEntry::make('project_location')->icon(Heroicon::OutlinedMapPin),
                            TextEntry::make('timeline')->placeholder('Not specified'),
                            TextEntry::make('budget_range')->placeholder('Not specified'),
                            TextEntry::make('description')->label('Project description')->columnSpanFull()->prose(),
                            TextEntry::make('attachment_name')->label('Attachment')->placeholder('No attachment')->icon(Heroicon::OutlinedPaperClip),
                        ]),
                ])->columnSpan(2),
                SubmissionUi::trackingSection()->columnSpan(1),
            ]);
    }
}
