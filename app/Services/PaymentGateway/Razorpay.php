<?php

namespace App\Services\PaymentGateway;

use App\Models\Setting;
use Razorpay\Api\Api;

class Razorpay
{
    protected $api;

    public function __construct()
    {
        $razorpayKeyId = Setting::pull('razorpay_key_id');
        $razorpayKeySecret = Setting::pull('razorpay_key_secret');
        $this->api = new Api($razorpayKeyId, $razorpayKeySecret);
    }

    public function createOrder($data)
    {
        $response = $this->api->order->create($data);

        return $response;
    }

    public function initilizePatment($data)
    {
        $response = $this->createOrder($data);

        return $response->id;
    }

    public function verifyPayment($data)
    {
        return $this->api->utility->verifyPaymentSignature($data);
    }
}
