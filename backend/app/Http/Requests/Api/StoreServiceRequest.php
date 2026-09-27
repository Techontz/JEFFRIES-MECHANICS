<?php

namespace App\Http\Requests\Api;

use App\Enums\ServiceUrgency;
use Illuminate\Validation\Rule;

class StoreServiceRequest extends SubmissionRequest
{
    protected function fieldRules(): array
    {
        return [
            'name' => $this->nameRules(),
            'company' => ['nullable', 'string', 'max:160'],
            'email' => $this->emailRules(),
            'phone' => $this->phoneRules(),
            'site_address' => ['required', 'string', 'min:5', 'max:255'],
            'system_type' => $this->option('system_types'),
            'urgency' => ['required', Rule::enum(ServiceUrgency::class)],
            'description' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }
}
