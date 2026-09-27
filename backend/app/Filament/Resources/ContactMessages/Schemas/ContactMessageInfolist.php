<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use App\Filament\Support\SubmissionUi;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ContactMessageInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Group::make([
                    SubmissionUi::contactSection(),
                    Section::make('Message')
                        ->icon(Heroicon::OutlinedChatBubbleLeftRight)
                        ->schema([
                            TextEntry::make('subject')->badge()->color('gray'),
                            TextEntry::make('message')->hiddenLabel()->prose(),
                        ]),
                ])->columnSpan(2),
                SubmissionUi::trackingSection()->columnSpan(1),
            ]);
    }
}
