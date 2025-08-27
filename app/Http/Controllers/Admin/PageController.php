<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Pages\PageSlugUpdateRequest;
use App\Http\Resources\Admin\CaseStudyUrlResource;
use App\Http\Resources\Admin\PortfoliosUrlResource;
use App\Http\Resources\Admin\ProductCategoryUrlResource;
use App\Http\Resources\Admin\ServicesUrlResource;
use App\Http\Resources\Admin\TeamsUrlResource;
use App\Http\Resources\PricingPlanUrlResource;
use App\Models\CaseStudy;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\PricingPlan;
use App\Models\ProductCategory;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use App\Repositories\Admin\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'updateSlug', 'clone']]);
    }

    /**
     * Get pages
     */
    public function index(Request $request, PageRepository $repository)
    {
        $data['default_home_page'] = Setting::pull('default_home_page');
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['pages'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filtered_lang']);

        // return $data['pages'];

        return Inertia::render('Pages/Index', $data);
    }

    public function create()
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());
        // return $data;

        return Inertia::render('Pages/Create', $data);
    }

    /**
     * Store page
     */
    public function store(Request $request, PageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->store($request, $settingRepository);

        return redirect()->route('admin.pages.index')->with('success', 'Page successfully created');
    }

    /**
     * Edit page
     *
     * @return Response|void
     */
    public function edit(Page $page, PageRepository $repository)
    {
        $data = $repository->getPageData($page);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $page->sections;
        $data['page'] = $page->load('content');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());
        // return $data;

        if ($data['page']->type === 'custom') {
            return Inertia::render('Pages/Edit', $data);
        } elseif ($data['page']->type === 'regular') {
            $data['languages'] = json_decode(Setting::pull('languages'));

            return Inertia::render('Pages/RegularEdit', $data);
        }
    }

    /**
     * Update page
     *
     * @return RedirectResponse|void
     */
    public function update(Request $request, Page $page, PageRepository $repository, SettingRepository $settingRepository)
    {
        $repository->updatePage($request, $page, $settingRepository);

        return redirect()->route('admin.pages.index')->with('success', 'Successfully page updated');
    }

    /**
     * Delete page
     */
    public function destroy(Page $page): RedirectResponse
    {
        if ($page->type == 'regular') {
            return back()->with('error', 'This page is not deletable');
        }
        $page->delete();

        return back()->with('success', 'Page successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PageRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected items successfully deleted');
    }

    /**
     * Upload file
     */
    public function uploadFile(Request $request, PageRepository $repository): string
    {
        return $repository->uploadFile($request);
    }

    /**
     * Update page slug
     */
    public function updateSlug(PageSlugUpdateRequest $request, Page $page, PageRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $page);

        return back()->with('success', 'Page slug updated successfully!');
    }

    public function clone(Page $page, PageRepository $repository)
    {
        $repository->clone($page);

        return back()->with('success', 'Page successfully cloned');
    }
}
