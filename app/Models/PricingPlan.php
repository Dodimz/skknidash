<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PricingPlan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Get pricing plan contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(PricingPlanContent::class);
    }

    /**
     * Get pricing plan content
     */
    public function content(): mixed
    {
        return $this->hasOne(PricingPlanContent::class)->where('language_code', app()->getLocale());
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function getPlanDetailsAttribute($value)
    {
        return json_decode($value);
    }
}
