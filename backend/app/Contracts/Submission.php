<?php

namespace App\Contracts;

use Filament\Support\Icons\Heroicon;

/**
 * A record submitted from the public website that the team needs to act on.
 */
interface Submission
{
    public static function submissionLabel(): string;

    public static function submissionIcon(): Heroicon;

    public function submitterName(): string;

    /** One-line context shown in notifications, e.g. the requested service. */
    public function submissionSummary(): string;

    public function adminUrl(): string;
}
