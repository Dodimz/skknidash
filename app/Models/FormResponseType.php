<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormResponseType extends Model
{
    protected $guarded = ['id', 'created_at', 'updated_at'];

    public function formResponses(): HasMany
    {
        return $this->hasMany(FormResponse::class, 'response_from', 'form_response');
    }
}
