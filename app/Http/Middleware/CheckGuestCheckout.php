<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckGuestCheckout
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $allowGuest = Setting::pull('is_allow_guest_checkout');

        // Allow if guest checkout is enabled or user is logged in
        if ($allowGuest || Auth::check()) {
            return $next($request);
        }

        // Otherwise, redirect to login
        return redirect()->route('login.create');
    }
}
