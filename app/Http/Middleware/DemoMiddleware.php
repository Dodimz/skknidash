<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class DemoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $roleName = Auth::user()->getRoleNames()[0];

        if ($roleName == 'superadmin') {
            return $next($request);
        }

        $is_demo_enabled = config('app.is_demo');
        if ($is_demo_enabled) {
            return back()->with('error', 'This action is disabled for demo mode.');
        }
        return $next($request);
    }
}
