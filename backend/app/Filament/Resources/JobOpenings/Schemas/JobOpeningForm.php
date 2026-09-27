<?php

namespace App\Filament\Resources\JobOpenings\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class JobOpeningForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(3)
            ->components([
                Section::make('Opening')
                    ->columnSpan(2)
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')->required()->maxLength(160)->columnSpanFull(),
                        Select::make('trade')
                            ->options(fn () => array_combine(config('jeffries.options.trades'), config('jeffries.options.trades')))
                            ->required()
                            ->native(false),
                        Select::make('employment_type')
                            ->options(['Full-time' => 'Full-time', 'Part-time' => 'Part-time', 'Contract' => 'Contract', 'Apprenticeship' => 'Apprenticeship'])
                            ->default('Full-time')
                            ->required()
                            ->native(false),
                        TextInput::make('location')->default('Kansas City, KS')->required()->maxLength(160),
                        TextInput::make('slug')->helperText('Leave blank to generate from the title.')->maxLength(180)->unique(ignoreRecord: true),
                        Textarea::make('summary')->required()->rows(3)->maxLength(500)->columnSpanFull(),
                        Textarea::make('description')->label('Responsibilities & requirements')->rows(10)->maxLength(10000)->columnSpanFull(),
                    ]),
                Section::make('Publishing')
                    ->columnSpan(1)
                    ->schema([
                        Toggle::make('is_published')->label('Show on careers page'),
                        TextInput::make('sort_order')->numeric()->default(0)->minValue(0),
                    ]),
            ]);
    }
}
