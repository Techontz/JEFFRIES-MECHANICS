<?php

namespace App\Filament\Resources\CareerApplications\Pages;

use App\Filament\Resources\CareerApplications\CareerApplicationResource;
use App\Filament\Support\HasSubmissionTabs;
use Filament\Resources\Pages\ListRecords;

class ListCareerApplications extends ListRecords
{
    use HasSubmissionTabs;

    protected static string $resource = CareerApplicationResource::class;
}
