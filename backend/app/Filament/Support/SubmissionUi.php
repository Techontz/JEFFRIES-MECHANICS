<?php

namespace App\Filament\Support;

use App\Enums\SubmissionStatus;
use Filament\Actions\Action;
use Filament\Actions\BulkAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Infolists\Components\TextEntry;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Section;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Building blocks shared by every website-submission resource.
 */
class SubmissionUi
{
    public static function referenceColumn(): TextColumn
    {
        return TextColumn::make('reference')
            ->label('Ref.')
            ->searchable()
            ->copyable()
            ->fontFamily('mono')
            ->size('xs')
            ->color('gray');
    }

    public static function nameColumn(string $description = 'company'): TextColumn
    {
        return TextColumn::make('name')
            ->label('From')
            ->searchable(['name', 'email', $description])
            ->weight('bold')
            ->description(fn (Model $record) => $record->{$description} ?: $record->email);
    }

    public static function statusColumn(): TextColumn
    {
        return TextColumn::make('status')->badge()->sortable();
    }

    public static function receivedColumn(): TextColumn
    {
        return TextColumn::make('created_at')
            ->label('Received')
            ->since()
            ->dateTimeTooltip('M j, Y g:i A')
            ->sortable();
    }

    public static function statusFilter(): SelectFilter
    {
        return SelectFilter::make('status')->options(SubmissionStatus::class)->multiple();
    }

    public static function updateStatusAction(): Action
    {
        return Action::make('updateStatus')
            ->label('Update status')
            ->icon(Heroicon::OutlinedArrowPath)
            ->color('primary')
            ->modalWidth('lg')
            ->fillForm(fn (Model $record) => [
                'status' => $record->status,
                'internal_notes' => $record->internal_notes,
            ])
            ->schema([
                Select::make('status')->options(SubmissionStatus::class)->required()->native(false),
                Textarea::make('internal_notes')
                    ->label('Internal notes')
                    ->helperText('Only visible to the Jeffries Mechanicals team.')
                    ->rows(4)
                    ->maxLength(5000),
            ])
            ->action(function (Model $record, array $data) {
                $record->update($data);

                Notification::make()
                    ->title("{$record->reference} marked as {$record->status->getLabel()}")
                    ->success()
                    ->send();
            });
    }

    public static function bulkStatusAction(): BulkAction
    {
        return BulkAction::make('bulkStatus')
            ->label('Set status')
            ->icon(Heroicon::OutlinedArrowPath)
            ->schema([
                Select::make('status')->options(SubmissionStatus::class)->required()->native(false),
            ])
            ->action(fn (Collection $records, array $data) => $records->each->update(['status' => $data['status']]))
            ->deselectRecordsAfterCompletion();
    }

    public static function replyByEmailAction(): Action
    {
        return Action::make('reply')
            ->label('Email')
            ->icon(Heroicon::OutlinedEnvelope)
            ->color('gray')
            ->url(fn (Model $record) => 'mailto:'.$record->email.'?subject='.rawurlencode("Jeffries Mechanicals — {$record->reference}"));
    }

    public static function downloadAction(string $pathAttribute, string $nameAttribute, string $label): Action
    {
        return Action::make('download_'.$pathAttribute)
            ->label($label)
            ->icon(Heroicon::OutlinedArrowDownTray)
            ->color('gray')
            ->visible(fn (Model $record) => filled($record->{$pathAttribute}) && Storage::disk('local')->exists($record->{$pathAttribute}))
            ->action(fn (Model $record): StreamedResponse => Storage::disk('local')->download($record->{$pathAttribute}, $record->{$nameAttribute}));
    }

    /**
     * Contact details, identical across submission types.
     *
     * @param  array<int, mixed>  $extra
     */
    public static function contactSection(array $extra = []): Section
    {
        return Section::make('Contact')
            ->icon(Heroicon::OutlinedUser)
            ->columns(2)
            ->schema([
                TextEntry::make('name')->weight('bold'),
                TextEntry::make('company')->placeholder('—'),
                TextEntry::make('email')
                    ->icon(Heroicon::OutlinedEnvelope)
                    ->copyable()
                    ->url(fn (Model $record) => "mailto:{$record->email}"),
                TextEntry::make('phone')
                    ->icon(Heroicon::OutlinedPhone)
                    ->placeholder('—')
                    ->copyable()
                    ->url(fn (Model $record) => $record->phone ? 'tel:'.preg_replace('/[^\d+]/', '', $record->phone) : null),
                ...$extra,
            ]);
    }

    public static function trackingSection(): Section
    {
        return Section::make('Tracking')
            ->icon(Heroicon::OutlinedClipboardDocumentCheck)
            ->schema([
                TextEntry::make('reference')->fontFamily('mono')->copyable(),
                TextEntry::make('status')->badge(),
                TextEntry::make('created_at')->label('Received')->dateTime('M j, Y g:i A')->since()->dateTimeTooltip(),
                TextEntry::make('updated_at')->label('Last updated')->since(),
                TextEntry::make('internal_notes')->placeholder('No internal notes yet.')->columnSpanFull(),
            ]);
    }

    public static function subheading(Model $record): string
    {
        return "{$record::submissionLabel()} · {$record->status->getLabel()} · received {$record->created_at->format('M j, Y \\a\\t g:i A')}";
    }

    public static function rowClasses(Model $record): ?string
    {
        return $record->status === SubmissionStatus::New ? 'jm-row-new' : null;
    }

    public static function navigationBadge(string $modelClass): ?string
    {
        $count = $modelClass::query()->unhandled()->count();

        return $count > 0 ? (string) $count : null;
    }
}
