<?php

namespace App\Repositories\Frontend;

use App\Http\Requests\CheckoutRequest;
use App\Models\Coupon;
use App\Models\ManualPaymentGateway;
use App\Models\Order;
use App\Models\Setting;
use App\Services\PaymentGateway\FlutterWave;
use App\Services\PaymentGateway\Paypal;
use App\Services\PaymentGateway\Razorpay;
use App\Services\PaymentGateway\SSLCommerz;
use App\Services\PaymentGateway\Stripe;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CheckoutRepository
{
    public function checkout(CheckoutRequest $request)
    {
        $currency_code = Setting::pull('currency_code') ?? 'USD';
        $subtotal = array_reduce($request->items, fn($carry, $item) => ($carry) + ($item['price'] * $item['quantity']), 0);
        $discount = 0;
        if ($request->coupon) {
            $coupon = Coupon::where('code', $request->coupon['code'])->first();
            $discount = $coupon->type == 'fixed' ? $coupon->discount_value : ($subtotal * $coupon->discount_value) / 100;
        }
        $total = $subtotal - $discount;

        // Handle receipt file upload if exists
        $receiptFilePath = null;
        if ($request->hasFile('receiptFile')) {
            $file = $request->file('receiptFile');
            $filename = time() . '_' . $file->getClientOriginalName();
            $receiptFilePath = $file->storeAs('receipts', $filename, 'public');
        }

        $order = Order::create([
            'user_id' => Auth::check() ? Auth::user()->id : null,
            'customer_name' => $request->name,
            'coupon_code' => $request->coupon['code'] ?? null,
            'customer_email' => $request->email,
            'customer_phone' => $request->phone,
            'shipping_address' => $request->address,
            'order_number' => date('Ymd') . mt_rand(1000, 9999),
            'total_price' => $total,
            'payment_method' => $request->paymentMethod,
            'discount' => $discount,
            'status' => 'pending',
            'payment_status' => '1',
            'order_notes' => $request->orderNotes,
            'transaction_id' => $request->transactionId ?? null,
            'receipt_file' => $receiptFilePath,
        ]);

        $order_items = array_map(function ($item) {
            return [
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'total_price' => $item['price'] * $item['quantity'],
                'product_image' => $item['thumbnail_image'],
                'product_name' => $item['title'],
                'product_price' => $item['price'],
            ];
        }, $request->items);

        $order->orderItems()->createMany($order_items);

        $manualPayment = ManualPaymentGateway::whereHas('content', function ($query) use ($request) {
            $query->where('gateway_name', $request->paymentMethod);
        })->first();

        if ($manualPayment) {
            return redirect()->route('order.success.page', $order);
        }

        if ($request->paymentMethod === 'cod') {
            return redirect()->route('order.success.page', $order);
        }

        switch ($request->paymentMethod) {
            case 'paypal':
                $paypal = new Paypal;
                $body = [
                    'intent' => 'CAPTURE',
                    'purchase_units' => [[
                        'reference_id' => rand(000000, 999999),
                        'amount' => [
                            'value' => number_format($total, 2, '.', ''),
                            'currency_code' => $currency_code,
                        ],
                    ]],
                    'application_context' => [
                        'cancel_url' => route('payment.cancel', ['method' => 'paypal', 'identifier' => $order->id, 'type' => 'product']),
                        'return_url' => route('payment.success', ['method' => 'paypal', 'identifier' => $order->id, 'type' => 'product']),
                    ],
                ];

                $response = $paypal->initializePayment($body);

                return Inertia::location($response->links[1]->href);
            case 'stripe':
                $stripe = new Stripe;
                $body = [
                    'line_items' => [[
                        'price_data' => [
                            'currency' => $currency_code,
                            'product_data' => ['name' => implode(', ', array_map(fn($item) => $item['title'], $request->items))],
                            'unit_amount' => 100 * $total, // Amount in cents, adjust accordingly
                        ],
                        'quantity' => 1,
                    ]],
                    'mode' => 'payment',
                    'success_url' => route('payment.success', ['method' => 'stripe', 'identifier' => $order->id, 'type' => 'product']),
                    'cancel_url' => route('payment.cancel', ['method' => 'stripe', 'identifier' => $order->id, 'type' => 'product']),
                ];

                try {
                    $response = $stripe->initializePayment($body);
                    Session::put('paymentId', $response->id);

                    return Inertia::location($response->url);
                } catch (\Exception $exception) {
                    throw new \Exception($exception->getMessage());
                }

            case 'sslcommerz':
                $sslcmz = new SSLCommerz($order->id);
                $body = [
                    'total_amount' => $total,
                    'currency' => $currency_code,
                    'tran_id' => $order->order_number,

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
                    'product_name' => array_map(fn($item) => $item['title'], $request->items),
                    'product_category' => array_map(fn($item) => $item['title'], $request->items),
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
                        'amount' => $total,
                        'currency' => $currency_code,
                        'customer' => [
                            'name' => $request->name,
                            'email' => $request->email,
                            'phonenumber' => $request->mobile,
                        ],
                        'tx_ref' => $order->order_number,
                        'redirect_url' => route('payment.success', ['method' => 'flutterwave', 'identifier' => $order->id, 'type' => 'product']),
                    ];
                    $response = $flutterwave->initializePayment($data);

                    return Inertia::location($response['data']['link']);
                } catch (\Exception $exception) {
                }

            case 'razorpay':
                $razorpay = new Razorpay;
                $data = ['receipt' => 'R-' . rand(000000, 999999), 'amount' => (int) $total * 100, 'currency' => $currency_code];
                $order_id = $razorpay->initilizePatment($data);
                $url = route('payment.razorpay.pay', ['order_id' => $order_id, 'payment_id' => $order->id, 'type' => 'product']);

                return Inertia::location($url);
        }
    }
}
