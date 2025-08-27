<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ManualPaymentGateway extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Get page contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(ManualPaymentGatewayContent::class);
    }

    /**
     * Get page content
     */
    public function content(): HasOne
    {
        return $this->hasOne(ManualPaymentGatewayContent::class)->where('language_code', app()->getLocale());
    }
}
