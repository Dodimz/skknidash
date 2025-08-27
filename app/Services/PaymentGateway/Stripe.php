<?php

namespace App\Services\PaymentGateway;

use App\Models\Setting;
use Stripe\Checkout\Session;
use Stripe\StripeClient;

class Stripe
{
    /**
     * @var StripeClient
     */
    protected $client;

    /**
     * Initialize client
     */
    public function __construct()
    {
        $this->client = new StripeClient(Setting::pull('stripe_secret'));
    }

    /**
     * Initialize payment
     *
     * @throws \Exception
     */
    public function initializePayment(array $body): Session
    {
        try {
            return $this->client->checkout->sessions->create($body);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    public function verifyPayment(string $sessionId)
    {
        try {
            return $this->client->checkout->sessions->retrieve($sessionId, []);
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }
}
