<?php

namespace App\Filament\Resources\QuoteRequests\Pages;

use App\Filament\Resources\QuoteRequests\QuoteRequestResource;
use App\Filament\Support\MarksSubmissionNotificationsAsRead;
use App\Filament\Support\SubmissionUi;
use Filament\Actions\DeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\ViewRecord;

class ViewQuoteRequest extends ViewRecord
{
    use MarksSubmissionNotificationsAsRead;

    protected static string $resource = QuoteRequestResource::class;

    public function getSubheading(): string
    {
        return SubmissionUi::subheading($this->getRecord());
    }

    protected function getHeaderActions(): array
    {
        return [
            SubmissionUi::updateStatusAction(),
            SubmissionUi::replyByEmailAction(),
            SubmissionUi::downloadAction('attachment_path', 'attachment_name', 'Download attachment'),
            DeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
