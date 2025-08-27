<?php

// SSLCommerz configuration

return [
    'projectPath' => '',
    'apiDomain' => '',
    'apiCredentials' => [
        'store_id' => '',
        'store_password' => '',
    ],
    'apiUrl' => [
        'make_payment' => '/gwprocess/v4/api.php',
        'transaction_status' => '/validator/api/merchantTransIDvalidationAPI.php',
        'order_validate' => '/validator/api/validationserverAPI.php',
        'refund_payment' => '/validator/api/merchantTransIDvalidationAPI.php',
        'refund_status' => '/validator/api/merchantTransIDvalidationAPI.php',
    ],
    'connect_from_localhost' => env('SSLCZ_SANDBOX') ? true : false,
    'success_url' => '',
    'failed_url' => '',
    'cancel_url' => '',
    'ipn_url' => '/ipn',
];
