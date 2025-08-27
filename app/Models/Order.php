<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $guarded = [];
    protected $appends = ['receipt_file_url'];

    /**
     * Get order items
     */
    public function orderitems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get receipt file url
     */
    public function getReceiptFileUrlAttribute(): string
    {
        return asset($this->receipt_file);
    }
}
