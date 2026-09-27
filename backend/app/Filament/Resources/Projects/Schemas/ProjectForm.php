<?php

namespace App\Filament\Resources\Projects\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class ProjectForm
{
    /** Web-safe raster formats only — no SVG (script-capable) uploads. */
    private const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    public static function configure(Schema $schema): Schema
    {
        $options = fn (string $list) => fn () => array_combine(config("jeffries.options.{$list}"), config("jeffries.options.{$list}"));

        return $schema
            ->columns(3)
            ->components([
                Section::make('Project')
                    ->icon(Heroicon::OutlinedBuildingOffice2)
                    ->columnSpan(2)
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')->required()->maxLength(160)->columnSpanFull(),
                        Select::make('market')->label('Category / market')->options($options('markets'))->required()->native(false),
                        Select::make('service')->options($options('services'))->required()->native(false),
                        TextInput::make('location')->maxLength(160)->placeholder('Kansas City, KS'),
                        TextInput::make('completed_year')->label('Year completed')->numeric()->minValue(1990)->maxValue((int) date('Y') + 1),
                        Textarea::make('summary')
                            ->helperText('One or two sentences shown on the Our Work grid.')
                            ->required()
                            ->rows(3)
                            ->maxLength(500)
                            ->columnSpanFull(),
                        Textarea::make('description')
                            ->label('Full description')
                            ->helperText('Scope, challenges and results. Shown on the project detail page.')
                            ->rows(8)
                            ->maxLength(10000)
                            ->columnSpanFull(),
                        TextInput::make('slug')->helperText('Leave blank to generate from the title.')->maxLength(180)->unique(ignoreRecord: true)->alphaDash()->columnSpanFull(),
                    ]),
                Section::make('Publishing')
                    ->icon(Heroicon::OutlinedGlobeAlt)
                    ->columnSpan(1)
                    ->schema([
                        Toggle::make('is_published')->label('Show on Our Work page'),
                        Toggle::make('is_featured')->label('Featured project')->helperText('Featured projects are shown first and larger.'),
                        TextInput::make('sort_order')->numeric()->default(0)->minValue(0)->helperText('Lower numbers appear first. You can also drag rows in the table.'),
                    ]),
                Section::make('Photography')
                    ->icon(Heroicon::OutlinedPhoto)
                    ->columnSpanFull()
                    ->columns(2)
                    ->schema([
                        FileUpload::make('image_path')
                            ->label('Cover photo')
                            ->image()
                            ->disk('public')
                            ->directory('projects')
                            ->imageEditor()
                            ->maxSize(8 * 1024)
                            ->acceptedFileTypes(self::IMAGE_TYPES),
                        FileUpload::make('gallery')
                            ->label('Gallery')
                            ->helperText('Up to 12 additional photos. Drag to reorder.')
                            ->image()
                            ->multiple()
                            ->reorderable()
                            ->maxFiles(12)
                            ->disk('public')
                            ->directory('projects/gallery')
                            ->maxSize(8 * 1024)
                            ->acceptedFileTypes(self::IMAGE_TYPES),
                    ]),
            ]);
    }
}
