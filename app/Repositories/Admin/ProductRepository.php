<?php

namespace App\Repositories\Admin;

use App\Models\Product;
use App\Models\ProductCategoryContent;
use App\Models\ProductContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class ProductRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify product table
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
     * Get search result with pagination
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with([
            'content',
            'category.content',
        ])->newQuery();

        // Apply search filters if necessary
        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            })->orWhereHas('category.contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(ProductContent::select($sort['column'])
                    ->whereColumn('products.id', 'product_contents.product_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    ProductCategoryContent::select('title')
                        ->whereColumn('product_category_contents.product_category_id', 'products.category_id')
                        ->where('language_code', app()->getLocale()),
                    $order
                );
            } else {
                $query->orderBy($column, $order);
            }
        }

        // Paginate the results
        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Create a new product
     */
    public function create(Request $request): void
    {
        // Get languages from settings
        $languages = json_decode(Setting::pull('languages'), true);
        $defaultLang = Setting::pull('default_lang');
        $defaultTitle = '';
        $generatedSlug = Str::slug($request->input($defaultLang . '_name'));

        if (Product::where('slug', $generatedSlug)->exists()) {
            $generatedSlug = $generatedSlug . '-' . Carbon::now()->timestamp;
        }

        // Create a new product instance
        $product = $this->model->create([
            'slug' => $generatedSlug,
            'sku' => $request->input('sku'),
            'quantity' => $request->input('quantity'),
            'category_id' => $request->input('category'),
            'brand_id' => $request->input('brand'),
            'thumbnail_image' => $request->input('thumbnail_image'),
            'slider_images' => json_encode($request->input('slider_images')),
            'price' => $request->input('price'),
            'discount_price' => $request->input('discount_price'),
            'status' => $request->input('status'),
            'is_popular' => $request->input('is_popular'),
            'is_trending' => $request->input('is_trending'),
            'seo_title' => $request->input('seo_title'),
            'seo_description' => $request->input('seo_description'),
        ]);

        // tags
        if ($request->tags) {
            $product->attachTags($request->tags);
        }

        // Prepare content data
        $content = array_map(function ($language) use ($request, $defaultLang, &$defaultTitle) {
            $langCode = $language['code'];
            $title = $request[$langCode . '_name'];

            // Store the default language title for slug generation
            if ($langCode === $defaultLang) {
                $defaultTitle = $title;
            }

            return [
                'language_code' => $langCode,
                'title' => $title,
                'description' => $request[$langCode . '_description'],
                'short_description' => $request[$langCode . '_short_description'],
            ];
        }, $languages);

        // Create product contents
        $product->contents()->createMany($content);

        Cache::forget('max_product_price');
    }

    /**
     * Get featured room
     */
    public function getEditedData(Product $product): array
    {
        $productData = $product->load('contents');
        $languages = json_decode(Setting::pull('languages'), true);

        $data = [
            'id' => $product->id,
            'sku' => $product->sku,
            'quantity' => $product->quantity,
            'thumbnail_image' => $product->thumbnail_image,
            'slider_images' => is_string($product->slider_images) ? json_decode($product->slider_images) : $product->slider_images,
            'price' => $product->price,
            'discount_price' => $product->discount_price,
            'status' => $product->status,
            'is_popular' => $product->is_popular,
            'is_trending' => $product->is_trending,
            'category' => $product->category_id,
            'brand' => $product->brand_id,
            'seo_title' => $product->seo_title,
            'seo_description' => $product->seo_description,
            'slug' => $product->slug,
            'tags' => $product->tags?->pluck('name'),
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_name'] = '';
            $data[$langCode . '_description'] = '';
            $data[$langCode . '_short_description'] = '';
        }

        foreach ($product->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode . '_name'] = $content->title;
            $data[$langCode . '_description'] = $content->description;
            $data[$langCode . '_short_description'] = $content->short_description;
        }

        return $data;
    }

    /**
     * Update product
     */
    public function update(Request $request, Product $product)
    {
        // Update the product
        $product->update([
            'sku' => $request->sku,
            'quantity' => $request->quantity,
            'thumbnail_image' => $request->thumbnail_image,
            'slider_images' => json_encode($request->input('slider_images')),
            'price' => $request->price,
            'discount_price' => $request->discount_price,
            'status' => $request->status,
            'is_popular' => $request->input('is_popular'),
            'is_trending' => $request->input('is_trending'),
            'category_id' => $request->category,
            'brand_id' => $request->input('brand'),
            'seo_title' => $request->seo_title,
            'seo_description' => $request->seo_description,
        ]);

        // First update the content
        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];
            $product->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'title' => $request[$langCode . '_name'],
                    'description' => $request[$langCode . '_description'],
                    'short_description' => $request[$langCode . '_short_description'],
                ],
            );
        }

        // Detach all existing tags
        $product->detachTags($product->tags);

        // attach tags
        $product->attachTags($request->tags);
        Cache::forget('max_product_price');
    }

    /**
     * delete product
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }

    /**
     * bulk delete product
     */
    public function bulkDelete(string $ids)
    {
        $ids = explode(',', $ids);
        $this->model->whereIn('id', $ids)->delete();
    }
}
