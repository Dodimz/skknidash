<?php

namespace App\Repositories\Frontend;

use App\Models\PaymentHistory;
use App\Models\PricingPlan;
use App\Services\PaymentGateway\FlutterWave;
use App\Services\PaymentGateway\Paypal;
use App\Services\PaymentGateway\Razorpay;
use App\Services\PaymentGateway\SSLCommerz;
use App\Services\PaymentGateway\Stripe;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class PricingPlanRepository
{
    public function makePayment(Request $request, PricingPlan $pricingPlan)
    {
        $payment_method = $request->payment_method;

        $paymentHistory = PaymentHistory::create([
            'name' => $request->input('name'),
            'plan_id' => $pricingPlan->id,
            'amount' => $pricingPlan->price,
            'email' => $request->input('email'),
            'mobile' => $request->input('mobile'),
            'whatsapp_or_skype' => $request->input('whatsapp_skype'),
            'method' => $request->input('payment_method'),
            'status' => 'awaiting_payment',
            'note' => $request->input('note'),
        ]);

        switch ($payment_method) {
            case 'paypal':
                $paypal = new Paypal;
                $body = [
                    'intent' => 'CAPTURE',
                    'purchase_units' => [[
                        'reference_id' => rand(000000, 999999),
                        'amount' => [
                            'value' => number_format($pricingPlan->price, 2, '.', ''),
                            'currency_code' => $pricingPlan->currency->code,
                        ],
                    ]],
                    'application_context' => [
                        'cancel_url' => route('payment.cancel', ['method' => 'paypal', 'identifier' => $paymentHistory]),
                        'return_url' => route('payment.success', ['method' => 'paypal', 'identifier' => $paymentHistory]),
                    ],
                ];

                $response = $paypal->initializePayment($body);

                return Inertia::location($response->links[1]->href);
            case 'stripe':
                $stripe = new Stripe;
                $body = [
                    'line_items' => [[
                        'price_data' => [
                            'currency' => $pricingPlan->currency->code,
                            'product_data' => [
                                'name' => $pricingPlan->content->name,
                            ],
                            'unit_amount' => 100 * $pricingPlan->price, // Amount in cents, adjust accordingly
                        ],
                        'quantity' => 1,
                    ]],
                    'mode' => 'payment',
                    'success_url' => route('payment.success', ['method' => 'stripe', 'identifier' => $paymentHistory]),
                    'cancel_url' => route('payment.cancel', ['method' => 'stripe', 'identifier' => $paymentHistory]),
                ];
                try {
                    $response = $stripe->initializePayment($body);
                    Session::put('paymentId', $response->id);
                    // save payment id to db
                    $paymentHistory->update(['payment_identifier' => $response->id]);

                    return Inertia::location($response->url);
                } catch (\Exception $exception) {
                    throw new Exception($exception->getMessage());
                }

            case 'sslcmz':
                $sslcmz = new SSLCommerz($paymentHistory->id);
                $body = [
                    'total_amount' => $pricingPlan->price,
                    'currency' => $pricingPlan->currency->code,
                    'tran_id' => $paymentHistory->id,

                    'cus_name' => $request->name,
                    'cus_email' => $request->email,
                    'cus_add1' => '',
                    'cus_add2' => '',
                    'cus_city' => '',
                    'cus_postcode' => '',
                    'cus_country' => 'Bangladesh',
                    'cus_phone' => $request->mobile,

                    'ship_name' => '',
                    'ship_add1' => '',
                    'ship_add2' => '',
                    'ship_city' => '',
                    'ship_state' => '',
                    'ship_postcode' => '',
                    'ship_phone' => $request->mobile,
                    'ship_country' => 'Bangladesh',

                    'shipping_method' => 'NO',
                    'product_name' => [$pricingPlan->content->name],
                    'product_category' => [$pricingPlan->content->name],
                    'product_profile' => 'general',
                ];
                try {
                    $response = $sslcmz->initilizePatment($body);
                    $result = json_decode($response);

                    return Inertia::location($result->data);
                } catch (\Exception $exception) {
                    dd($exception->getMessage());
                    throw new Exception($exception->getMessage());
                }

            case 'flutterwave':
                try {
                    $flutterwave = new FlutterWave;
                    $data = [
                        'amount' => $pricingPlan->price,
                        'currency' => $pricingPlan->currency->code,
                        'customer' => [
                            'name' => $request->name,
                            'email' => $request->email,
                            'phonenumber' => $request->mobile,
                        ],
                        'tx_ref' => $paymentHistory->id,
                        'redirect_url' => route('payment.success', ['method' => 'flutterwave', 'identifier' => $paymentHistory]),
                    ];
                    $response = $flutterwave->initializePayment($data);

                    return Inertia::location($response['data']['link']);
                } catch (\Exception $exception) {
                }

            case 'razorpay':
                $razorpay = new Razorpay;
                $data = ['receipt' => 'R-' . rand(000000, 999999), 'amount' => (int) $pricingPlan->price * 100, 'currency' => $pricingPlan->currency->code];
                $order_id = $razorpay->initilizePatment($data);
                $url = route('payment.razorpay.pay', ['order_id' => $order_id, 'payment_id' => $paymentHistory->id]);

                return Inertia::location($url);
        }
    }
}
