<?php

namespace Database\Factories;

use App\Enums\ServiceUrgency;
use App\Enums\SubmissionStatus;
use App\Models\ServiceRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ServiceRequest>
 */
class ServiceRequestFactory extends Factory
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
            'phone' => fake()->numerify('(816) ###-####'),
            'site_address' => fake()->streetAddress().', Kansas City, KS',
            'system_type' => fake()->randomElement(config('jeffries.options.system_types')),
            'urgency' => fake()->randomElement(ServiceUrgency::cases()),
            'description' => fake()->paragraph(),
            'fingerprint' => fake()->sha256(),
        ];
    }
}
