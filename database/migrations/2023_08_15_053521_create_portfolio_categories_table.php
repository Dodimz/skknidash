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
        Schema::create('portfolio_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('portfolio_category_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('portfolio_category_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('portfolio_category_id')
                ->references('id')->on('portfolio_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_category_contents');
        Schema::dropIfExists('portfolio_categories');
    }
};
