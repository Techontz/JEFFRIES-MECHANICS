<?php

namespace App\Services;

use App\Contracts\Submission;
use App\Models\User;
use App\Notifications\SubmissionReceived;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;

/**
 * Persists a website submission, suppresses duplicates, and alerts the admin team.
 */
class SubmissionIntake
{
    /**
     * @template TModel of Model&Submission
     *
     * @param  class-string<TModel>  $modelClass
     * @param  array<string, mixed>  $attributes
     * @param  array<int, string>  $fingerprintFields  Attributes that identify a repeat submission.
     * @return array{0: TModel, 1: bool} The submission and whether it was newly created.
     */
    public function record(string $modelClass, array $attributes, array $fingerprintFields, Request $request): array
    {
        $fingerprint = $this->fingerprint($modelClass, $attributes, $fingerprintFields);

        $existing = $modelClass::query()
            ->where('fingerprint', $fingerprint)
            ->where('created_at', '>=', now()->subHours(config('jeffries.spam.duplicate_window_hours')))
            ->first();

        if ($existing) {
            return [$existing, false];
        }

        $submission = $modelClass::create([
            ...$attributes,
            'fingerprint' => $fingerprint,
            'ip_address' => $request->ip(),
            'user_agent' => Str::limit((string) $request->userAgent(), 500, ''),
        ]);

        Notification::send(User::query()->admins()->get(), new SubmissionReceived($submission));

        return [$submission, true];
    }

    /**
     * Store an upload on the private disk under a random name.
     *
     * @return array{path: string, name: string}
     */
    public function storeUpload(UploadedFile $file, string $directory): array
    {
        $original = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeName = Str::limit(Str::slug($original), 80, '') ?: 'file';

        return [
            'path' => $file->store("submissions/{$directory}", 'local'),
            'name' => $safeName.'.'.$file->extension(),
        ];
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @param  array<int, string>  $fields
     */
    private function fingerprint(string $modelClass, array $attributes, array $fields): string
    {
        $parts = collect($fields)
            ->map(fn (string $field) => Str::of((string) ($attributes[$field] ?? ''))->lower()->squish()->toString());

        return hash('sha256', $modelClass.'|'.$parts->implode('|'));
    }
}
