<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\ProductStoreRequest;
use App\Http\Requests\Admin\Products\ProductUpdateRequest;
use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Setting;
use App\Repositories\Admin\ProductRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, ProductRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['products'] = $repository->paginateSearchResult($data['search'], $data['sort']);
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Products/Index', $data);
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
        $data['product_categories'] = ProductCategory::with('content')->get();
        $data['brands'] = Brand::with('content')->get();

        return Inertia::render('Products/Create', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request, ProductRepository $repository)
    {
        $repository->create($request);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, ProductRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['product'] = $repository->getEditedData($product);
        $data['product_categories'] = ProductCategory::with('content')->get();
        $data['brands'] = Brand::with('content')->get();

        return Inertia::render('Products/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdateRequest $request, Product $product, ProductRepository $repository)
    {
        $repository->update($request, $product);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product Updated Successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, ProductRepository $repository)
    {
        $repository->destroy($product);

        return back()->with('success', 'Product Successfully Deleted!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, ProductRepository $repository)
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Products Successfully Deleted!');
    }
}
