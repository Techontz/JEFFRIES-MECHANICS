<?php

namespace App\Notifications;

use App\Contracts\Submission;
use App\Models\User;
use Filament\Actions\Action;
use Filament\Notifications\Notification as FilamentNotification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SubmissionReceived extends Notification
{
    public function __construct(public Model&Submission $submission) {}

    /** @return array<int, string> */
    public function via(User $notifiable): array
    {
        return config('jeffries.notifications.mail') ? ['database', 'mail'] : ['database'];
    }

    /** @return array<string, mixed> */
    public function toDatabase(User $notifiable): array
    {
        $submission = $this->submission;

        return [
            ...FilamentNotification::make()
                ->title('New '.strtolower($submission::submissionLabel()).' from '.$submission->submitterName())
                ->body($submission->submissionSummary())
                ->icon($submission::submissionIcon())
                ->iconColor('danger')
                ->actions([
                    Action::make('view')
                        ->label('View request')
                        ->button()
                        ->url($submission->adminUrl())
                        ->markAsRead(),
                ])
                ->getDatabaseMessage(),
            // Structured metadata for the dashboard widgets.
            'submission' => [
                'type' => $submission::submissionLabel(),
                'id' => $submission->getKey(),
                'class' => $submission::class,
                'reference' => $submission->reference,
                'name' => $submission->submitterName(),
                'url' => $submission->adminUrl(),
            ],
        ];
    }

    public function toMail(User $notifiable): MailMessage
    {
        $submission = $this->submission;

        return (new MailMessage)
            ->subject("New {$submission::submissionLabel()} — {$submission->reference}")
            ->greeting('New website submission')
            ->line("{$submission->submitterName()} submitted a ".strtolower($submission::submissionLabel()).'.')
            ->line($submission->submissionSummary())
            ->action('Open in admin', $submission->adminUrl());
    }
}
