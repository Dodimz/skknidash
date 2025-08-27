<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\CaseStudy;
use App\Models\Setting;
use App\Repositories\Admin\CaseStudyRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;
use Inertia\Response;

class CaseStudyController extends Controller
{
    /**
     * Show case study
     */
    public function show($slug, CaseStudyRepository $repository): Response
    {
        if (Setting::pull("is_enabled_case_study") === "0") {
            abort(404);
        }

        $case_study = CaseStudy::where('slug', $slug)->first();
        $data['caseStudy'] = $case_study;

        if ($data['caseStudy']) {
            $current_page_url = request()->url();
            $meta_title = $case_study->content->meta_title ?? $case_study->content->title;
            $meta_description = $case_study->content->meta_description;
            $meta_tags = $case_study->content->meta_tags;
            $site_name = Setting::pull('site_name');
            $meta_image = $case_study->meta_image_url;
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

            $data['meta_description'] = $meta_description;
            $data['meta_image'] = $meta_image;
            $data['site_name'] = $site_name;
            $data = $repository->getCaseStudyData($case_study);

            return Inertia::render('Page/Page', $data);
        }
        abort(404);
    }
}
