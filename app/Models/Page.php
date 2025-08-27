<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Page extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['meta_image_url'];

    /**
     * Get page contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PageContent::class);
    }

    /**
     * Get page content
     */
    public function content(): HasOne
    {
        return $this->hasOne(PageContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get sections as array
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    /**
     * Get sections data as array
     */
    public function getSectionsDataAttribute($value): mixed
    {
        return json_decode($value, true);
    }

    public function getIsShowBreadcrumbAttribute($value): bool
    {
        return $value == '1';
    }

    /**
     * Get meta image url
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }
}
