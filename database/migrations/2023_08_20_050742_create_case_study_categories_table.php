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
        Schema::create('case_study_categories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
        });

        Schema::create('case_study_category_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('case_study_category_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('case_study_category_id')
                ->references('id')->on('case_study_categories')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_study_category_contents');
        Schema::dropIfExists('case_study_categories');
    }
};
