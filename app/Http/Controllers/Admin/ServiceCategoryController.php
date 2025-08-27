<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ServiceCategoryStoreRequest;
use App\Http\Requests\Admin\ServiceCategoryUpdateRequest;
use App\Models\ServiceCategory;
use App\Models\Setting;
use App\Repositories\Admin\ServiceCategoryRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceCategoryController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, ServiceCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);
        return Inertia::render('Services/Categories/Index', $data);
    }

    /**
     * Create category
     */
    public function create(): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        return Inertia::render('Services/Categories/Create', $data);
    }

    /**
     * Edit portfolio
     */
    public function edit(ServiceCategory $serviceCategory, ServiceCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['category'] = $repository->getEditData($serviceCategory);
        return Inertia::render('Services/Categories/Edit', $data);
    }

    /**
     * Update category
     */
    public function update(ServiceCategory $serviceCategory, ServiceCategoryUpdateRequest $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->update($serviceCategory, $request);

            return redirect()->route('admin.services.categories.index')->with('success', 'Category successfully updated');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Store category
     */
    public function store(ServiceCategoryStoreRequest $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.services.categories.index')->with('success', 'Category successfully created');
    }

    /**
     * Delete category
     */
    public function destroy(ServiceCategory $serviceCategory, ServiceCategoryRepository $repository): RedirectResponse
    {
        try {
            $repository->destroy($serviceCategory);

            return back()->with('success', 'Category successfully deleted');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, ServiceCategoryRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Category successfully deleted');
    }
}
