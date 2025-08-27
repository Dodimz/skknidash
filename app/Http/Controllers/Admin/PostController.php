<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Posts\PostSlugUpdateRequest;
use App\Http\Requests\Admin\Posts\PostStoreRequest;
use App\Http\Requests\Admin\Posts\PostUpdateRequest;
use App\Http\Resources\Admin\PostCategoryCollection;
use App\Models\Category;
use App\Models\Post;
use App\Models\Setting;
use App\Repositories\Admin\PostRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Apply permission
     */
    public function __construct()
    {
        $this->middleware('can:posts.index', ['only' => ['index']]);
        $this->middleware('can:posts.show', ['only' => ['show']]);
        $this->middleware('can:posts.create', ['only' => ['create']]);
        $this->middleware('can:posts.edit', ['only' => ['edit', 'bulkPublish', 'update', 'statusToggle', 'bulkUnPublish']]);
        $this->middleware('can:posts.delete', ['only' => ['delete', 'bulkDelete']]);

        // for demo mood
        $this->middleware('demo', ['only' => ['update', 'bulkPublish', 'bulkUnPublish', 'statusToggle', 'destroy', 'bulkDelete', 'store']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, PostRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['status'] = $request->filter['status'] ?? 'All Status';
        $data['filter']['category'] = $request->filter['category'] ?? 'All Categories';
        $default_lang = Setting::pull('default_lang');
        $data['filtered_lang'] = $request->filter['lang'] ?? $default_lang;
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = new PostCategoryCollection(Category::with('contents')->get());
        $data['posts'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('Posts/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = new PostCategoryCollection(Category::with('contents')->get());

        return Inertia::render('Posts/Create', $data);
    }

    /**
     * Store new post
     */
    public function store(PostStoreRequest $request, PostRepository $repository): RedirectResponse
    {
        $repository->create($request);

        return redirect()->route('admin.posts.index')->with('success', 'Post successfully created');
    }

    /**
     * Show the form for edit post
     */
    public function edit(Post $post, PostRepository $repository): Response
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['categories'] = new PostCategoryCollection(Category::with('contents')->get());
        $data['edited_post'] = $repository->getEditedData($post);

        return Inertia::render('Posts/Edit', $data);
    }

    /**
     * Update post
     */
    public function update(PostUpdateRequest $request, Post $post, PostRepository $repository): RedirectResponse
    {
        $repository->update($request, $post);

        return redirect()->route('admin.posts.index')->with('success', 'Post successfully updated!');
    }

    /**
     * Delete post
     */
    public function destroy(Post $post, PostRepository $repository): RedirectResponse
    {
        $repository->destroy($post);

        return back()->with('success', 'Post successfully deleted!');
    }

    /**
     * Build delete
     */
    public function bulkDelete(Request $request, PostRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Post successfully deleted!');
    }

    /**
     * Bulk publish
     */
    public function bulkPublish(Request $request, PostRepository $repository): RedirectResponse
    {
        $repository->bulkPublish($request->ids);

        return back()->with('success', 'Post successfully published!');
    }

    /**
     * Bulk un-publish
     */
    public function bulkUnPublish(Request $request, PostRepository $repository): RedirectResponse
    {
        $repository->bulkUnPublish($request->ids);

        return back()->with('success', 'Post successfully unpublished!');
    }

    /**
     * Post status toggle
     */
    public function statusToggle(Request $request, PostRepository $repository): RedirectResponse
    {
        $repository->statusToggle($request->id);

        return back()->with('success', 'Post status has been changed!');
    }

    /**
     * Post slug update
     */
    public function updateSlug(PostSlugUpdateRequest $request, Post $post, PostRepository $repository): RedirectResponse
    {
        $repository->updateSlug($request, $post);

        return back()->with('success', 'Post slug updated successfully!');
    }
}
