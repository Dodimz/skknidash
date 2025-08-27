<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\ServiceCategoryStoreRequest;
use App\Http\Requests\Admin\ServiceCategoryUpdateRequest;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ServiceCategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected ServiceCategory $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(ServiceCategory $category)
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

        // sort category
        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Store category
     */
    public function store(ServiceCategoryStoreRequest $request): void
    {
        $category = $this->model->create($request->all());

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'title' => $request->input($langCode . '_title'),
            ];
        }, $languages);

        $category->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(ServiceCategory $serviceCategory): array
    {
        $languages = json_decode(Setting::pull('languages'), true);
        $data = [
            'id' => $serviceCategory->id,
            'created_at' => $serviceCategory->created_at,
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_title'] = '';
        }

        foreach ($serviceCategory->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode . '_title'] = $content->title;
        }

        return $data;
    }

    /**
     * Update category
     */
    public function update(ServiceCategory $serviceCategory, ServiceCategoryUpdateRequest $request): void
    {
        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $serviceCategory->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'title' => $request[$langCode . '_title'],
                ],
            );
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }

    /**
     * Delete category
     *
     * @throws \Exception
     */
    public function destroy(ServiceCategory $serviceCategory): void
    {
        $serviceCategory->delete();
    }
}
