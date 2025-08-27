<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Spatie\Tags\HasTags;

class Product extends Model
{
    use HasFactory, HasTags;

    protected $guarded = [];

    /**
     * Get the category that owns the product
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    /**
     * Get the brand that owns the product
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    /**
     * Get Category Content
     */
    public function content(): HasOne
    {
        return $this->hasOne(ProductContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get all of the contents for the product
     */
    public function contents(): HasMany
    {
        return $this->hasMany(ProductContent::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class)->where('is_approved', '1');
    }

    /**
     * Get the full URL for the thumbnail image.
     */
    public function getThumbnailImageUrlAttribute(): string
    {
        return asset($this->thumbnail_image);
    }
}
