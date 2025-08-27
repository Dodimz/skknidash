<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\PricingPlanStoreRequest;
use App\Models\Page;
use App\Models\PricingPlan;
use App\Models\Setting;
use App\Repositories\Frontend\PricingPlanRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Inertia\Inertia;

class PricingPlanController extends Controller
{
    public function pay(PricingPlanStoreRequest $request, PricingPlan $pricingPlan, PricingPlanRepository $repository)
    {
        try {
            return $repository->makePayment($request, $pricingPlan);
        } catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function index()
    {
        $data['pricing_plans'] = PricingPlan::with(['currency', 'content'])->get();

        $current_page_url = request()->url();
        $meta_tags = 'pricing_plans';
        $site_name = Setting::pull('site_name');
        $tagline = __('Pricing Plan');

        SEOMeta::setTitle($tagline . ' - ' . $site_name);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');

        TwitterCard::setSite('@bione');
        TwitterCard::setType('summary_large_image');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');
        $data['meta_tags'] = $meta_tags;
        $data['tagline'] = $tagline;
        $data['site_name'] = $site_name;

        // return $data['pricing_plans'];

        return Inertia::render('PricingPlan/PricingPlan', $data);
    }

    /**
     *  show Pricing Plan
     */
    public function show(PricingPlan $pricingPlan)
    {
        $data['payment_gateway'] = [
            'is_paypal_active' => Setting::pull('paypal_is_active') == '1',
            'is_stripe_active' => Setting::pull('stripe_is_active') == '1',
            'is_sslcz_active' => Setting::pull('sslcz_is_active') == '1',
            'is_flutterwave_active' => Setting::pull('flutterwave_is_active') == '1',
            'is_razorpay_active' => Setting::pull('razorpay_is_active') == '1',
        ];
        $data['pricing_plan'] = $pricingPlan->load('currency', 'content');
        $current_page_url = request()->url();
        $meta_tags = 'pricing_plans';
        $site_name = Setting::pull('site_name');
        $tagline = $data['pricing_plan']->name;

        $terms_condition_page_id = Setting::pull('default_terms_and_conditions_page');
        $page = Page::find($terms_condition_page_id);
        $data['terms_condition_url'] = route('pages.show', $page->slug);

        SEOMeta::setTitle($tagline . ' - ' . $site_name);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');

        TwitterCard::setSite('@bione');
        TwitterCard::setType('summary_large_image');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');
        $data['meta_tags'] = $meta_tags;
        $data['tagline'] = $tagline;
        $data['site_name'] = $site_name;

        return Inertia::render('PricingPlan/Show', $data);
    }
}
