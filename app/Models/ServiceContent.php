<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ServiceContent extends Model
{
    use HasFactory;

    protected $guarded = [];

    /**
     * Get the case study.
     */
    public function caseStudy(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
