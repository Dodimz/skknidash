<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Portfolios\PortfolioSlugUpdateRequest;
use App\Http\Resources\Admin\CaseStudyUrlResource;
use App\Http\Resources\Admin\PortfolioCategoryResource;
use App\Http\Resources\Admin\PortfoliosUrlResource;
use App\Http\Resources\Admin\ProductCategoryUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\Admin\TeamsUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\CaseStudy;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Models\PricingPlan;
use App\Models\ProductCategory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use App\Repositories\Admin\PortfolioRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'updateSlug', 'clone']]);
    }

    /**
     * Get portfolio index
     */
    public function index(Request $request, PortfolioRepository $repository)
    {

        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $data['categories'] = PortfolioCategory::with('content')->get();
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['portfolios'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);
        return Inertia::render('Portfolios/Index', $data);
    }

    /**
     * Create portfolio
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['categories'] = PortfolioCategoryResource::collection(PortfolioCategory::all());
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Portfolios/Create', $data);
    }

    /**
     * Store portfolio
     */
    public function store(Request $request, PortfolioRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio successfully created');
    }

    /**
     * Edit portfolio
     */
    public function edit(Portfolio $portfolio, PortfolioRepository $repository): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data = $repository->getPortfolioData($portfolio);
        $data['categories'] = PortfolioCategoryResource::collection(PortfolioCategory::all());
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $portfolio->sections;
        $data['portfolio'] = $portfolio;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Portfolios/Edit', $data);
    }

    /**
     * Portfolio update
     */
    public function update(Request $request, Portfolio $portfolio, PortfolioRepository $repository): RedirectResponse
    {
        $repository->update($request, $portfolio);

        return redirect()->route('admin.portfolios.index')->with('success', 'Portfolio successfully updated');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PortfolioRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected items successfully deleted');
    }

    /**
     * Portfolio delete
     */
    public function destroy(Portfolio $portfolio, PortfolioRepository $repository): RedirectResponse
    {
        $repository->destroy($portfolio);

        return back()->with('success', 'Portfolio successfully deleted');
    }

    /**
     * Portfolio slug update
     */
    public function updateSlug(PortfolioSlugUpdateRequest $request, Portfolio $portfolio, PortfolioRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $portfolio);

        return back()->with('success', 'Portfolio slug updated successfully!');
    }

    public function clone(Portfolio $portfolio, PortfolioRepository $repository)
    {
        $repository->clone($portfolio);

        return back()->with('success', 'Portfolio successfully cloned');
    }
}
