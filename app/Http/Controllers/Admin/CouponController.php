<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Coupons\CouponStoreRequest;
use App\Http\Requests\Admin\Coupons\CouponUpdateRequest;
use App\Models\Coupon;
use App\Models\Setting;
use App\Repositories\Admin\CouponRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CouponController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, CouponRepository $repository): Response
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['coupons'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Coupons/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        return Inertia::render('Coupons/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CouponStoreRequest $request, CouponRepository $repository): RedirectResponse
    {
        $repository->create($request);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupons created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit(Coupon $coupon, CouponRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['edited_coupon'] = $coupon;
        return Inertia::render('Coupons/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CouponUpdateRequest $request, Coupon $coupon, CouponRepository $repository): RedirectResponse
    {
        $repository->update($request, $coupon);

        return redirect()->route('admin.coupons.index')->with('success', 'Coupons Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(Coupon $coupon, CouponRepository $repository): RedirectResponse
    {
        $repository->destroy($coupon);

        return back()->with('success', 'Coupon deleted successfully!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, CouponRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Coupons deleted successfully!');
    }
}
