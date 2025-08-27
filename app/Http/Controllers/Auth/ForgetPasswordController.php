<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ForgetPasswordController extends Controller
{
    public function forgotPassword()
    {
        $current_page_url = request()->url();
        $meta_tags = 'forget password';
        $site_name = Setting::pull('site_name');
        $tagline = __('Forgot password');

        SEOMeta::setTitle($tagline.' - '.$site_name);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');

        TwitterCard::setSite('@bione');
        TwitterCard::setType('summary_large_image');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');

        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
            'meta_tags' => $meta_tags,
            'site_name' => $site_name,
            'tagline' => $tagline,
        ]);
    }

    public function forgotPasswordSubmit(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }

    public function passwordUpdate(Request $request, $token = null)
    {
        return Inertia::render('Auth/ResetPassword', [
            'email' => $request->email,
            'token' => $token,
        ]);
    }

    public function passwordStore(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                    'remember_token' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? redirect()->route('login.create')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
