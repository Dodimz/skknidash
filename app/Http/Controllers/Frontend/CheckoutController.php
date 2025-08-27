<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CheckoutRequest;
use App\Models\Coupon;
use App\Models\ManualPaymentGateway;
use App\Models\Page;
use App\Models\Setting;
use App\Repositories\Frontend\CheckoutRepository;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function applyCoupon(Request $request)
    {
        $coupon = Coupon::where('code', $request->code)->first();

        if (! $coupon) {
            return response([
                'success' => false,
                'message' => 'Invalid coupon code',
            ], 404);
        }

        $now = Carbon::now();

        if (
            ($coupon->start_date && $now->lt($coupon->start_date)) ||
            ($coupon->end_date && $now->gt($coupon->end_date))
        ) {
            return response([
                'success' => false,
                'message' => 'Coupon has expired or is not active yet.',
            ], 400);
        }

        return response([
            'success' => true,
            'message' => 'Coupon applied successfully.',
            'coupon' => $coupon,
        ]);
    }

    public function checkout()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['payment_gateway'] = [
            'is_paypal_active' => Setting::pull('paypal_is_active') == '1',
            'is_stripe_active' => Setting::pull('stripe_is_active') == '1',
            'is_sslcz_active' => Setting::pull('sslcz_is_active') == '1',
            'is_flutterwave_active' => Setting::pull('flutterwave_is_active') == '1',
            'is_razorpay_active' => Setting::pull('razorpay_is_active') == '1',
            'is_cod_active' => Setting::pull('cod_is_active') == '1',
        ];

        $data['manual_payment_gateways'] = ManualPaymentGateway::where('status', '1')->with('content')->get();

        $terms_condition_page_id = Setting::pull('default_terms_and_conditions_page');
        $page = Page::find($terms_condition_page_id);
        $data['terms_condition_url'] = route('pages.show', $page->slug);

        $current_page_url = request()->url();
        $meta_tags = 'checkout';
        $site_name = Setting::pull('site_name');
        $tagline = __('Checkout');

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

        return inertia('Checkout/Index', $data);
    }

    public function placeOrder(CheckoutRequest $request, CheckoutRepository $repository)
    {
        return $repository->checkout($request);
    }
}
