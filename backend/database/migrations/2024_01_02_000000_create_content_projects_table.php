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
        Schema::create('content_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->enum('content_type', ['blog_post', 'article', 'social_media', 'email', 'landing_page']);
            $table->json('target_keywords')->nullable();
            $table->string('target_audience')->nullable();
            $table->enum('content_length', ['short', 'medium', 'long'])->default('medium');
            $table->enum('tone', ['formal', 'informal', 'friendly', 'professional', 'persuasive'])->default('professional');
            $table->longText('draft_content')->nullable();
            $table->longText('final_content')->nullable();
            $table->enum('status', ['draft', 'in_progress', 'completed', 'published'])->default('draft');
            $table->boolean('ai_generated')->default(false);
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('content_projects');
    }
};
