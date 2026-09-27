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
        Schema::create('service_requests', function (Blueprint $table) {
            $table->id();
            $table->string('reference')->unique();
            $table->string('status', 32)->default('new')->index();
            $table->string('name');
            $table->string('company')->nullable();
            $table->string('email');
            $table->string('phone', 32);
            $table->string('site_address');
            $table->string('system_type');
            $table->string('urgency', 16)->default('routine')->index();
            $table->text('description');
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
        Schema::dropIfExists('service_requests');
    }
};
