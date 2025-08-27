<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory, HasTags;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['thumbnail_image_url'];

    /**
     * Get blog contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PostContent::class);
    }

    /**
     * Get blog content
     */
    public function content(): mixed
    {
        return $this->hasOne(PostContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get post category
     */
    public function category(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    /**
     * Get post comments
     */
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * get comments count
     */
    public function getCommentCount(): string
    {
        return $this->comments->where('is_approved', 1)->count() ? $this->comments->count() . ' Comments' : 'No Comments';
    }

    /**
     * Get user
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get meta image url
     */
    public function getThumbnailImageUrlAttribute(): string
    {
        return asset($this->thumbnail_image);
    }
}
