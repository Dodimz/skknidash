<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PortfolioCategoryStoreRequest;
use App\Http\Requests\Admin\PortfolioCategoryUpdateRequest;
use App\Models\Portfolio;
use App\Models\PortfolioCategory;
use App\Models\Setting;
use App\Repositories\Admin\PortfolioCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioCategoryController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, PortfolioCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Portfolios/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Portfolios/Categories/Create', $data);
    }

    /**
     * Edit portfolio
     */
    public function edit(PortfolioCategory $portfolioCategory, PortfolioCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['category'] = $repository->getEditData($portfolioCategory);

        return Inertia::render('Portfolios/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(PortfolioCategory $portfolioCategory, PortfolioCategoryUpdateRequest $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($portfolioCategory, $request);

            return redirect()->route('admin.portfolios.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Store category
     */
    public function store(PortfolioCategoryStoreRequest $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.portfolios.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(PortfolioCategory $portfolioCategory, PortfolioCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($portfolioCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, PortfolioCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Category successfully deleted');
    }
}
