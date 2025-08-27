<?php

namespace App\Repositories\Admin;

use App\Models\PaymentHistory;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Pagination\LengthAwarePaginator;

class PaymentHistoryRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify payment history table
     */
    protected PaymentHistory $model;

    /**
     * Constructor for payment history repository
     */
    public function __construct(PaymentHistory $paymentHistory)
    {
        $this->model = $paymentHistory;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('plan.currency', 'plan.content')->newQuery();

        // search post
        if ($search) {
            $query->orWhere('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhereHas('planName', function ($planNameQuery) use ($search) {
                    $planNameQuery->where('name', 'like', "%$search%");
                });
        }

        // sort payment history
        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }
}
