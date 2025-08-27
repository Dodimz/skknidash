<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['full_url'];

    public function getMediaUrlAttribute($value)
    {
        return Storage::disk($this->driver)->url($value);
    }

    public function getFullUrlAttribute()
    {
        if ($this->driver == 'local') {
            return asset($this->media_url);
        }

        return $this->media_url;
    }
}
