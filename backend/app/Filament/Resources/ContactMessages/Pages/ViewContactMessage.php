<?php

namespace App\Filament\Resources\ContactMessages\Pages;

use App\Filament\Resources\ContactMessages\ContactMessageResource;
use App\Filament\Support\MarksSubmissionNotificationsAsRead;
use App\Filament\Support\SubmissionUi;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\ViewRecord;

class ViewContactMessage extends ViewRecord
{
    use MarksSubmissionNotificationsAsRead;

    protected static string $resource = ContactMessageResource::class;

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
