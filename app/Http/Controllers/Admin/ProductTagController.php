<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductTagStoreRequest;
use App\Models\Setting;
use App\Models\Tag;
use App\Repositories\Admin\ProductTagRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductTagController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete']]);
    }

    /**
     * Get tags
     */
    public function index(Request $request, ProductTagRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['tags'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Products/Tags/Index', $data);
    }

    public function create()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        return Inertia::render('Products/Tags/Create');
    }

    /**
     * Search tag
     */
    public function searchTag(Request $request): mixed
    {
        return Tag::containing($request->search)->pluck('name');
    }

    public function store(ProductTagStoreRequest $request, ProductTagRepository $repository)
    {
        $repository->create($request);
        return redirect()->route('admin.product.tags.index')->with('success', 'Tag successfully created');
    }

    public function edit(Tag $tag)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['tag'] = $tag;
        return Inertia::render('Products/Tags/Edit', $data);
    }

    public function update(ProductTagStoreRequest $request, Tag $tag, ProductTagRepository $repository)
    {
        $repository->update($request, $tag);
        return redirect()->route('admin.product.tags.index')->with('success', 'Tag successfully updated');
    }

    /**
     * Delete tag
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();

        return back()->with('success', 'Tag Successfully deleted');
    }

    /**
     * Bulk delete tag
     */
    public function bulkDelete(Request $request, ProductTagRepository $repository)
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected tag successfully deleted');
    }
}
