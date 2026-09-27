<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/** North American or international phone number with 10–15 digits. */
class PhoneNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $digits = preg_replace('/\D/', '', (string) $value);

        if (! preg_match('/^\+?[\d\s().\-]{10,24}$/', (string) $value) || strlen($digits) < 10 || strlen($digits) > 15) {
            $fail('Enter a valid phone number, including area code.');
        }
    }
}
