<?php

namespace App\Http\Requests\Api;

use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class StoreCareerApplication extends SubmissionRequest
{
    protected function fieldRules(): array
    {
        return [
            'job_opening_id' => ['nullable', 'integer', Rule::exists('job_openings', 'id')->where('is_published', true)],
            'position' => ['required_without:job_opening_id', 'nullable', 'string', Rule::in(config('jeffries.options.trades'))],
            'name' => $this->nameRules(),
            'email' => $this->emailRules(),
            'phone' => $this->phoneRules(),
            'location' => ['nullable', 'string', 'max:160'],
            'experience' => $this->option('experience', required: false),
            'cover_letter' => ['nullable', 'string', 'max:5000'],
            'resume' => [
                'required',
                File::types(config('jeffries.uploads.resume_types'))->max(config('jeffries.uploads.resume_max_kb')),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'resume.required' => 'Please attach your resume (PDF or Word).',
            'position.required_without' => 'Select the trade or position you are applying for.',
        ];
    }
}
