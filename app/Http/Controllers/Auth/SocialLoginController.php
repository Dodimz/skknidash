<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\Auth\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    /**
     * Redirect social
     *
     * @return \Illuminate\Http\RedirectResponse|\Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * Callback social
     *
     * @param  UserRepository  $userRepository
     * @return \Illuminate\Http\RedirectResponse
     */
    public function callback($provider, UserRepository $repository)
    {
        $userSocial = Socialite::driver($provider)->stateless()->user();
        $user = $repository->updateOrCreate([
            'provider' => $provider,
            'provider_id' => $userSocial->getId(),
        ], [
            'name' => $userSocial->getName(),
            'email' => $userSocial->getEmail(),
            'email_verified_at' => now(),
            'password' => bcrypt(Str::random(16)),
        ]);
        $user->assignRole('user');
        Auth::login($user);

        return redirect()->route('user.dashboard');
    }
}
