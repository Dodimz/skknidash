<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Setting;
use App\Repositories\Admin\ServiceRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Service details
     */
    public function show($slug, ServiceRepository $repository): Response
    {
        if (Setting::pull("is_enabled_services") === "0") {
            abort(404);
        }

        $data['service'] = Service::where('slug', $slug)->first();
        if ($data['service']) {
            $current_page_url = request()->url();
            $meta_title = $data['service']->content->meta_title ?? $data['service']->content->title;
            $meta_description = $data['service']->content->meta_description;
            $meta_tags = $data['service']->content->meta_tags;
            $site_name = Setting::pull('site_name');
            $meta_image = $data['service']->meta_image_url;
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
            $data = $repository->getServiceData($data['service']);

            return Inertia::render('Page/Page', $data);
        }
        abort(404);
    }
}
