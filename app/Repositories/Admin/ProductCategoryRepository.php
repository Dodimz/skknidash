<?php

namespace App\Repositories\Admin;

use App\Models\ProductCategory;
use App\Models\ProductCategoryContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected ProductCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(ProductCategory $category)
    {
        $this->model = $category;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        // search category
        if (isset($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // Sort data
        if (isset($sort['column'])) {
            if ($sort['column'] == 'title') {
                $query->orderBy(ProductCategoryContent::select($sort['column'])
                    ->whereColumn('product_categories.id', 'product_category_contents.product_category_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } else {
                $query->orderBy($sort['column'], $sort['order']);
            }
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Create category
     */
    public function create(Request $request): void
    {
        $category = $this->model->create([
            'category_image' => $request->input('category_image'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $languageCode = $language['code'];

            return [
                'language_code' => $languageCode,
                'title' => $request->input($languageCode . '_title'),
            ];
        }, $languages);
        $category->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(ProductCategory $category): array
    {
        $data = [
            'id' => $category->id,
            'category_image' => $category->category_image,
        ];
        $contents = $category->contents;
        $languages = json_decode(Setting::pull('languages'), true);

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_title'] = '';
        }

        foreach ($contents as $content) {
            $langCode = $content->language_code;
            if (array_key_exists($langCode . '_title', $data)) {
                $data[$langCode . '_title'] = $content->title;
            }
        }

        return $data;
    }

    /**
     * Category update
     *
     * @throws \Exception
     */
    public function update(Request $request, ProductCategory $category): void
    {
        $category->update([
            'category_image' => $request->input('category_image'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);

        foreach ($languages as $language) {
            $languageCode = $language['code'];
            $title = $request->input($languageCode . '_title', '');

            $category->contents()->updateOrCreate(
                ['language_code' => $languageCode],
                ['title' => $title],
            );
        }
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(ProductCategory $category): void
    {
        $category->delete();
    }

    /**
     * Bulk category delete
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
