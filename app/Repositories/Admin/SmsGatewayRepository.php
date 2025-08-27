<?php

namespace App\Repositories\Admin;

use App\Models\Setting;
use App\Services\SmsGateway\Twilio;
use App\Services\SmsGateway\Vatansms;

class SmsGatewayRepository
{
    public function sendMessage($recipients, $message)
    {
        $default_gateway = Setting::pull('active_sms_gateway');
        switch ($default_gateway) {
            case 'twilio':
                $twilio = new Twilio;
                $twilio->setRecipients($recipients);
                $twilio->send($message);
                break;
            case 'vatansms':
                $vatansms = new Vatansms;
                $vatansms->setRecipients($recipients);
                $vatansms->send($message);
                break;
        }
    }
}
