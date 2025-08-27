<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\PostCommentRequest;
use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Models\Setting;
use App\Models\Tag;
use App\Repositories\Frontend\BlogRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function show($slug, BlogRepository $repository)
    {
        $data['categories'] = Category::with('content')
            ->withCount('posts')
            ->get();
        $data['recent_post'] = Post::where('status', '1')->with(['content', 'user'])->latest()->take(4)->get();
        $data['tags'] = Tag::whereHas('posts')->pluck('name');
        $blog = $repository->show($slug);
        $data['blog'] = $blog;
        $data['slug'] = Page::where('rendered_page', 'blogs')->first()->slug;
        $data['page'] = Page::where('rendered_page', 'blogs')->with('content')->first();

        $current_page_url = request()->url();
        $meta_title = $blog?->content->meta_title ?? $blog?->content->title;
        $meta_description = $blog?->content->meta_description;
        $meta_tags = $blog?->content->meta_tags;
        $site_name = Setting::pull('site_name');
        $tagline = $blog?->content->title;
        $meta_image = $blog->thumbnail_image_url;
        SEOMeta::setTitle($meta_title);
        SEOMeta::setDescription($meta_description);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setTitle($meta_title);
        OpenGraph::setDescription($meta_description);
        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');
        OpenGraph::addImage($meta_image);

        TwitterCard::setTitle($meta_title);
        TwitterCard::setSite('@prohealth');
        TwitterCard::setDescription($meta_description);
        TwitterCard::setType('summary_large_image');
        TwitterCard::setImage($meta_image);
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');

        $data['meta_title'] = $meta_title;
        $data['meta_description'] = $meta_description;
        $data['meta_image'] = $meta_image;
        $data['site_name'] = $site_name;

        return Inertia::render('Blogs/BlogDetails', $data);
    }

    public function comment(PostCommentRequest $request, BlogRepository $repository)
    {
        $repository->storeComment($request);

        return back();
    }
}
