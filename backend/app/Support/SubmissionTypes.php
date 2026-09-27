<?php

namespace App\Support;

use App\Contracts\Submission;
use App\Models\CareerApplication;
use App\Models\ContactMessage;
use App\Models\QuoteRequest;
use App\Models\ServiceRequest;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class SubmissionTypes
{
    /** @return array<int, class-string<Model&Submission>> */
    public static function all(): array
    {
        return [QuoteRequest::class, ServiceRequest::class, ContactMessage::class, CareerApplication::class];
    }

    /**
     * The most recent submissions across every type, newest first.
     *
     * @return Collection<int, Model&Submission>
     */
    public static function latest(int $limit): Collection
    {
        return collect(static::all())
            ->flatMap(fn (string $model) => $model::query()->latest()->limit($limit)->get())
            ->sortByDesc('created_at')
            ->take($limit)
            ->values();
    }

    public static function unhandledCount(): int
    {
        return collect(static::all())->sum(fn (string $model) => $model::query()->unhandled()->count());
    }
}
