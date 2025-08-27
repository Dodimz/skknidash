<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tags\TagStoreRequest;
use App\Models\Tag;
use App\Repositories\Admin\TagRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'store']]);
    }

    /**
     * Get tags
     */
    public function index(Request $request, TagRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['tags'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Tags/Index', $data);
    }

    /**
     * Search tag
     */
    public function searchTag(Request $request): mixed
    {
        return Tag::containing($request->search)->pluck('name');
    }

    public function store(TagStoreRequest $request, TagRepository $repository): RedirectResponse
    {
        $repository->create($request);

        return back()->with('success', 'Tag successfully created');
    }

    /**
     * Delete tag
     */
    public function destroy(Tag $tag): RedirectResponse
    {
        $tag->delete();

        return back()->with('success', 'Tag Successfully deleted');
    }

    /**
     * Bulk delete tag
     */
    public function bulkDelete(Request $request, TagRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected tag successfully deleted');
    }
}
