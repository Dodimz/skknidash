<?php

namespace App\Repositories\Admin;

use App\Models\Brand;
use App\Models\BrandContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class BrandRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify brands table
     */
    protected Brand $model;

    /**
     *  Constructor for brand repository
     */
    public function __construct(Brand $brand)
    {
        $this->model = $brand;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        // search brand
        if (isset($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // Sort data
        if (isset($sort['column'])) {
            if ($sort['column'] == 'title') {
                $query->orderBy(BrandContent::select($sort['column'])
                    ->whereColumn('brands.id', 'brand_contents.brand_id')
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
     * Create brand
     */
    public function create(Request $request): void
    {
        $brand = $this->model->create([
            'brand_image' => $request->input('brand_image'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $languageCode = $language['code'];

            return [
                'language_code' => $languageCode,
                'title' => $request->input($languageCode . '_title'),
            ];
        }, $languages);
        $brand->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(Brand $brand): array
    {
        $data = [
            'id' => $brand->id,
            'brand_image' => $brand->brand_image,
        ];
        $contents = $brand->contents;
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
     * brand update
     *
     * @throws \Exception
     */
    public function update(Request $request, Brand $brand): void
    {
        $brand->update([
            'brand_image' => $request->input('brand_image'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);

        foreach ($languages as $language) {
            $languageCode = $language['code'];
            $title = $request->input($languageCode . '_title', '');

            $brand->contents()->updateOrCreate(
                ['language_code' => $languageCode],
                ['title' => $title],
            );
        }
    }

    /**
     * Delete brand
     *
     * @throws \Exception
     */
    public function destroy(Brand $brand): void
    {
        $brand->delete();
    }

    /**
     * Bulk brand delete
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
