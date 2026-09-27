<?php

namespace App\Filament\Resources\ServiceRequests\Pages;

use App\Filament\Resources\ServiceRequests\ServiceRequestResource;
use App\Filament\Support\HasSubmissionTabs;
use Filament\Resources\Pages\ListRecords;

class ListServiceRequests extends ListRecords
{
    use HasSubmissionTabs;

    protected static string $resource = ServiceRequestResource::class;
}
