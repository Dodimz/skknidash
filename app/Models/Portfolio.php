<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Portfolio extends Model
{
    use HasFactory;

    protected $guarded = [
        'created_at',
        'updated_at',
        'id',
    ];

    protected $appends = ['meta_image_url'];

    /**
     * Get portfolio contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PortfolioContent::class);
    }

    /**
     * Get portfolio content
     */
    public function content(): HasOne
    {
        return $this->hasOne(PortfolioContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get category
     */
    public function category(): HasOne
    {
        return $this->hasOne(PortfolioCategory::class, 'id', 'category_id');
    }

    /**
     * Get project info as object
     */
    public function getProjectInfoAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get section as object
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    public function getIsShowBreadcrumbAttribute($value): bool
    {
        return $value == '1';
    }

    /**
     * Get sections data as object
     */
    public function getSectionsDataAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get meta image url
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }
}
