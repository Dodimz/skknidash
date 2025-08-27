<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CaseStudies\CaseStudySlugUpdateRequest;
use App\Http\Resources\Admin\CaseStudyUrlResource;
use App\Http\Resources\Admin\CategoryResource;
use App\Http\Resources\Admin\PortfoliosUrlResource;
use App\Http\Resources\Admin\ProductCategoryUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\Admin\TeamsUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\CaseStudy;
use App\Models\CaseStudyCategory;
use App\Models\Portfolio;
use App\Models\PricingPlan;
use App\Models\ProductCategory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use App\Repositories\Admin\CaseStudyRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CaseStudyController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'updateSlug', 'clone']]);
    }

    public function index(Request $request, CaseStudyRepository $repository)
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = CaseStudyCategory::with('content')->get();
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['case_studies'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('CaseStudy/Index', $data);
    }

    /**
     * Create services
     */
    public function create()
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['categories'] = CategoryResource::collection(CaseStudyCategory::all());
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('CaseStudy/Create', $data);
    }

    /**
     * Store case study
     */
    public function store(Request $request, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.case.study.index')->with('success', 'Case study successfully created');
    }

    /**
     * Edit case study
     */
    public function edit(CaseStudy $caseStudy, CaseStudyRepository $repository)
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data = $repository->getCaseStudyData($caseStudy);
        $data['categories'] = CategoryResource::collection(CaseStudyCategory::all());
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $caseStudy->sections;
        $data['caseStudy'] = $caseStudy;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('CaseStudy/Edit', $data);
    }

    /**
     * Update case study
     */
    public function update(Request $request, CaseStudy $caseStudy, CaseStudyRepository $caseStudyRepository): RedirectResponse
    {
        $caseStudyRepository->update($request, $caseStudy);

        return redirect()->route('admin.case.study.index')->with('success', 'Case study successfully updated');
    }

    /**
     * Bulk delete case study
     */
    public function bulkDelete(Request $request, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected case study successfully deleted');
    }

    /**
     * Delete case study
     */
    public function destroy(CaseStudy $caseStudy, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->destroy($caseStudy);

        return back()->with('success', 'Case study successfully deleted');
    }

    /**
     * Update case study slug
     */
    public function updateSlug(CaseStudySlugUpdateRequest $request, CaseStudy $caseStudy, CaseStudyRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $caseStudy);

        return back()->with('success', 'Case study slug updated successfully!');
    }

    public function clone(CaseStudy $caseStudy, CaseStudyRepository $repository)
    {
        $repository->clone($caseStudy);

        return back()->with('success', 'CaseStudy successfully cloned');
    }
}
