<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Models\ProductCategory;
use App\Models\Setting;
use App\Models\Tag;
use App\Repositories\Frontend\BlogRepository;
use App\Repositories\Frontend\PageRepository;
use App\Repositories\Frontend\ProductRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function home(PageRepository $repository)
    {
        $homePageId = Setting::pull('default_home_page');
        if (! $homePageId || ! $page = Page::find($homePageId)) {
            abort(404);
        }

        $data = $repository->getPageData($page);
        $seo = $this->setSeoData($page);
        $data['default_home_page'] = $homePageId;
        $data = array_merge($data, $seo);
        return Inertia::render('Page/Page', $data);
    }

    public function show($slug, PageRepository $pageRepository, BlogRepository $blogRepository, ProductRepository $productRepository)
    {
        $page = Page::where('slug', $slug)->with('content')->first();
        if (! $page) {
            abort(404);
        }

        return match ($page->rendered_page) {
            'basic' => $this->renderedBasic($pageRepository, $page),
            'blogs' => $this->renderedBlogs(request(), $blogRepository, $page),
            'shop' => $this->renderedShop(request(), $productRepository, $page),
            'cart' => $this->renderedCart($page),
            default => abort(404),
        };
    }

    public function renderedBasic(PageRepository $repository, Page $page)
    {
        $data = $repository->getPageData($page);
        $data['page'] = $page;
        $seo = $this->setSeoData($page);
        $data = array_merge($data, $seo);
        return Inertia::render('Page/Page', $data);
    }

    public function renderedBlogs(Request $request, BlogRepository $repository, Page $page)
    {
        $data = [
            'categories' => Category::with('content')->withCount('posts')->get(),
            'tags' => Tag::whereHas('posts')->pluck('name'),
            'slug' => $page->slug,
            'filter' => [
                'category' => $request->input('filter.category', ''),
                'tag' => $request->input('filter.tag', ''),
                'author' => $request->input('filter.author', ''),
            ],
            'recent_post' => Post::where('status', '1')->with('content')->latest()->take(4)->get(),
            'search' => $request->input('search', ''),
            'is_show_blog_details_sidebar' => Setting::pull('is_show_blog_details_sidebar'),
        ];

        $data['posts'] = $repository->paginateSearchResult($data['search'], $data['filter']);

        $seo = $this->setSeoData($page);
        $data = array_merge($data, $seo);

        return Inertia::render('Blogs/Index', $data);
    }

    public function renderedShop(Request $request, ProductRepository $repository, Page $page)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?? '';
        $data['filter']['category'] = $request->filter['category'] ?? '';
        $data['filter']['brand'] = $request->filter['brand'] ?? '';
        $data['filter']['tag'] = $request->filter['tag'] ?? '';
        $data['filter']['type'] = $request->filter['type'] ?? '';
        $data['max_price'] = $repository->getMaxProductPrice();
        $data['filter']['min_price'] = $request->filter['min_price'] ?? 0;
        $data['filter']['max_price'] = $request->filter['max_price'] ?? $data['max_price'];
        $data['filter']['sort'] = $request->filter['sort'] ?? 'latest';
        $data['tags'] = Tag::whereHas('products')->pluck('name');
        $data['categories'] = ProductCategory::withCount('products')->with('content')->get();
        $data['brands'] = Brand::withCount('products')->with('content')->get();
        $data['products'] = $repository->paginateSearchResult($data['search'], $data['filter']);
        $data['slug'] = $page->slug;

        $seo = $this->setSeoData($page);
        $data = array_merge($data, $seo);

        // return $data;
        return Inertia::render('Shop/Index', $data);
    }

    public function renderedCart(Page $page)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }
        $data = $this->setSeoData($page);
        $data['slug'] = $page->slug;
        $data['shop_slug'] = Page::where('rendered_page', 'shop')->firstOrFail()->slug;
        return Inertia::render('Cart/Index', $data);
    }

    private function setSeoData(Page $page): array
    {
        $metaTitle = $page->content->meta_title ?? $page->content->title;
        $metaDescription = $page->content->meta_description;
        $metaTags = $page->content->meta_tags ?? '';
        $metaImage = asset($page->meta_image);
        $siteName = Setting::pull('site_name');
        $currentUrl = request()->url();
        $tagline = Setting::pull('tagline');

        SEOMeta::setTitle($metaTitle);
        SEOMeta::setDescription($metaDescription);
        SEOMeta::setCanonical($currentUrl);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');
        SEOMeta::addKeyword(explode(',', $metaTags));

        OpenGraph::setTitle($metaTitle);
        OpenGraph::setDescription($metaDescription);
        OpenGraph::setUrl($currentUrl);
        OpenGraph::setSiteName($siteName);
        OpenGraph::addProperty('type', 'website');
        OpenGraph::addImage($metaImage);

        TwitterCard::setTitle($metaTitle);
        TwitterCard::setSite('@tuedioncom');
        TwitterCard::setDescription($metaDescription);
        TwitterCard::setType('summary_large_image');
        TwitterCard::setImage($metaImage);

        return [
            'title' => $page->content->title,
            'meta_title' => $metaTitle,
            'meta_tags' => $metaTags,
            'meta_description' => $metaDescription,
            'meta_image' => $metaImage,
            'site_name' => $siteName,
            'tagline' => $tagline,
        ];
    }
}
