<?php

namespace App\Http\Middleware;

use App\Models\Page;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'frontend';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (config('app.installed')) {
            $permission = $request->user()?->getAllPermissions()->pluck('name')->toArray();
            $languages = json_decode(Setting::pull('languages'));
            $settingRepository = app(SettingRepository::class);
            $site_name = Setting::pull('site_name');
            $cart_slug = Page::where('rendered_page', 'cart')->first()->slug;
            $shop_page_title = Page::where('rendered_page', 'shop')->first()->content->title;
            $isEnabledEcommerce = Setting::pull('is_enabled_ecommerce');
            $isEnabledCaseStudy = Setting::pull('is_enabled_case_study');
            $isEnabledPortfolio = Setting::pull('is_enabled_portfolio');
            $isEnabledService = Setting::pull('is_enabled_services');
            $isEnabledTeam = Setting::pull('is_enabled_team');

            return array_merge(parent::share($request), [
                'auth' => [
                    'user' => $request->user(),
                    'is_loggedIn' => Auth::check(),
                    'permissions' => $permission,
                ],
                'lang' => [
                    'languages' => $languages,
                    'default_lang' => app()->getLocale(),
                ],
                'flash' => [
                    'error' => fn() => $request->session()->get('error'),
                    'success' => fn() => $request->session()->get('success'),
                    'payment_status' => fn() => $request->session()->get('payment_status'),
                ],
                'currency' => $settingRepository->getCurrencySettingInfo(),
                'site_name' => $site_name,
                'cart_slug' => $cart_slug,
                'shop_page_title' => $shop_page_title,
                'isEnabledEcommerce' => $isEnabledEcommerce,
                'isEnabledCaseStudy' => $isEnabledCaseStudy,
                'isEnabledPortfolio' => $isEnabledPortfolio,
                'isEnabledService' => $isEnabledService,
                'isEnabledTeam' => $isEnabledTeam,
            ]);
        }

        return [];
    }

    /**
     * Handle the incoming request.
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next)
    {
        if ($rootView = func_get_args()[2] ?? null) {
            $this->rootView = $rootView;
        }

        // set app name
        if (config('app.installed')) {
            $appName = Setting::pull('site_name');
            config()->set('app.name', $appName);
            $sql_path = base_path('update.sql');
            if (! file_exists($sql_path)) {
                eval(base64_decode('aWYgKCFjb25maWcoImFwcC5hY3RpdmUiKSl7CiAgICAgICAgICAgICAgICBhYm9ydChiYXNlNjRfZGVjb2RlKCJOREF6IiksIGJhc2U2NF9kZWNvZGUoIlRHbGpaVzVqWlNCdWIzUWdZV04wYVhaaGRHVT0iKSk7CiAgICAgICAgICAgIH0='));
            }
        }

        return parent::handle($request, $next);
    }
}
