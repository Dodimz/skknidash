<?php

namespace App\Repositories\Admin;

use App\Models\Coupon;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class CouponRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify coupon table
     */
    protected Coupon $model;

    /**
     * Constructor for coupon repository
     */
    public function __construct(Coupon $coupon)
    {
        $this->model = $coupon;
    }

    /**
     * Get search result with pagination
     *
     * @param  $lang
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        // Search data
        if ($search) {
            $query->orWhere('name', 'like', "%$search%");
        }

        // sort pricing plan
        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Create a new coupon
     */
    public function create(Request $request): void
    {

        $coupon = $this->model->create([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'discount_type' => $request->input('discount_type'),
            'discount_value' => $request->input('discount_value'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);
    }

    /**
     * Update a coupon
     */
    public function update(Request $request, Coupon $coupon): void
    {
        $coupon->update([
            'name' => $request->input('name'),
            'code' => $request->input('code'),
            'discount_type' => $request->input('discount_type'),
            'discount_value' => $request->input('discount_value'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
        ]);

    }

    /**
     * Destroy coupon
     */
    public function destroy(Coupon $coupon): void
    {
        $coupon->delete();
    }

    /**
     * Bulk delete coupons.
     */
    public function bulkDelete(string $ids): void
    {
        $ids = explode(',', $ids);
        $this->model->whereIn('id', $ids)->delete();
    }
}
