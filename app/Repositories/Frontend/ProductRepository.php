<?php

namespace App\Repositories\Frontend;

use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductRepository
{
    /**
     * Object model will be used to modify products table
     */
    protected Product $model;

    /**
     * Constructor for product repository
     */
    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    /**
     * Get search result with paginate
     *
     * @param string $search
     * @param array $filter
     * @param string $sort
     */
    public function paginateSearchResult($search, array $filter = [], $sort = 'latest')
    {
        $query = $this->model->with(['content', 'contents'])->newQuery();

        // Apply search filters if necessary
        if (!empty($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            })->orWhereHas('category.contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            })->orWhereHas('tags', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if (!empty($filter['category'])) {
            $query->whereHas('category.content', function ($q) use ($filter) {
                $q->where('title', $filter['category']);
            });
        }

        if (!empty($filter['brand'])) {
            $query->whereHas('brand.content', function ($q) use ($filter) {
                $q->where('title', $filter['brand']);
            });
        }

        if (!empty($filter['tag'])) {
            $query->withAnyTags([$filter['tag']]);
        }

        // Add filter for popular/trending products
        if (!empty($filter['type'])) {
            switch ($filter['type']) {
                case 'popular':
                    $query->where('is_popular', '1');
                    break;
                case 'trending':
                    $query->where('is_trending', '1');
                    break;
            }
        }

        if (isset($filter['min_price']) && isset($filter['max_price'])) {
            $query->whereBetween('price', [
                $filter['min_price'],
                $filter['max_price'],
            ]);
        }

        if (!empty($filter['sort'])) {
            switch ($filter['sort']) {
                case 'latest':
                    $query->latest();
                    break;
                case 'low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'high':
                    $query->orderBy('price', 'desc');
                    break;
                default:
                    $query->latest();
                    break;
            }
        } else {
            $query->latest();
        }

        return $query->where('status', '1')->paginate(9);
    }

    public function getMaxProductPrice()
    {
        return Cache::remember('max_product_price', 3600, function () {
            return Product::selectRaw('MAX(price) as max_price')->value('max_price');
        });
    }

    /**
     * Get popular product
     *
     * @return mixed
     */
    public function getPopularProducts()
    {
        return $this->model->where('is_popular', '1')
            ->with('content', 'reviews', 'category.content')
            ->take(20)
            ->inRandomOrder()
            ->latest()
            ->get();
    }

    /**
     * Get Trending product
     *
     * @return mixed
     */
    public function getTrendingProducts()
    {
        return $this->model->where('is_trending', '1')
            ->with('content', 'reviews', 'category.content')
            ->take(20)
            ->inRandomOrder()
            ->latest()
            ->get();
    }
}
