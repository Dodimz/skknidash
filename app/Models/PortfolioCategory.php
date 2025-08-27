<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PortfolioCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['portfolio_count'];

    /**
     * Get Team contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PortfolioCategoryContent::class);
    }

    /**
     * Get Team content
     */
    public function content(): mixed
    {
        return $this->hasOne(PortfolioCategoryContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get All portfolios
     */
    public function portfolios(): HasMany
    {
        return $this->hasMany(Portfolio::class, 'category_id', 'id');
    }

    /**
     * get portfolio count
     */
    public function getPortfolioCountAttribute(): int
    {
        return $this->portfolios()->count();
    }
}
