<?php

namespace App\Repositories\Frontend;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class BlogRepository
{
    protected Post $model;

    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    public function paginateSearchResult($search, array $filter = [])
    {
        $query = $this->model->with([
            'content',
            'category.content',
            'user',
        ])->withCount('comments')->newQuery();

        if (! empty($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            })->orWhereHas('category.contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            })->orWhereHas('tags', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        if (! empty($filter['category'])) {
            $query->whereHas('category.content', function ($q) use ($filter) {
                $q->where('title', $filter['category']);
            });
        }

        if (! empty($filter['tag'])) {
            $query->withAnyTags([$filter['tag']]);
        }

        if (! empty($filter['author'])) {
            $query->whereHas('user', function ($q) use ($filter) {
                $q->where('id', $filter['author']);
            });
        }

        return $query->where('status', '1')->paginate(6);
    }

    /**
     * Show blog post
     */
    public function show($slug): mixed
    {
        $post = $this->model->with(['content', 'category.content', 'comments', 'user'])->where('slug', $slug)->withCount('comments')->first();
        if (! $post) {
            abort(404);
        }

        return $post;
    }

    /**
     * Post comment store
     */
    public function storeComment(Request $request): void
    {
        Comment::create([
            'post_id' => $request->post_id,
            'comment_parent' => $request->comment_parent,
            'comment_content' => $request->comment,
            'comment_author_website' => $request->website,
            'comment_author_email' => $request->email,
            'comment_author_name' => $request->full_name,
        ]);
    }

    /**
     * Get published blog
     *
     * @return mixed
     */
    public function getPublishedBlogs()
    {
        return $this->model->where('status', '1')
            ->with('content', 'user', 'category.content')
            ->take(10)
            ->inRandomOrder()
            ->latest()
            ->get();
    }
}
