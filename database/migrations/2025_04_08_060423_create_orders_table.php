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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->unsignedBigInteger('user_id')->index()->nullable();
            $table->decimal('total_price', 10, 2);
            $table->string('payment_method')->nullable();
            $table->string('customer_name')->nullable();
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();
            $table->string('shipping_address')->nullable();
            $table->string('coupon_code')->nullable();
            $table->string('transaction_id', 255)->nullable();
            $table->string('receipt_file', 255)->nullable();
            $table->decimal('discount', 10, 2)->nullable();
            $table->enum('status', ['pending', 'confirmed', 'canceled', 'completed'])->default('pending');
            $table->enum('payment_status', [0, 1, 2, 3])->comment('0 initialize, 1 awaiting payment, 2 success, 3 cancel')->default(0);
            $table->string('order_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
