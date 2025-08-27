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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('ticket_id', 100);
            $table->enum('is_open', [0, 1])->default(0)->comment('0 not open, 1 open');
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('project_type', 100);
            $table->string('mobile_number', 20);
            $table->longText('message');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
