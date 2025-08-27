<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\Categories\ProductCategoryStoreRequest;
use App\Http\Requests\Admin\Products\Categories\ProductCategoryUpdateRequest;
use App\Models\Category;
use App\Models\ProductCategory;
use App\Models\Setting;
use App\Repositories\Admin\ProductCategoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductCategoryController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, ProductCategoryRepository $repository): Response
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['categories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Products/Categories/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Products/Categories/Create', $data);
    }

    /**
     * Store category
     */
    public function store(ProductCategoryStoreRequest $request, ProductCategoryRepository $repository)
    {
        $repository->create($request);
        return redirect()->route('admin.product.categories.index')->with('success', 'Category successfully created!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $category, ProductCategoryRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['category'] = $repository->getEditData($category);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Products/Categories/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductCategoryUpdateRequest $request, ProductCategory $category, ProductCategoryRepository $repository)
    {
        try {
            $repository->update($request, $category);

            return redirect()->route('admin.product.categories.index')->with('success', 'Category successfully updated!');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductCategory $category, ProductCategoryRepository $repository)
    {
        $repository->destroy($category);
        return back()->with('success', 'Category successfully deleted');
    }

    public function bulkDelete(Request $request, ProductCategoryRepository $repository)
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Category successfully deleted!');
    }
}
