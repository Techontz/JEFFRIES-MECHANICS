<?php

namespace App\Http\Requests\Api;

use Illuminate\Validation\Rules\File;

class StoreQuoteRequest extends SubmissionRequest
{
    protected function fieldRules(): array
    {
        return [
            'name' => $this->nameRules(),
            'company' => ['nullable', 'string', 'max:160'],
            'email' => $this->emailRules(),
            'phone' => $this->phoneRules(),
            'preferred_contact' => $this->option('preferred_contact', required: false),
            'service' => $this->option('services'),
            'market' => $this->option('markets'),
            'project_type' => $this->option('project_types'),
            'project_location' => ['required', 'string', 'min:2', 'max:190'],
            'timeline' => $this->option('timelines', required: false),
            'budget_range' => $this->option('budget_ranges', required: false),
            'description' => ['required', 'string', 'min:20', 'max:5000'],
            'attachment' => [
                'nullable',
                File::types(config('jeffries.uploads.attachment_types'))->max(config('jeffries.uploads.attachment_max_kb')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'description.min' => 'Please give us a little more detail about the project (at least 20 characters).',
        ];
    }
}
