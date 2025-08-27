<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Team extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['meta_image_url'];

    /**
     * Get Team contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(TeamContent::class);
    }

    /**
     * Get Team content
     */
    public function content(): mixed
    {
        return $this->hasOne(TeamContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get meta image url
     */
    public function getMetaImageUrlAttribute(): string
    {
        return asset($this->meta_image);
    }

    /**
     * Get section as object
     */
    public function getSectionsAttribute($value): mixed
    {
        return json_decode($value, true);
    }
}
