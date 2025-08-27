<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageContent extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the page.
     */
    public function page(): BelongsTo
    {
        return $this->belongsTo(Page::class);
    }
}
