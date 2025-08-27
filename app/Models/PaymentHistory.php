<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PaymentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'method',
        'amount',
        'status',
        'name',
        'email',
        'mobile',
        'whatsapp_or_skype',
        'note',
        'payment_identifier',
    ];

    /**
     * Get plan name for serch
     */
    public function planName(): HasOne
    {
        return $this->hasOne(PricingPlan::class, 'id', 'plan_id');
    }

    /**
     * Get plan
     */
    public function plan(): BelongsTo
    {
        return $this->belongsTo(PricingPlan::class);
    }
}
