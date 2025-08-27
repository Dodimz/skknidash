<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\Brand\BrandStoreRequest;
use App\Http\Requests\Admin\Products\Brand\BrandUpdateRequest;
use App\Models\Brand;
use App\Models\Setting;
use App\Repositories\Admin\BrandRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    public function index(Request $request, BrandRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['brands'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Products/Brands/Index', $data);
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

        return Inertia::render('Products/Brands/Create', $data);
    }

    /**
     * Store brand
     */
    public function store(BrandStoreRequest $request, BrandRepository $repository)
    {
        $repository->create($request);
        return redirect()->route('admin.brands.index')->with('success', 'Brand successfully created!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand, BrandRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['brand'] = $repository->getEditData($brand);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Products/Brands/Edit', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BrandUpdateRequest $request, Brand $brand, BrandRepository $repository)
    {
        try {
            $repository->update($request, $brand);

            return redirect()->route('admin.brands.index')->with('success', 'Brand successfully updated!');
        } catch (\Exception $exception) {
            return back()->with('error', $exception->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand, BrandRepository $repository)
    {
        $repository->destroy($brand);
        return back()->with('success', 'Brand successfully deleted');
    }

    public function bulkDelete(Request $request, BrandRepository $repository)
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Brand successfully deleted!');
    }
}
