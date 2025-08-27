<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CaseStudyCategoryStoreRequest;
use App\Http\Requests\Admin\CaseStudyCategoryUpdateRequest;
use App\Models\CaseStudyCategory;
use App\Models\Setting;
use App\Repositories\Admin\CaseStudyCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyCategoriesController extends Controller
{

    /**
     * Get the middleware that should be assigned to the controller.
     */
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }
    public function index(Request $request, CaseStudyCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('CaseStudy/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        return Inertia::render('CaseStudy/Categories/Create', $data);
    }

    /**
     * Edit portfolio
     */
    public function edit(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['category'] = $repository->getEditData($caseStudyCategory);
        return Inertia::render('CaseStudy/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryUpdateRequest $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($caseStudyCategory, $request);
            return redirect()->route('admin.case.study.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Store category
     */
    public function store(CaseStudyCategoryStoreRequest $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);
        return redirect()->route('admin.case.study.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(CaseStudyCategory $caseStudyCategory, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($caseStudyCategory);
            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, CaseStudyCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Category successfully deleted');
    }
}
