<?php

namespace App\Repositories\Auth;

use App\Mail\SendAccountVerificationMail;
use App\Models\Setting;
use App\Models\User;
use App\Repositories\Admin\SmsGatewayRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Support\Facades\Mail;

class UserRepository
{
    use ModelRepositoryTraits;

    protected $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function sendOtp(User $user)
    {
        $verify_method = Setting::pull('authentication_verification_method');
        $replacements = [
            '{{otp}}' => $user->otp,
            '{{user_name}}' => $user->name,
            '{{user_email}}' => $user->email,
            '{{user_phone}}' => $user->phone,
        ];

        if ($verify_method == 'email') {
            $subject = Setting::pull('verify_mail_subject');
            $body = Setting::pull('verify_mail_body');
            $bodyWithValues = str_replace(array_keys($replacements), array_values($replacements), $body);
            Mail::to($user->email)->send(new SendAccountVerificationMail($bodyWithValues, $subject));
        } else {
            $body = Setting::pull('verify_message');
            $bodyWithValues = str_replace(array_keys($replacements), array_values($replacements), $body);

            $SmsGatewayRepository = app(SmsGatewayRepository::class);
            $SmsGatewayRepository->sendMessage($user->phone, $bodyWithValues);
        }
    }

    public function sendForgotOtp(User $user)
    {
        $verify_method = Setting::pull('authentication_verification_method');
        $replacements = [
            '{{otp}}' => $user->otp,
            '{{user_name}}' => $user->name,
            '{{user_email}}' => $user->email,
            '{{user_phone}}' => $user->phone,
        ];

        if ($verify_method == 'email') {
            $subject = Setting::pull('reset_password_mail_subject');
            $body = Setting::pull('reset_password_mail_body');
            $bodyWithValues = str_replace(array_keys($replacements), array_values($replacements), $body);
            Mail::to($user->email)->send(new SendAccountVerificationMail($bodyWithValues, $subject));
        } else {
            $body = Setting::pull('reset_password_message');
            $bodyWithValues = str_replace(array_keys($replacements), array_values($replacements), $body);
            $SmsGatewayRepository = app(SmsGatewayRepository::class);
            $SmsGatewayRepository->sendMessage($user->phone, $bodyWithValues);
        }
    }
}
