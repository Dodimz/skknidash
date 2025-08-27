<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PricingPlanContent extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the pricing plan.
     */
    public function caseStudy(): BelongsTo
    {
        return $this->belongsTo(PricingPlan::class);
    }
}
