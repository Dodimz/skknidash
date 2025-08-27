<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Teams\TeamSlugUpdateRequest;
use App\Http\Resources\Admin\CaseStudyUrlResource;
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
use App\Models\Setting;
use App\Models\Team;
use App\Repositories\Admin\TeamRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'updateSlug', 'clone']]);
    }

    /**
     * Get teams
     */
    public function index(Request $request, TeamRepository $repository): Response
    {
        if (Setting::pull("is_enabled_team") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['teams'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Teams/Index', $data);
    }

    /**
     * Create team
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_team") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Teams/Create', $data);
    }

    /**
     * Store team
     */
    public function store(Request $request, TeamRepository $repository): RedirectResponse
    {
        $repository->store($request);
        return redirect()->route('admin.teams.index')->with('success', 'Team successfully created');
    }

    /**
     * Edit team
     */
    public function edit(Team $team, TeamRepository $repository)
    {
        if (Setting::pull("is_enabled_team") === "0") {
            abort(404);
        }

        $data = $repository->getTeamData($team);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['sections'] = $team->sections;
        $data['team'] = $team;
        $data['pricing_plans'] = PricingPlanUrlResource::collection(PricingPlan::with('content')->get());
        $data['case_studies'] = CaseStudyUrlResource::collection(CaseStudy::with('content')->get());
        $data['services'] = ServicesUrlResource::collection(Service::with('content')->get());
        $data['portfolios'] = PortfoliosUrlResource::collection(Portfolio::with('content')->get());
        $data['teams'] = TeamsUrlResource::collection(Team::with('content')->get());
        $data['product_categories'] = ProductCategoryUrlResource::collection(ProductCategory::with('content')->get());

        return Inertia::render('Teams/Edit', $data);
    }

    /**
     * Update team
     */
    public function update(Request $request, Team $team, TeamRepository $repository): RedirectResponse
    {
        $repository->update($request, $team);

        return redirect()->route('admin.teams.index')->with('success', 'Team successfully updated');
    }

    /**
     * Delete team
     */
    public function destroy(Team $team, TeamRepository $repository): RedirectResponse
    {
        $repository->destroy($team);

        return back()->with('success', 'Team successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, TeamRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected team successfully deleted');
    }

    /**
     * update slug
     */
    public function updateSlug(TeamSlugUpdateRequest $request, Team $team, TeamRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $team);

        return back()->with('success', 'Team slug updated successfully!');
    }

    public function clone(Team $team, TeamRepository $repository)
    {
        $repository->clone($team);

        return back()->with('success', 'Team successfully cloned');
    }
}
