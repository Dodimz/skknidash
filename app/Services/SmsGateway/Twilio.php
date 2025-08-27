<?php

namespace App\Services\SmsGateway;

use App\Models\Setting;
use Twilio\Rest\Client;

class Twilio
{
    protected string $twilio_account_sid;

    protected string $twilio_auth_token;

    protected string $twilio_number;

    protected string $recipients;

    public function __construct()
    {
        $this->twilio_account_sid = Setting::pull('twilio_account_sid');
        $this->twilio_auth_token = Setting::pull('twilio_auth_token');
        $this->twilio_number = Setting::pull('twilio_number');
    }

    public function setRecipients($recipients)
    {
        $this->recipients = $recipients;
    }

    public function send($message)
    {
        $client = new Client($this->twilio_account_sid, $this->twilio_auth_token);
        $client->messages->create($this->recipients, ['from' => $this->twilio_number, 'body' => $message]);
    }
}
