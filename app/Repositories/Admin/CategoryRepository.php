<?php

namespace App\Repositories\Admin;

use App\Models\Category;
use App\Models\CategoryContent;
use App\Models\Post;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Category $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(Category $category)
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
            switch ($sort['column']) {
                case 'title':
                    $query->orderBy(CategoryContent::select($sort['column'])
                        ->whereColumn('categories.id', 'category_contents.category_id')
                        ->where('language_code', app()->getLocale()), $sort['order']);
                case 'post_count':
                    $query->withCount('posts')
                        ->orderBy('posts_count', $sort['order']);
                    break;
                default:
                    $query->orderBy($sort['column'], $sort['order']);
                    break;
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
            'parent_id' => $request->input('parent_id'),
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
    public function getEditData(Category $category): array
    {
        $data = [
            'id' => $category->id,
            'parent_id' => $category->parent_id,
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
    public function update(Request $request, Category $category): void
    {
        $category->update([
            'parent_id' => $request->input('parent_id')
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
    public function destroy(Category $category): void
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
