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
        Schema::create('payment_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('plan_id')->index();
            $table->string('method', 100);
            $table->decimal('amount');
            $table->enum('status', ['pending', 'awaiting_payment', 'success', 'failed'])->default('pending');
            $table->string('name', 255);
            $table->string('email', 255);
            $table->string('mobile', 20);
            $table->string('whatsapp_or_skype', 20)->nullable();
            $table->text('note')->nullable();
            $table->string('payment_identifier', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_histories');
    }
};
