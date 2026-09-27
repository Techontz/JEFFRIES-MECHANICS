<?php

namespace App\Filament\Resources\ServiceRequests\Pages;

use App\Filament\Resources\ServiceRequests\ServiceRequestResource;
use App\Filament\Support\MarksSubmissionNotificationsAsRead;
use App\Filament\Support\SubmissionUi;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\ViewRecord;

class ViewServiceRequest extends ViewRecord
{
    use MarksSubmissionNotificationsAsRead;

    protected static string $resource = ServiceRequestResource::class;

    public function getSubheading(): string
    {
        return SubmissionUi::subheading($this->getRecord());
    }

    protected function getHeaderActions(): array
    {
        return [
            SubmissionUi::updateStatusAction(),
            SubmissionUi::replyByEmailAction(),
            DeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
