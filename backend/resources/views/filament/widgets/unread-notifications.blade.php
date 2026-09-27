<x-filament-widgets::widget>
    <x-filament::section icon="heroicon-o-bell-alert" :icon-color="$total ? 'danger' : 'gray'">
        <x-slot name="heading">
            Unread notifications
            @if ($total)
                <x-filament::badge color="danger" size="sm" style="display:inline-flex;margin-left:.35rem;vertical-align:middle">{{ $total }}</x-filament::badge>
            @endif
        </x-slot>

        @if ($total)
            <x-slot name="afterHeader">
                <x-filament::link tag="button" wire:click="markAllAsRead" size="sm" color="gray">Mark all read</x-filament::link>
            </x-slot>
        @endif

        @include('filament.widgets.partials.feed-styles')

        <div wire:poll.10s>
            @forelse ($notifications as $notification)
                @php($meta = $notification->data['submission'] ?? null)
                <a href="{{ $meta['url'] ?? '#' }}" class="jm-feed-row" wire:key="notification-{{ $notification->id }}">
                    <span class="jm-feed-dot"></span>
                    <span class="jm-feed-body">
                        <span class="jm-feed-title">{{ $meta['name'] ?? ($notification->data['title'] ?? 'Notification') }}</span>
                        <span class="jm-feed-meta">
                            {{ $meta['type'] ?? 'Update' }}
                            @isset($meta['reference']) · <span style="font-family:ui-monospace,monospace">{{ $meta['reference'] }}</span> @endisset
                        </span>
                    </span>
                    <span class="jm-feed-end">
                        <span class="jm-feed-meta" title="{{ $notification->created_at->format('M j, Y g:i A') }}">{{ $notification->created_at->diffForHumans(short: true) }}</span>
                    </span>
                </a>
            @empty
                <p class="jm-feed-empty">You're all caught up. New website submissions will show up here and in the bell.</p>
            @endforelse
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
