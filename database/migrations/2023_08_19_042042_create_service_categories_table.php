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
        Schema::create('service_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('service_category_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_category_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('service_category_id')
                ->references('id')->on('service_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_categories');
    }
};
