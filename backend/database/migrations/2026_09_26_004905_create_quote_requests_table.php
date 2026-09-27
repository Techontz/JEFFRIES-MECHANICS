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
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('status', 32)->default('new')->index();
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone', 32);
            $table->string('preferred_contact', 16)->nullable();
            $table->string('service');
            $table->string('market');
            $table->string('project_type');
            $table->string('project_location');
            $table->string('timeline')->nullable();
            $table->string('budget_range')->nullable();
            $table->text('description');
            $table->string('attachment_path')->nullable();
            $table->string('attachment_name')->nullable();
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
        Schema::dropIfExists('quote_requests');
    }
};
