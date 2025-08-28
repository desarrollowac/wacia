<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'content_type',
        'target_keywords',
        'target_audience',
        'content_length',
        'tone',
        'draft_content',
        'final_content',
        'status',
        'ai_generated',
        'metadata',
    ];

    protected $casts = [
        'target_keywords' => 'array',
        'metadata' => 'array',
        'ai_generated' => 'boolean',
    ];

    /**
     * Get the user that owns the content project.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope for filtering by content type.
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('content_type', $type);
    }

    /**
     * Scope for filtering by status.
     */
    public function scopeWithStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
