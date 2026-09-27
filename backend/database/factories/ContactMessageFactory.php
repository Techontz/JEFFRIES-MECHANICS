<?php

namespace Database\Factories;

use App\Enums\SubmissionStatus;
use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ContactMessage>
 */
class ContactMessageFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => SubmissionStatus::New,
            'name' => fake()->name(),
            'company' => fake()->optional()->company(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->optional()->numerify('(913) ###-####'),
            'subject' => fake()->randomElement(config('jeffries.options.contact_subjects')),
            'message' => fake()->paragraph(),
            'fingerprint' => fake()->sha256(),
        ];
    }
}
