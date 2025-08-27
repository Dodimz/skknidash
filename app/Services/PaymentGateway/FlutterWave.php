<?php

namespace App\Services\PaymentGateway;

use App\Models\Setting;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class FlutterWave
{
    protected $baseUrl = 'https://api.flutterwave.com/v3';

    protected $secretKey = null;

    public function __construct()
    {
        $this->secretKey = Setting::pull('flutterwave_secret_key');
    }

    /**
     * Post request
     *
     * @return \GuzzleHttp\Promise\PromiseInterface|\Illuminate\Http\Client\Response
     */
    private function postRequest($body, $url): Response
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->secretKey}",
        ])->post($this->baseUrl.$url, $body);

        return $response;
    }

    /**
     * Get request
     *
     * @return \GuzzleHttp\Promise\PromiseInterface|Response
     */
    private function getRequest($url)
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->secretKey}",
        ])->get($this->baseUrl.$url);

        return $response;
    }

    /**
     * Initialize payment
     *
     * @return \GuzzleHttp\Promise\PromiseInterface|Response
     */
    public function initializePayment($data)
    {
        return $this->postRequest($data, '/payments');
    }

    /**
     * Verify payment
     *
     * @return \GuzzleHttp\Promise\PromiseInterface|Response
     */
    public function verifyPayment($transactionId)
    {
        $response = $this->getRequest("/transactions/{$transactionId}/verify");

        return $response;
    }
}
