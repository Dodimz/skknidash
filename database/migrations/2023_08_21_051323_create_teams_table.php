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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 255);
            $table->text('sections')->nullable();
            $table->tinyInteger('is_show_breadcrumb')->default(0);
            $table->tinyInteger('is_show_shopping_cart')->default(0);
            $table->string('breadcrumb_image')->nullable();
            $table->string('meta_image', 255)->nullable();
            $table->integer('header_layout');
            $table->integer('footer_layout');
            $table->timestamps();
        });

        Schema::create('team_contents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('team_id')->index();
            $table->string('language_code', 10)->index();
            $table->string('title', 255);
            $table->string('breadcrumb_title', 255)->nullable();
            $table->string('header_action_button_text', 255)->nullable();
            $table->string('header_action_button_url', 255)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_description', 255)->nullable();
            $table->string('meta_tags', 255)->nullable();
            $table->json('sections_data');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('team_id')
                ->references('id')->on('team_contents')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_contents');
        Schema::dropIfExists('teams');
    }
};
