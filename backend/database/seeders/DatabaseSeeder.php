<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Create the initial admin account from ADMIN_EMAIL / ADMIN_PASSWORD.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@jeffriesmechanicals.com');
        $password = env('ADMIN_PASSWORD') ?: Str::password(20);

        $admin = User::query()->firstOrNew(['email' => $email]);

        if (! $admin->exists) {
            $admin->fill(['name' => 'Jeffries Admin', 'password' => $password])->save();
            $this->command?->info("Admin account created: {$email}".(env('ADMIN_PASSWORD') ? '' : " / {$password}"));
        }

        $admin->forceFill(['is_admin' => true])->save();
    }
}
