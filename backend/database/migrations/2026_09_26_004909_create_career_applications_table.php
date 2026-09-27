<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('career_applications', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('status', 32)->default('new')->index();
            $table->foreignId('job_opening_id')->nullable()->constrained()->nullOnDelete();
            $table->string('position');
            $table->string('name');
            $table->string('email');
            $table->string('phone', 32);
            $table->string('location')->nullable();
            $table->string('experience')->nullable();
            $table->string('resume_path');
            $table->string('resume_name');
            $table->text('cover_letter')->nullable();
            $table->text('internal_notes')->nullable();
            $table->string('fingerprint', 64)->index();
            $table->ipAddress('ip_address')->nullable();
            $table->string('user_agent', 512)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_applications');
    }
};
