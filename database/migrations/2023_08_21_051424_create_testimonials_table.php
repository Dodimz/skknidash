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
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->string('client_image', 255);
            $table->integer('rating_count');
            $table->timestamps();
        });

        Schema::create('testimonial_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('testimonial_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('name', 255);
            $table->string('designation', 255);
            $table->text('review_description');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('testimonial_id')
                ->references('id')->on('testimonial_contents')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonial_contents');
        Schema::dropIfExists('testimonials');
    }
};
