<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudy;
use App\Models\Category;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Product;
use App\Models\Service;
use App\Models\Tag;
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SeoRepository
{
    public function generateSitemap()
    {
        $sitemap = Sitemap::create();

        // page sitemap
        Page::all()->each(function (Page $page) use ($sitemap) {
            $sitemap->add(Url::create(route('pages.show', $page->slug))
                ->setLastModificationDate($page->updated_at));
        });

        $blogPageSlug = Page::where('rendered_page', 'blogs')->first()->slug;
        $shopPageSlug = Page::where('rendered_page', 'shop')->first()->slug;

        // blog index sitemap
        $sitemap->add(Url::create(route('pages.show', $blogPageSlug))
            ->setLastModificationDate(Carbon::now()));

        // blog details sitemap
        Post::all()->each(function (Post $post) use ($sitemap) {
            $sitemap->add(Url::create(route('blog.show', $post->slug))
                ->setLastModificationDate($post->updated_at));
        });

        // portfolio sitemap
        Portfolio::all()->each(function (Portfolio $portfolio) use ($sitemap) {
            $sitemap->add(Url::create(route('portfolio.show', $portfolio->slug))
                ->setLastModificationDate($portfolio->updated_at));
        });

        // service sitemap
        Service::all()->each(function (Service $service) use ($sitemap) {
            $sitemap->add(Url::create(route('service.show', $service->slug))
                ->setLastModificationDate($service->updated_at));
        });

        // product sitemap
        Product::all()->each(function (Product $product) use ($sitemap) {
            $sitemap->add(Url::create(route('shop.show', $product->slug))
                ->setLastModificationDate($product->updated_at));
        });

        // case study sitemap
        CaseStudy::all()->each(function (CaseStudy $caseStudy) use ($sitemap) {
            $sitemap->add(Url::create(route('case.study.show', $caseStudy->slug))
                ->setLastModificationDate($caseStudy->updated_at));
        });

        $sitemap->writeToFile(public_path('sitemap.xml'));
    }
}
