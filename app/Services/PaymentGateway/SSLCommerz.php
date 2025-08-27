<?php

namespace App\Services\PaymentGateway;

use App\Library\SslCommerz\SslCommerzNotification;
use App\Models\Setting;
use Illuminate\Support\Facades\Config;

class SSLCommerz
{
    public function __construct($plan_id)
    {
        Config::set('sslcommerz.apiDomain', Setting::pull('sslcz_is_sandbox') == '1' ? 'https://sandbox.sslcommerz.com' : 'https://securepay.sslcommerz.com');
        Config::set('sslcommerz.projectPath', '');
        Config::set('sslcommerz.apiCredentials.store_id', Setting::pull('sslcz_store_id'));
        Config::set('sslcommerz.apiCredentials.store_password', Setting::pull('sslcz_store_password'));

        // set success url cancel url
        Config::set('sslcommerz.success_url', '/payment/sslcmz/success?identifier='.$plan_id);
        Config::set('sslcommerz.cancel_url', '/payment/sslcmz/cancel?identifier='.$plan_id);
        Config::set('sslcommerz.failed_url', '/payment/sslcmz/cancel?identifier='.$plan_id);
    }

    public function initilizePatment($data)
    {
        $sslc = new SslCommerzNotification;
        $payment_options = $sslc->makePayment($data, 'checkout', 'json');

        if (! is_array($payment_options)) {
            return $payment_options;
        }
    }

    public function verifyPayment($data)
    {
        $sslc = new SslCommerzNotification;

        return $sslc->orderValidate($data, $data['tran_id'], $data['amount'], $data['currency']);
    }
}
