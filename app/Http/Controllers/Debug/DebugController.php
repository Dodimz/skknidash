<?php

namespace App\Http\Controllers\Debug;

use App\Http\Controllers\Controller;
use App\Services\PaymentGateway\FlutterWave;
use App\Services\PaymentGateway\Paypal;
use App\Services\PaymentGateway\Razorpay;
use App\Services\PaymentGateway\SSLCommerz;
use App\Services\PaymentGateway\Stripe;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redirect;

class DebugController extends Controller
{
    public function any()
    {
        //        $paypal = new Paypal();
        //
        //        $data = [
        //            "intent" => "CAPTURE",
        //            "purchase_units" => [[
        //                "reference_id" => rand(000000, 999999),
        //                "amount" => [
        //                    "value" => number_format(100, 2, '.', ''),
        //                    "currency_code" => "USD",
        //                ]
        //            ]],
        //            "application_context" => [
        //                "cancel_url" => "https://arino-laravel.test/cancel",
        //                "return_url" => "https://arino-laravel.test/success",
        //            ]
        //        ];
        //
        //        try {
        //            $response = $paypal->initializePayment($data);
        //            return Redirect::to($response->links[1]->href);
        //        } catch (\Exception $exception){
        //            dd($exception->getMessage());
        //        }

        //       $stripe = new Stripe();
        //
        //       $data = [
        //           'payment_method_types' => ['card'],
        //           'line_items' => [[
        //               'price_data' => [
        //                   'currency' => 'usd',
        //                   'product_data' => [
        //                       'name' => 'Standerd',
        //                   ],
        //                   'unit_amount' => 1000, // Amount in cents, adjust accordingly
        //               ],
        //               'quantity' => 1,
        //           ]],
        //           'mode' => 'payment',
        //           'success_url' => 'https://yourwebsite.com/success',
        //           'cancel_url' => 'https://yourwebsite.com/cancel',
        //       ];
        //
        //       try {
        //           $response = $stripe->initializePayment($data);
        //           $response = $stripe->verifyPayment('cs_test_a1oMrr2ITfmceajA5pdOXYld5Gat59EJOM24D04OesgPkMidVwERoMUKpN');
        //           return Redirect::to($response->url);
        //           dd($response);
        //       } catch (\Exception $exception){
        //           dd($exception->getMessage());
        //       }

        // PAYMENT INFO

        //        $sslcmz = new SSLCommerz();
        //        $post_data = array();
        //        $post_data['total_amount'] = 100;
        //        $post_data['currency'] = "BDT";
        //        $post_data['tran_id'] = 120;
        //
        //        # CUSTOMER INFORMATION
        //        $post_data['cus_name'] = "Mahadi Hasan";
        //        $post_data['cus_email'] = "mahadicreation@gmail.com";
        //        $post_data['cus_add1'] = "ahdeehdgehd";
        //        $post_data['cus_add2'] = '';
        //        $post_data['cus_city'] = "patuakhali";
        //        $post_data['cus_postcode'] = "8600";
        //        $post_data['cus_country'] = "Bangladesh";
        //        $post_data['cus_phone'] = "+8801722285902";
        //
        //        # SHIPMENT INFORMATION
        //        $post_data['ship_name'] = "";
        //        $post_data['ship_add1'] = "rgfrfr";
        //        $post_data['ship_add2'] = "";
        //        $post_data['ship_city'] = "patuakhali";
        //        $post_data['ship_state'] = "";
        //        $post_data['ship_postcode'] = "8600";
        //        $post_data['ship_phone'] = "+8801722285902";
        //        $post_data['ship_country'] = "Bangladesh";
        //
        //        $post_data['shipping_method'] = "NO";
        //        $post_data['product_name'] = ['hello'];
        //        $post_data['product_category'] = ['hello'];
        //        $post_data['product_profile'] = "general";
        //
        //
        //        $sl = new SSLCommerz();
        //        $res = $sl->initilizePatment($post_data);
        //        $result = json_decode($res);
        //        return Redirect::to($result->data);

        //        $flutterwave = new FlutterWave();
        //        $data = [
        //            'amount' => 100,
        //            'currency' => 'USD',
        //            'customer' => [
        //                'name' => 'Mahadi Hasan',
        //                'email' => 'mahadicreation@gmail.com',
        //                'phonenumber' => '01722285902'
        //            ],
        //            'tx_ref' => '1',
        //            'redirect_url' => 'http://arino-laravel.test',
        //        ];
        //
        //        $flutterwave->initializePayment($data);

        $razorpay = new Razorpay;

        $data = [
            'amount' => 500 * 100,
            'currency' => 'USD',
            'accept_partial' => true,
            'expire_by' => Carbon::now()->addMinutes(20)->timestamp,
            'reference_id' => 'ygwddwedqydgw',
            'description' => 'For XYZ purpose',
            'customer' => ['name' => 'Gaurav Kumar',
                'email' => 'gaurav.kumar@example.com',
                'contact' => '+8801722285902',
            ],
            'notify' => [
                'sms' => true,
                'email' => true,
            ],
            'reminder_enable' => true,
            'notes' => [
                'policy_name' => 'Jeevan Bima',
            ],
            'callback_url' => 'https://example-callback-url.com/',
            'callback_method' => 'get',
        ];

        $response = $razorpay->initilizePatment($data);
        dd($response);
    }

    // public function any()
    // {
    //    $data = [
    //         "intent" => "CAPTURE",
    //         "purchase_units" => [[
    //             "reference_id" => rand(000000, 999999),
    //             "amount" => [
    //                 "value" => number_format(100, 2, '.', ''),
    //                 "currency_code" => "USD",
    //             ]
    //         ]],
    //         "application_context" => [
    //             "cancel_url" => "https://arino-laravel.test/cancel",
    //             "return_url" => "https://arino-laravel.test/success",
    //         ]
    //     ];
    // }
}
