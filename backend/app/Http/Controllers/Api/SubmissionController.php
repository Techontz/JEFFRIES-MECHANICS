<?php

namespace App\Http\Controllers\Api;

use App\Contracts\Submission;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\StoreCareerApplication;
use App\Http\Requests\Api\StoreContactMessage;
use App\Http\Requests\Api\StoreQuoteRequest;
use App\Http\Requests\Api\StoreServiceRequest;
use App\Http\Requests\Api\SubmissionRequest;
use App\Models\CareerApplication;
use App\Models\ContactMessage;
use App\Models\JobOpening;
use App\Models\QuoteRequest;
use App\Models\ServiceRequest;
use App\Services\SubmissionIntake;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class SubmissionController extends Controller
{
    public function __construct(private SubmissionIntake $intake) {}

    public function quote(StoreQuoteRequest $request): JsonResponse
    {
        if ($request->isHoneypotFilled()) {
            return $this->decoy('JMQ');
        }

        $attributes = $request->safe()->except(['form_token', SubmissionRequest::HONEYPOT, 'attachment']);

        if ($request->hasFile('attachment')) {
            $upload = $this->intake->storeUpload($request->file('attachment'), 'quotes');
            $attributes += ['attachment_path' => $upload['path'], 'attachment_name' => $upload['name']];
        }

        return $this->respond(...$this->intake->record(
            QuoteRequest::class, $attributes, ['email', 'service', 'project_location', 'description'], $request,
        ));
    }

    public function service(StoreServiceRequest $request): JsonResponse
    {
        if ($request->isHoneypotFilled()) {
            return $this->decoy('JMS');
        }

        return $this->respond(...$this->intake->record(
            ServiceRequest::class,
            $request->safe()->except(['form_token', SubmissionRequest::HONEYPOT]),
            ['email', 'site_address', 'system_type', 'description'],
            $request,
        ));
    }

    public function contact(StoreContactMessage $request): JsonResponse
    {
        if ($request->isHoneypotFilled()) {
            return $this->decoy('JMC');
        }

        return $this->respond(...$this->intake->record(
            ContactMessage::class,
            $request->safe()->except(['form_token', SubmissionRequest::HONEYPOT]),
            ['email', 'subject', 'message'],
            $request,
        ));
    }

    public function career(StoreCareerApplication $request): JsonResponse
    {
        if ($request->isHoneypotFilled()) {
            return $this->decoy('JMA');
        }

        $attributes = $request->safe()->except(['form_token', SubmissionRequest::HONEYPOT, 'resume']);

        if ($openingId = $attributes['job_opening_id'] ?? null) {
            $attributes['position'] = JobOpening::findOrFail($openingId)->title;
        }

        $upload = $this->intake->storeUpload($request->file('resume'), 'resumes');
        $attributes += ['resume_path' => $upload['path'], 'resume_name' => $upload['name']];

        return $this->respond(...$this->intake->record(
            CareerApplication::class, $attributes, ['email', 'position'], $request,
        ));
    }

    private function respond(Model&Submission $submission, bool $created): JsonResponse
    {
        return response()->json([
            'reference' => $submission->reference,
            'duplicate' => ! $created,
            'message' => $created
                ? 'Thank you — your '.strtolower($submission::submissionLabel()).' has been received.'
                : 'We already have this request on file and will be in touch shortly.',
        ], $created ? 201 : 200);
    }

    /** Mimic a successful response so bots can't tell they were filtered. */
    private function decoy(string $prefix): JsonResponse
    {
        return response()->json([
            'reference' => $prefix.'-'.now()->format('ymd').'-'.Str::upper(Str::random(5)),
            'duplicate' => false,
            'message' => 'Thank you — your request has been received.',
        ], 201);
    }
}
