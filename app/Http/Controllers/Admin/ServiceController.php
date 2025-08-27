<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Services\ServiceSlugUpdateRequest;
use App\Http\Resources\Admin\CaseStudyUrlResource;
use App\Http\Resources\Admin\CategoryResource;
use App\Http\Resources\Admin\PortfoliosUrlResource;
use App\Http\Resources\Admin\ProductCategoryUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\Admin\TeamsUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\CaseStudy;
use App\Models\Portfolio;
use App\Models\PricingPlan;
use App\Models\ProductCategory;
use App\Models\Service;
use App\Models\ServiceCategory;
use App\Models\Setting;
use App\Models\Team;
use App\Repositories\Admin\ServiceRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'updateSlug', 'clone']]);
    }

    /**
     * Paginate search result
     */
    public function index(Request $request, ServiceRepository $repository)
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = ServiceCategory::with('content')->get();
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['services'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);
        return Inertia::render('Services/Index', $data);
    }

    /**
     * Create services
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['categories'] = CategoryResource::collection(ServiceCategory::all());
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Services/Create', $data);
    }

    /**
     * Store service
     */
    public function store(Request $request, ServiceRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully created');
    }

    /**
     * Edit service
     */
    public function edit(Service $service, ServiceRepository $repository): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data = $repository->getServiceData($service);
        $data['categories'] = CategoryResource::collection(ServiceCategory::all());
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $service->sections;
        $data['service'] = $service;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Services/Edit', $data);
    }

    /**
     * Update services
     */
    public function update(Request $request, Service $service, ServiceRepository $repository): RedirectResponse
    {
        $repository->update($request, $service);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully updated');
    }

    /**
     * Service destroy
     */
    public function destroy(Service $service, ServiceRepository $repository): RedirectResponse
    {
        $repository->destroy($service);

        return redirect()->route('admin.services.index')->with('success', 'Service successfully deleted');
    }

    /**
     * bulk delete
     */
    public function bulkDelete(Request $request, ServiceRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return redirect()->route('admin.services.index')->with('success', 'Selected services successfully deleted');
    }

    /**
     * update slug
     */
    public function updateSlug(ServiceSlugUpdateRequest $request, Service $service, ServiceRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $service);

        return back()->with('success', 'Service slug updated successfully!');
    }

    public function clone(Service $service, ServiceRepository $repository)
    {
        $repository->clone($service);

        return back()->with('success', 'Service successfully cloned');
    }
}
