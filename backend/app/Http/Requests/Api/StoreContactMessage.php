<?php

namespace App\Http\Requests\Api;

class StoreContactMessage extends SubmissionRequest
{
    protected function fieldRules(): array
    {
        return [
            'name' => $this->nameRules(),
            'company' => ['nullable', 'string', 'max:160'],
            'email' => $this->emailRules(),
            'phone' => $this->phoneRules(required: false),
            'subject' => $this->option('contact_subjects'),
            'message' => ['required', 'string', 'min:10', 'max:5000'],
        ];
    }
}
