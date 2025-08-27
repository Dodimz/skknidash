<?php

namespace App\Services\SmsGateway;

use App\Models\Setting;

class Vatansms
{
    protected string $api_endpoint = 'https://api.vatansms.net/api';

    protected string $api_id;

    protected string $api_key;

    protected string $sender;

    protected string $messageType;

    protected string $recipients;

    public function __construct()
    {
        $this->api_id = Setting::pull('vatansms_api_id');
        $this->api_key = Setting::pull('vatansms_api_key');
        $this->sender = Setting::pull('vatansms_sender');
        $this->messageType = Setting::pull('vatansms_message_type');
    }

    public function setRecipients($recipients)
    {
        $this->recipients = $recipients;
    }

    public function send($message)
    {
        $apiUrl = $this->api_endpoint.'/v1/1toN';
        $curl = curl_init();
        $params = [
            'api_id' => $this->api_id,
            'api_key' => $this->api_key,
            'sender' => $this->sender,
            'message_type' => $this->messageType,
            'message' => $message,
            'message_content_type' => 'bilgi',
            'phones' => [
                $this->recipients,
            ],
        ];
        $curl_options = [
            CURLOPT_URL => $apiUrl,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POSTFIELDS => json_encode($params),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
        ];

        curl_setopt_array($curl, $curl_options);

        $response = curl_exec($curl);

        curl_close($curl);

        return $response;
    }
}
