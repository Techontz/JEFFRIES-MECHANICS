<?php

namespace App\Filament\Resources\QuoteRequests\Pages;

use App\Filament\Resources\QuoteRequests\QuoteRequestResource;
use App\Filament\Support\HasSubmissionTabs;
use Filament\Resources\Pages\ListRecords;

class ListQuoteRequests extends ListRecords
{
    use HasSubmissionTabs;

    protected static string $resource = QuoteRequestResource::class;
}
