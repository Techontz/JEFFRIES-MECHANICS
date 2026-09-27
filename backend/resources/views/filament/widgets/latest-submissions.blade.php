<x-filament-widgets::widget>
    <x-filament::section heading="Recent submissions" description="Everything submitted through the website, newest first." icon="heroicon-o-inbox-stack" icon-color="primary">
        @include('filament.widgets.partials.feed-styles')

        <div wire:poll.30s>

        @forelse ($submissions as $submission)
            <a href="{{ $submission->adminUrl() }}" class="jm-feed-row" wire:key="submission-{{ $submission::class }}-{{ $submission->getKey() }}">
                <span class="jm-feed-icon">
                    <x-filament::icon :icon="$submission::submissionIcon()" />
                </span>
                <span class="jm-feed-body">
                    <span class="jm-feed-title">
                        {{ $submission->submitterName() }}
                        <span class="jm-feed-meta">· {{ $submission::submissionLabel() }}</span>
                    </span>
                    <span class="jm-feed-meta jm-truncate">{{ $submission->submissionSummary() }}</span>
                </span>
                <span class="jm-feed-end">
                    <x-filament::badge :color="$submission->status->getColor()" size="sm">
                        {{ $submission->status->getLabel() }}
                    </x-filament::badge>
                    <span class="jm-feed-meta" title="{{ $submission->created_at->format('M j, Y g:i A') }}">
                        {{ $submission->created_at->diffForHumans(short: true) }}
                    </span>
                </span>
            </a>
        @empty
            <p class="jm-feed-empty">No submissions yet. New quote requests, service calls, messages and applications will appear here.</p>
        @endforelse
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
