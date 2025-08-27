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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('generate_id', 50);
            $table->unsignedBigInteger('user_id')->index();
            $table->string('subject', 255);
            $table->longText('message');
            $table->string('documents')->nullable();
            $table->string('original_file_name')->nullable();
            $table->enum('properly', ['high', 'low'])->default('high');
            $table->enum('status', ['pending', 'open', 'solved'])->default('pending');
            $table->boolean('is_viewed')->default(false);
            $table->boolean('is_client_viewed')->default(false);
            $table->timestamps();
        });

        Schema::create('ticket_replies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->longText('reply');
            $table->string('documents')->nullable();
            $table->foreign('ticket_id')->references('id')->on('tickets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_replies');
        Schema::dropIfExists('tickets');
    }
};
