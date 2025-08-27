<?php

namespace App\Repositories\Admin;

use App\Models\CategoryContent;
use App\Models\Post;
use App\Models\PostContent;
use App\Models\Setting;
use App\Models\User;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Post $model;

    /**
     * Constructor for Post repository
     */
    public function __construct(Post $post)
    {
        $this->model = $post;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->with(['content', 'category.content', 'user'])->withCount('comments')->newQuery();

        // search post
        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('title', 'like', "%{$search}%");
            })->orWhereHas('category.contents', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%");
            });
        }

        // Filter post by category title
        if (isset($filter['category']) && $filter['category'] !== 'All Categories') {
            $query->whereHas('category.content', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // Filter post by status
        if (isset($filter['status']) && $filter['status'] !== 'All Status') {
            $statusNo = $filter['status'] == 'Published' ? '1' : '0';
            $query->where('status', $statusNo);
        }

        // sort post
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(PostContent::select($sort['column'])
                    ->whereColumn('posts.id', 'post_contents.post_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'published_by') {
                $query->orderBy(
                    User::select('name')
                        ->whereColumn('users.id', 'posts.user_id'),
                    $order
                );
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    CategoryContent::select('title')
                        ->whereColumn('category_contents.category_id', 'posts.category_id')
                        ->where('language_code', app()->getLocale()),
                    $order
                );
            } else {
                $query->orderBy($column, $order);
            }
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Create post
     */
    public function create(Request $request): void
    {
        $defaultLang = Setting::pull('default_lang');

        // create post
        $post = $this->model->create([
            'slug' => Str::slug($request[$defaultLang.'_title']),
            'user_id' => Auth::id(),
            'category_id' => $request->input('category'),
            'thumbnail_image' => $request->thumbnail_image,
            'status' => $request->input('status'),
        ]);

        // assign tags
        if ($request->tags) {
            $post->attachTags($request->tags);
        }

        $languages = json_decode(Setting::pull('languages'), true);

        $content = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'title' => $request[$langCode.'_title'],
                'content' => $request[$langCode.'_content'],
                'meta_title' => $request[$langCode.'_meta_title'],
                'meta_description' => $request[$langCode.'_meta_description'],
            ];
        }, $languages);

        $post->contents()->createMany($content);
    }

    /**
     * Get featured post
     *
     * @return array
     */
    public function getEditedData(Post $post)
    {
        $languages = json_decode(Setting::pull('languages'), true);

        $data = [
            'id' => $post->id,
            'thumbnail_image' => $post->thumbnail_image,
            'status' => $post->status,
            'category' => $post->category_id,
            'tags' => $post->tags?->pluck('name'),
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode.'_title'] = '';
            $data[$langCode.'_content	'] = '';
            $data[$langCode.'_meta_title'] = '';
            $data[$langCode.'_meta_description'] = '';
        }

        foreach ($post->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode.'_title'] = $content->title;
            $data[$langCode.'_content'] = $content->content;
            $data[$langCode.'_meta_title'] = $content->meta_title;
            $data[$langCode.'_meta_description'] = $content->meta_description;
        }

        return $data;
    }

    /**
     * Update post
     */
    public function update(Request $request, Post $post): void
    {
        $category = $request->input('category');

        // update post data
        $post->update([
            'category_id' => $category,
            'thumbnail_image' => $request->input('thumbnail_image'),
            'status' => $request->input('status'),
        ]);

        // Detach all existing tags
        $post->detachTags($post->tags);

        // attach tags
        $post->attachTags($request->tags);

        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $post->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'title' => $request[$langCode.'_title'],
                    'content' => $request[$langCode.'_content'],
                    'meta_title' => $request[$langCode.'_meta_title'],
                    'meta_description' => $request[$langCode.'_meta_description'],
                ],
            );
        }
    }

    /**
     * Delete post
     */
    public function destroy(Post $post): void
    {
        $post->delete();
    }

    /**
     * Bulk delete posts
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }

    /**
     * Bulk publish posts
     */
    public function bulkPublish($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->whereIn('id', $idArray)->update(['status' => '1']);
    }

    /**
     * Bulk un-publish posts
     */
    public function bulkUnPublish($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->whereIn('id', $idArray)->update(['status' => '0']);
    }

    /**
     * Toggle post status
     */
    public function statusToggle($postId): void
    {
        $post = $this->model->find($postId);
        $newStatus = $post->status == '1' ? '0' : '1';
        $post->status = $newStatus;
        $post->save();
    }

    /**
     * Update post slug
     */
    public function updateSlug(Request $request, Post $post)
    {
        $post->update(['slug' => $request->input('slug')]);
    }
}
