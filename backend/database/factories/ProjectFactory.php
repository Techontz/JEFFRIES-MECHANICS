<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(4),
            'market' => fake()->randomElement(config('jeffries.options.markets')),
            'service' => fake()->randomElement(config('jeffries.options.services')),
            'location' => fake()->city().', KS',
            'completed_year' => (string) fake()->numberBetween(2020, (int) date('Y')),
            'summary' => fake()->sentence(20),
            'description' => fake()->paragraphs(2, true),
            'is_published' => true,
            'is_featured' => false,
            'sort_order' => 0,
        ];
    }

    public function featured(): static
    {
        return $this->state(fn () => ['is_featured' => true]);
    }

    public function unpublished(): static
    {
        return $this->state(fn () => ['is_published' => false]);
    }
}
