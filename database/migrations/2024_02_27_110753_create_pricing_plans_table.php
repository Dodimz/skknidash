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
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('currency_id')->index();
            $table->decimal('price');
            $table->timestamps();
        });

        Schema::create('pricing_plan_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pricing_plan_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('name', 255);
            $table->string('plan_duration', 255)->nullable();
            $table->string('subtitle', 255)->nullable();
            $table->json('plan_features')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('pricing_plan_id')
                ->references('id')->on('pricing_plans')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plan_contents');
        Schema::dropIfExists('pricing_plans');
    }
};
