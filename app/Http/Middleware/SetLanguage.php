<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpFoundation\Response;

class SetLanguage
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (config('app.installed')) {
            $lang = null;
            $userChooseLang = session()->get('lang');
            $defaultLang = Setting::pull('default_lang');
            $filteredLang = isset($request->filter['lang']);
            if ($filteredLang) {
                $lang = $request->filter['lang'];
            } else {
                if ($userChooseLang) {
                    $lang = $userChooseLang;
                } elseif ($defaultLang) {
                    $lang = $defaultLang;
                }
            }
            $langFilePath = base_path("lang/${lang}.json");
            if (! File::exists($langFilePath)) {
                $lang = $defaultLang;
                session()->put('lang', $lang);
            }
            app()->setLocale($lang);
        }

        return $next($request);
    }
}
