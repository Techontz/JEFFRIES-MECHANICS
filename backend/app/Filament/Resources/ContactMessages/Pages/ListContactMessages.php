<?php

namespace App\Filament\Resources\ContactMessages\Pages;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Support\HasSubmissionTabs;
use Filament\Resources\Pages\ListRecords;

class ListContactMessages extends ListRecords
{
    use HasSubmissionTabs;

    protected static string $resource = ContactMessageResource::class;
}
