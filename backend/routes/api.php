<?php

use App\Http\Controllers\Api\PublicContentController;
use App\Http\Controllers\Api\SubmissionController;
use Illuminate\Support\Facades\Route;

Route::controller(PublicContentController::class)->group(function () {
    Route::get('form-token', 'formToken')->middleware('throttle:60,1');
    Route::get('form-options', 'formOptions');
    Route::get('job-openings', 'jobOpenings');
    Route::get('projects', 'projects');
    Route::get('projects/{slug}', 'project')->where('slug', '[a-z0-9-]+');
});

Route::controller(SubmissionController::class)->middleware('throttle:submissions')->group(function () {
    Route::post('quote-requests', 'quote');
    Route::post('service-requests', 'service');
    Route::post('contact-messages', 'contact');
    Route::post('career-applications', 'career');
});
