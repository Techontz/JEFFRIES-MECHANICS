<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Throwable;

use function Illuminate\Support\defer;

/**
 * Tells the Next.js site to refresh cached pages after admin content changes.
 */
class FrontendCache
{
    public static function refresh(string $scope): void
    {
        $secret = config('jeffries.revalidate_secret');

        if (blank($secret)) {
            return;
        }

        defer(function () use ($scope, $secret): void {
            try {
                Http::timeout(5)
                    ->withHeaders(['X-Revalidate-Secret' => $secret])
                    ->post(rtrim(config('jeffries.frontend_url'), '/').'/api/revalidate', ['scope' => $scope])
                    ->throw();
            } catch (Throwable $exception) {
                report($exception);
            }
        });
    }
}
