<?php

namespace App\Repositories\Admin;

use App\Models\Tag;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductTagRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Tag $model;

    /**
     * Constructor for Tag repository
     */
    public function __construct(Tag $tag)
    {
        $this->model = $tag;
    }

    /**
     * Get search result
     *
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->whereHas('products')->newQuery();

        if (isset($search)) {
            $query->containing($search);
        }

        return $query->paginate(30);
    }

    /**
     * Create tag
     */
    public function create(Request $request): void
    {
        $this->model->create(['name' => $request->tag_name]);
    }

    public function update(Request $request, Tag $tag): void
    {
        $tag->update(['name' => $request->tag_name]);
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        Tag::whereIn('id', $ids)->delete();
    }
}
