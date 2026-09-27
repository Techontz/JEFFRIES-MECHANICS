<?php

namespace Database\Factories;

use App\Enums\SubmissionStatus;
use App\Models\CareerApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CareerApplication>
 */
class CareerApplicationFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => SubmissionStatus::New,
            'position' => fake()->randomElement(config('jeffries.options.trades')),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('(913) ###-####'),
            'location' => fake()->city().', KS',
            'experience' => fake()->randomElement(config('jeffries.options.experience')),
            'resume_path' => 'submissions/resumes/example.pdf',
            'resume_name' => 'resume.pdf',
            'cover_letter' => fake()->paragraph(),
            'fingerprint' => fake()->sha256(),
        ];
    }
}
