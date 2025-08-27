<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'comment_parent',
        'comment_author_name',
        'comment_author_email',
        'comment_author_website',
        'comment_content',
        'is_approved',
    ];

    /**
     * Get post
     */
    public function post(): HasOne
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }
}
