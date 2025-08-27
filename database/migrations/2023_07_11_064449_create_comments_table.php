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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->tinyInteger('comment_parent')->nullable();
            $table->string('comment_author_name', 100);
            $table->string('comment_author_email', 100);
            $table->string('comment_author_website', 100)->nullable();
            $table->text('comment_content');
            $table->enum('is_approved', [0, 1])->comment('0 means no, 1 means yes')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
