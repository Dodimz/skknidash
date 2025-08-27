<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Testimonial extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    /**
     * Get Testimonial contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(TestimonialContent::class);
    }

    /**
     * Get Testimonial content
     */
    public function content(): mixed
    {
        return $this->hasOne(TestimonialContent::class)->where('language_code', app()->getLocale());
    }
}
