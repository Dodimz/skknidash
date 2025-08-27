<?php

namespace App\Repositories\Admin;

use App\Models\FormResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class FormResponseRepository
{
    protected FormResponse $model;

    public function __construct(FormResponse $formResponse)
    {
        $this->model = $formResponse;
    }

    /**
     * Get contacts
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('response_from', 'LIKE', "%$search%");
        }

        $query->orderBy($sort['column'], $sort['order']);

        // Filter post by response name
        if (isset($filter['response']) && $filter['response'] !== 'All Responses') {
            $query->where('response_from', $filter['response']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    public function bulkDelete(Request $request)
    {
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->delete();
    }
}
