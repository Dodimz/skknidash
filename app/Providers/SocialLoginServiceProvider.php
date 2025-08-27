<?php

namespace App\Providers;

use App\Models\Setting;
use Illuminate\Support\ServiceProvider;

class SocialLoginServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (config('app.installed')) {
            // Login with google
            config()->set('services.google.client_id', Setting::pull('google_client_id'));
            config()->set('services.google.client_secret', Setting::pull('google_client_secret'));

            // Login with facebook
            config()->set('services.facebook.client_id', Setting::pull('facebook_app_id'));
            config()->set('services.facebook.client_secret', Setting::pull('facebook_app_secret'));
        }
    }
}
