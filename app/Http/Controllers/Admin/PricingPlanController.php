<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PricingPlanStoreRequest;
use App\Http\Requests\Admin\PricingPlanUpdateRequest;
use App\Models\Currency;
use App\Models\PricingPlan;
use App\Models\Setting;
use App\Repositories\Admin\PricingPlanRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingPlanController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['update', 'destroy', 'bulkDelete', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, PricingPlanRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['pricingPlans'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('PricingPlan/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['currencies'] = Currency::all();

        return Inertia::render('PricingPlan/Create', $data);
    }

    /**
     * Store new post
     */
    public function store(PricingPlanStoreRequest $request, PricingPlanRepository $repository)
    {
        $repository->create($request);

        return redirect()->route('admin.pricing.plans.index')->with('success', 'Pricing Plan successfully created');
    }

    /**
     * Show the form for edit pricing plan
     */
    public function edit(PricingPlan $pricingPlan, PricingPlanRepository $repository): Response
    {
        $data['edited_pricingPlan'] = $repository->getEditData($pricingPlan);
        $data['currencies'] = Currency::all();
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('PricingPlan/Edit', $data);
    }

    /**
     * Update pricing plan
     */
    public function update(PricingPlanUpdateRequest $request, PricingPlan $pricingPlan, PricingPlanRepository $repository)
    {
        $repository->update($request, $pricingPlan);

        return redirect()->route('admin.pricing.plans.index')->with('success', 'Pricing Plan successfully updated!');
    }

    /**
     * Delete pricing plan
     */
    public function destroy(PricingPlan $pricingPlan, PricingPlanRepository $repository)
    {
        $repository->destroy($pricingPlan);

        return back()->with('success', 'Pricing Plan successfully deleted!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PricingPlanRepository $repository)
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Pricing Plan successfully deleted!');
    }
}
