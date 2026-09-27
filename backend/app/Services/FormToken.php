<?php

namespace App\Services;

use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

/**
 * Encrypted, time-stamped token issued when a visitor opens a form.
 *
 * Bots that post directly (or submit faster than a person could) fail validation.
 */
class FormToken
{
    public static function issue(): string
    {
        return Crypt::encryptString((string) now()->getTimestamp());
    }

    public static function isValid(?string $token): bool
    {
        if (blank($token)) {
            return false;
        }

        try {
            $issuedAt = (int) Crypt::decryptString($token);
        } catch (DecryptException) {
            return false;
        }

        $age = now()->getTimestamp() - $issuedAt;

        return $age >= config('jeffries.spam.min_seconds')
            && $age <= config('jeffries.spam.token_ttl_hours') * 3600;
    }
}
