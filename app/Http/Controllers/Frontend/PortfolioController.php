<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use App\Models\PortfolioContent;
use App\Models\Setting;
use App\Repositories\Admin\PortfolioRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Portfolio show
     */
    public function show($slug, PortfolioRepository $repository): Response
    {
        if (Setting::pull("is_enabled_portfolio") === "0") {
            abort(404);
        }

        $data['portfolio'] = Portfolio::where('slug', $slug)->first();

        if ($data['portfolio']) {
            $portfolioContent = PortfolioContent::where('portfolio_id', $data['portfolio']->id)->first();

            $current_page_url = request()->url();
            $meta_title = $portfolioContent ? $portfolioContent->meta_title : $portfolioContent->title;
            $meta_description = $portfolioContent ? $portfolioContent->meta_description : '';
            $meta_tags = $portfolioContent ? $portfolioContent->meta_tags : '';
            $site_name = Setting::pull('site_name');
            $meta_image = $data['portfolio']->meta_image_url;

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

            $data['site_name'] = $site_name;
            $data['nextPortfolio'] = Portfolio::where('id', '>', $data['portfolio']->id)
                ->orderBy('id', 'asc')
                ->first();

            $data['prevPortfolio'] = Portfolio::where('id', '<', $data['portfolio']->id)
                ->orderBy('id', 'asc')
                ->first();

            $data = $repository->getPortfolioData($data['portfolio']);

            return Inertia::render('Page/Page', $data);
        }
        abort(404);
    }
}
