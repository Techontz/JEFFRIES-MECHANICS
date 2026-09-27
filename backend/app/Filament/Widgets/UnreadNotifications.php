<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class UnreadNotifications extends Widget
{
    protected static ?int $sort = 2;

    protected string $view = 'filament.widgets.unread-notifications';

    protected int|string|array $columnSpan = ['default' => 'full', 'xl' => 1];

    public function markAllAsRead(): void
    {
        auth()->user()->unreadNotifications()->update(['read_at' => now()]);
    }

    protected function getViewData(): array
    {
        $unread = auth()->user()->unreadNotifications();

        return [
            'total' => (clone $unread)->count(),
            'notifications' => $unread->latest()->limit(6)->get(),
        ];
    }
}
