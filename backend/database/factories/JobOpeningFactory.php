<?php

namespace Database\Factories;

use App\Models\JobOpening;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<JobOpening>
 */
class JobOpeningFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->jobTitle(),
            'trade' => fake()->randomElement(config('jeffries.options.trades')),
            'location' => 'Kansas City, KS',
            'employment_type' => 'Full-time',
            'summary' => fake()->sentence(16),
            'description' => fake()->paragraphs(3, true),
            'is_published' => true,
            'sort_order' => 0,
        ];
    }

    public function unpublished(): static
    {
        return $this->state(fn () => ['is_published' => false]);
    }
}
