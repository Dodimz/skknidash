<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ServiceCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['service_count'];

    /**
     * Get Team contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(ServiceCategoryContent::class);
    }

    /**
     * Get Team content
     */
    public function content(): mixed
    {
        return $this->hasOne(ServiceCategoryContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get All services
     */
    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'category_id', 'id');
    }

    /**
     * get service count
     */
    public function getServiceCountAttribute(): int
    {
        return $this->services()->count();
    }
}
