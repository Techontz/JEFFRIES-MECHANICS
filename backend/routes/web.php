<?php

use Illuminate\Support\Facades\Route;

// The backend only serves the API and the admin panel; visitors to its root go to the website.
Route::redirect('/', config('jeffries.frontend_url'));
