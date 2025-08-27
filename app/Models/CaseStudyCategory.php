<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CaseStudyCategory extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'updated_at'];

    protected $appends = ['case_study_count'];

    /**
     * Get caseStudies contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(CaseStudyCategoryContent::class);
    }

    /**
     * Get caseStudies content
     */
    public function content(): mixed
    {
        return $this->hasOne(CaseStudyCategoryContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * Get All caseStudies
     */
    public function caseStudies(): HasMany
    {
        return $this->hasMany(Portfolio::class, 'category_id', 'id');
    }

    /**
     * get caseStudies count
     */
    public function getCaseStudyCountAttribute(): int
    {
        return $this->caseStudies()->count();
    }
}
