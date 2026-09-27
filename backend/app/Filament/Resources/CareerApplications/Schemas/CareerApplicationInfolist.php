<?php

namespace App\Filament\Resources\CareerApplications\Schemas;

use App\Filament\Support\SubmissionUi;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class CareerApplicationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make([
                    SubmissionUi::contactSection([
                        TextEntry::make('location')->icon(Heroicon::OutlinedMapPin)->placeholder('—'),
                    ]),
                    Section::make('Application')
                        ->icon(Heroicon::OutlinedIdentification)
                        ->columns(2)
                        ->schema([
                            TextEntry::make('position')->badge()->color('primary'),
                            TextEntry::make('experience')->placeholder('Not specified'),
                            TextEntry::make('jobOpening.title')->label('Posted opening')->placeholder('General application'),
                            TextEntry::make('resume_name')->label('Resume')->icon(Heroicon::OutlinedPaperClip),
                            TextEntry::make('cover_letter')->label('Cover letter')->placeholder('No cover letter provided.')->columnSpanFull()->prose(),
                        ]),
                ])->columnSpan(2),
                SubmissionUi::trackingSection()->columnSpan(1),
            ]);
    }
}
