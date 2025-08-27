<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $guarded = ['created_at', 'updated_at', 'id'];

    public static function pull($settingKey, $default = null)
    {
        $setting = static::where('setting_key', $settingKey)->first();

        return $setting->setting_value ?? $default;
    }
}
