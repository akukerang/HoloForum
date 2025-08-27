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
        Schema::create('threads', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Created by
            $table->foreignId('forum_id')->constrained('forums')->cascadeOnDelete(); // Parent Forum

            $table->string('title'); 

            $table->unsignedInteger('replies')->default(0); 
            $table->timestamp('last_post_at')->nullable();
            $table->boolean('locked')->default(false);

            // TODO: Tags
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('threads');
    }
};
