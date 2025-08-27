<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'parent_id'];

    protected $appends = [
        'parent_category_name',
        'post_count',
    ];

    /**
     * Get contents
     */
    public function contents(): HasMany
    {
        return $this->hasMany(CategoryContent::class);
    }

    /**
     * Get Category Content
     */
    public function content(): HasOne
    {
        return $this->hasOne(CategoryContent::class)->where('language_code', app()->getLocale());
    }

    /**
     * parent category
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    /**
     * children category
     */
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    /**
     *  Get parent category name
     */
    public function getParentCategoryNameAttribute(): mixed
    {
        if ($this->parent_id) {
            $parentCategory = $this->parent()->first();

            return $parentCategory?->content?->title;
        }

        return null;
    }

    /**
     * Get posts
     */
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get post count
     */
    public function getPostCountAttribute(): int
    {
        return $this->posts()->count();
    }

    /**
     * make serialize categories
     */
    protected static function serializeCategories($categories, $prefix = ''): array
    {
        $result = [];

        foreach ($categories as $category) {
            $categoryTitle = $prefix.$category?->content?->title;
            $result[] = ['value' => $category->id, 'label' => $categoryTitle];

            if ($category->children->isNotEmpty()) {
                $subcategories = self::serializeCategories($category->children, $prefix.'-');
                $result = array_merge($result, $subcategories);
            }
        }

        return $result;
    }

    /**
     * get serialized categories
     */
    public static function getSerializedCategories(string $languageCode): array
    {
        $categories = Category::whereNull('parent_id')->with([
            'children',
            'content' => function ($query) use ($languageCode) {
                $query->where('language_code', $languageCode);
            },
        ])->get();

        return self::serializeCategories($categories, '');
    }
}
