<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductCategory extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(ProductCategoryContent::class);
    }

    /**
     * Get Category Content
     */
    public function content(): HasOne
    {
        return $this->hasOne(ProductCategoryContent::class)->where('language_code', app()->getLocale());
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }
}
