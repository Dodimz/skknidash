<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\PaymentHistory;
use App\Services\PaymentGateway\FlutterWave;
use App\Services\PaymentGateway\Paypal;
use App\Services\PaymentGateway\Razorpay;
use App\Services\PaymentGateway\SSLCommerz;
use App\Services\PaymentGateway\Stripe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class PaymentRepository
{
    public function PaymentSuccess($method, Request $request)
    {
        $paymentType = $request->type;
        switch ($method) {
            case 'paypal':
                $paypal = new Paypal;
                $response = $paypal->verifyPayment($request->token);
                if ($response->status === 'COMPLETED') {
                    return $this->updateSuccessPaymentData($paymentType, $request->identifier);
                } else {
                    throw new \Exception('Payment Failed');
                }
            case 'stripe':
                $stripe = new Stripe;
                $paymentId = Session::get('paymentId');
                $response = $stripe->verifyPayment($paymentId);
                if ($response->payment_status === 'paid') {
                    return $this->updateSuccessPaymentData($paymentType, $request->identifier);
                } else {
                    throw new \Exception('Payment Failed');
                }

            case 'sslcmz':
                $sslcmz = new SSLCommerz(null);
                $res = $sslcmz->verifyPayment($request->all());
                if ($res) {
                    return $this->updateSuccessPaymentData($paymentType, $request->identifier);
                }

            case 'flutterwave':
                if ($request->status == 'cancelled') {
                    return redirect()->route('payment.cancel', ['method' => 'flutterwave', 'identifier' => $paymentHistory]);
                } else {
                    $flutterwave = new FlutterWave;
                    $response = $flutterwave->verifyPayment($request->transaction_id);
                    if ($response['status'] == 'success') {
                        return $this->updateSuccessPaymentData($paymentType, $request->identifier);
                    }
                }

            case 'razorpay':
                $razorpay = new Razorpay;
                $data = [
                    'razorpay_order_id' => $request->razorpay_order_id,
                    'razorpay_payment_id' => $request->razorpay_payment_id,
                    'razorpay_signature' => $request->razorpay_signature,
                ];
                $razorpay->verifyPayment($data);

                return $this->updateSuccessPaymentData($paymentType, $request->identifier);
        }
    }

    public function PaymentCancel($method, Request $request)
    {
        switch ($method) {
            case 'stripe':
            case 'paypal':
            case 'sslcmz':
            case 'flutterwave':
            case 'razorpay':
                if ($request->type == 'product') {
                    $order = Order::find($request->identifier);
                    $order->payment_status = '3';
                    $order->save();

                    return redirect()->route('payment.cancel.page');
                }
                $paymentHistory = PaymentHistory::findOrFail($request->identifier);
                $paymentHistory->update([
                    'status' => 'failed',
                ]);

                return redirect()->route('pricing.plan', $paymentHistory->plan_id)->with('payment_status', 'failed');
        }
    }

    private function updateSuccessPaymentData($type, $identifier)
    {
        if ($type == 'product') {
            $order = Order::find($identifier);
            $order->update([
                'payment_status' => '2',
            ]);

            return redirect()->route('payment.success.page', $order);
        } else {
            $paymentHistory = PaymentHistory::find($identifier);
            $paymentHistory->update([
                'status' => 'success',
            ]);

            return redirect()->route('pricing.plan', $paymentHistory->plan_id)->with('payment_status', 'success');
        }
    }
}
