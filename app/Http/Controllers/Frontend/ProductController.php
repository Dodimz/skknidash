<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Setting;
use App\Models\Tag;
use App\Repositories\Frontend\ProductRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($slug)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['tags'] = Tag::whereHas('products')->pluck('name');
        $data['product'] = Product::where('slug', $slug)->with('content', 'reviews', 'category.content', 'brand.content', 'tags')->withAvg('reviews', 'rating')->first();
        $data['categories'] = ProductCategory::withCount('products')->with('content')->get();
        $data['slug'] = Page::where('rendered_page', 'shop')->firstOrFail()->slug;


        $current_page_url = request()->url();
        $meta_title = $data['product']->seo_title ?? $data['product']->content->title;
        $meta_description = $data['product']->seo_description;
        $meta_tags = 'Product tags';
        $site_name = Setting::pull('site_name');
        $meta_image = $data['product']->thumbnail_image_url;
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

        TwitterCard::setTitle($meta_title);
        TwitterCard::setSite('@bione');
        TwitterCard::setDescription($meta_description);
        TwitterCard::setType('summary_large_image');
        TwitterCard::setImage($meta_image);
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');

        $data['meta_title'] = $meta_title;
        $data['meta_description'] = $meta_description;
        $data['meta_image'] = $meta_image;
        $data['site_name'] = $site_name;

        return Inertia::render('Shop/Show', $data);
    }
}
