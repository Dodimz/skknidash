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
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->unsignedInteger('user_id');
            $table->string('media_url', 255);
            $table->string('type', 100)->nullable();
            $table->string('dimensions', 50)->nullable();
            $table->string('alt_text', 255)->nullable();
            $table->integer('size')->nullable();
            $table->string('driver', 50)->default(50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
