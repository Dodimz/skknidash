<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Repositories\Admin\CommentRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommentController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'approved', 'unApproved']]);
    }

    /**
     * Get comments
     */
    public function index(Request $request, CommentRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? '';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['comments'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Comments/Index', $data);
    }

    /**
     * Approved Comment
     */
    public function approved(Comment $comment, CommentRepository $repository): RedirectResponse
    {
        $repository->approved($comment);

        return back()->with('success', 'Comment successfully approved!');
    }

    /**
     * UnApproved Comment
     */
    public function unApproved(Comment $comment, CommentRepository $repository): RedirectResponse
    {
        $repository->unApproved($comment);

        return back()->with('success', 'Comment successfully unapproved!');
    }

    /**
     * destroy comment
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back()->with('success', 'Comment successfully deleted');
    }

    /**
     * Bulk Delete comments
     */
    public function bulkDelete(Request $request): RedirectResponse
    {
        $ids = explode(',', $request->ids);
        Comment::destroy($ids);

        return back()->with('success', 'Your selected comment successfully deleted');
    }
}
