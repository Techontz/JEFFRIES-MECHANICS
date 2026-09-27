<?php

namespace App\Filament\Support;

use Filament\Resources\Pages\ViewRecord;

/**
 * Opening a submission clears the matching bell notifications for the current admin.
 *
 * @mixin ViewRecord
 */
trait MarksSubmissionNotificationsAsRead
{
    public function mountMarksSubmissionNotificationsAsRead(): void
    {
        auth()->user()?->unreadNotifications()
            ->where('data->submission->class', $this->getRecord()::class)
            ->where('data->submission->id', $this->getRecord()->getKey())
            ->update(['read_at' => now()]);
    }
}
