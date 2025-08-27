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
        Schema::create('manual_payment_gateways', function (Blueprint $table) {
            $table->id();
            $table->json('bank_information')->nullable();
            $table->enum('payment_type', ['custom_payment', 'bank_payment', 'cheque_payment'])->default('custom_payment');
            $table->enum('status', [0, 1])->comment('0 means inactive, 1 means active')->default(1);
            $table->timestamps();
        });

        Schema::create('manual_payment_gateway_contents', function (Blueprint $table) {
            $table->id();
            $table->string('language_code', 10)->index();
            $table->string('gateway_name', 255);
            $table->text('instructions');
            $table->foreignId('manual_payment_gateway_id')
                ->constrained('manual_payment_gateways')
                ->onDelete('cascade')
                ->name('mpg_contents_mpg_id_foreign');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manual_payment_gateway_contents');
        Schema::dropIfExists('manual_payment_gateways');
    }
};
