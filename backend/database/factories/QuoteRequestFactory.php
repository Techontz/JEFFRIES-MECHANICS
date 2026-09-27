<?php

namespace Database\Factories;

use App\Enums\SubmissionStatus;
use App\Models\QuoteRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<QuoteRequest>
 */
class QuoteRequestFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => SubmissionStatus::New,
            'name' => fake()->name(),
            'company' => fake()->company(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('(913) ###-####'),
            'preferred_contact' => fake()->randomElement(config('jeffries.options.preferred_contact')),
            'service' => fake()->randomElement(config('jeffries.options.services')),
            'market' => fake()->randomElement(config('jeffries.options.markets')),
            'project_type' => fake()->randomElement(config('jeffries.options.project_types')),
            'project_location' => fake()->city().', KS',
            'timeline' => fake()->randomElement(config('jeffries.options.timelines')),
            'budget_range' => fake()->randomElement(config('jeffries.options.budget_ranges')),
            'description' => fake()->paragraph(3),
            'fingerprint' => fake()->sha256(),
        ];
    }
}
