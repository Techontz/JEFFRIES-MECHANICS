<?php

namespace App\Http\Requests\Api;

use App\Rules\PhoneNumber;
use App\Services\FormToken;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Base request for public website forms: spam token, honeypot, shared field rules.
 */
abstract class SubmissionRequest extends FormRequest
{
    /** Hidden field real visitors never fill in. */
    public const HONEYPOT = 'website';

    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, mixed> */
    abstract protected function fieldRules(): array;

    /** @return array<string, mixed> */
    public function rules(): array
    {
        return [
            'form_token' => ['required', 'string', function (string $attribute, mixed $value, Closure $fail) {
                if (! FormToken::isValid($value)) {
                    $fail('This form has expired. Please refresh the page and try again.');
                }
            }],
            self::HONEYPOT => ['nullable'],
            ...$this->fieldRules(),
        ];
    }

    public function isHoneypotFilled(): bool
    {
        return filled($this->input(self::HONEYPOT));
    }

    protected function prepareForValidation(): void
    {
        $this->merge(collect($this->except(['attachment', 'resume']))
            ->map(fn ($value) => is_string($value) ? trim($value) : $value)
            ->all());

        if ($this->filled('email')) {
            $this->merge(['email' => strtolower($this->input('email'))]);
        }
    }

    /** @return array<int, mixed> */
    protected function nameRules(): array
    {
        return ['required', 'string', 'min:2', 'max:120'];
    }

    /** @return array<int, mixed> */
    protected function emailRules(): array
    {
        return ['required', 'string', 'email:rfc,strict', 'max:190'];
    }

    /** @return array<int, mixed> */
    protected function phoneRules(bool $required = true): array
    {
        return [$required ? 'required' : 'nullable', 'string', new PhoneNumber];
    }

    /** @return array<int, mixed> */
    protected function option(string $list, bool $required = true): array
    {
        return [$required ? 'required' : 'nullable', 'string', Rule::in(config("jeffries.options.{$list}"))];
    }
}
