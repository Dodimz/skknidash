<?php

namespace App\Services\PaymentGateway;

use App\Models\Setting;
use PayPalCheckoutSdk\Core\PayPalHttpClient;
use PayPalCheckoutSdk\Core\ProductionEnvironment;
use PayPalCheckoutSdk\Core\SandboxEnvironment;
use PayPalCheckoutSdk\Orders\OrdersCaptureRequest;
use PayPalCheckoutSdk\Orders\OrdersCreateRequest;
use PayPalHttp\HttpException;
use PayPalHttp\IOException;

class Paypal
{
    /**
     * @var PayPalHttpClient
     */
    protected $client;

    /**
     * initialize environment
     */
    public function __construct()
    {
        // Creating an environment
        $clientId = Setting::pull('paypal_client_id');
        $clientSecret = Setting::pull('paypal_client_secret');

        if (Setting::pull('paypal_is_sandbox') == '1') {
            $environment = new SandboxEnvironment($clientId, $clientSecret);
        } else {
            $environment = new ProductionEnvironment($clientId, $clientSecret);
        }
        $this->client = new PayPalHttpClient($environment);
    }

    /**
     * Make initialize payment request
     *
     * @throws HttpException
     * @throws IOException
     */
    public function initializePayment(array $body): array|object|string
    {
        $request = new OrdersCreateRequest;
        $request->prefer('return=representation');
        $request->body = $body;

        try {
            $response = $this->client->execute($request);

            return $response->result;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    /**
     * Verify payment
     *
     * @throws HttpException
     * @throws IOException
     */
    public function verifyPayment(string $token): array|object|string
    {
        $ordersCaptureRequest = new OrdersCaptureRequest($token);
        $ordersCaptureRequest->prefer('return=representation');
        try {
            $response = $this->client->execute($ordersCaptureRequest);

            return $response->result;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }
}
