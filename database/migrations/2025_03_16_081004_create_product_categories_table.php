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
        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_image', 255);
            $table->timestamps();
        });

        Schema::create('product_category_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_category_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->timestamps();

            $table->foreign('product_category_id')
                ->references('id')->on('product_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_category_contents');
        Schema::dropIfExists('product_categories');
    }
};
