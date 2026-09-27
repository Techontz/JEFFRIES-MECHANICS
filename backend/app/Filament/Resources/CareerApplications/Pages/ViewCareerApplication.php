<?php

namespace App\Filament\Resources\CareerApplications\Pages;

use App\Filament\Resources\CareerApplications\CareerApplicationResource;
use App\Filament\Support\MarksSubmissionNotificationsAsRead;
use App\Filament\Support\SubmissionUi;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\ViewRecord;

class ViewCareerApplication extends ViewRecord
{
    use MarksSubmissionNotificationsAsRead;

    protected static string $resource = CareerApplicationResource::class;

    public function getSubheading(): string
    {
        return SubmissionUi::subheading($this->getRecord());
    }

    protected function getHeaderActions(): array
    {
        return [
            SubmissionUi::updateStatusAction(),
            SubmissionUi::replyByEmailAction(),
            SubmissionUi::downloadAction('resume_path', 'resume_name', 'Download resume'),
            DeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
