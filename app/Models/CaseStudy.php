<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseStudy extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['meta_image_url'];

    /**
     * Get page contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(CaseStudyContent::class);
    }

    /**
     * Get page content
     */
    public function content(): HasOne
    {
        return $this->hasOne(CaseStudyContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get category
     */
    public function category(): HasOne
    {
        return $this->hasOne(CaseStudyCategory::class, 'id', 'category_id');
    }

    /**
     * Get details as object
     */
    public function getDetailsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get section as array
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
    public function getThumbnailImageUrlAttribute(): string
    {
        return asset($this->thumbnail_image);
    }

    /**
     * Get meta image url
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }
}
