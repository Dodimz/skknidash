<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to your application's "home" route.
     *
     * Typically, users are redirected here after authentication.
     *
     * @var string
     */
    public const HOME = '/admin/dashboard';

    public const USER_HOME = '/user/dashboard';

    /**
     * Maps route
     */
    public function map(): void
    {
        $sql_path = base_path('update.sql');

        if (config('app.installed') && file_exists($sql_path)) {
            $this->mapUpdateRoutes();
        } elseif (config('app.installed')) {
            $this->mapApiRoutes();
            $this->mapUserRoutes();
            $this->mapAdminRoutes();
            $this->mapAuthRoutes();
            $this->mapWebRoutes();
        } else {
            $this->mapInstallRoutes();
        }
    }

    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }

    /**
     * Map api route
     */
    protected function mapApiRoutes(): void
    {
        Route::middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));
    }

    /**
     * Map web route
     */
    protected function mapWebRoutes(): void
    {
        Route::middleware('web')
            ->group(base_path('routes/web.php'));
    }

    /**
     * Map auth route
     */
    protected function mapAuthRoutes(): void
    {
        Route::middleware('web')
            ->prefix('auth')
            ->group(base_path('routes/auth.php'));
    }

    /**
     * Map user route
     */
    protected function mapUserRoutes(): void
    {
        Route::middleware('web', 'auth', 'verified')
            ->name('user.')
            ->prefix('user')
            ->group(base_path('routes/user.php'));
    }

    /**
     * Map admin route
     */
    protected function mapAdminRoutes(): void
    {
        Route::middleware('web', 'inertia:admin', 'auth', 'verified', 'checkRole')
            ->name('admin.')
            ->prefix('admin')
            ->group(base_path('routes/admin.php'));
    }

    /**
     * Map install route
     */
    protected function mapInstallRoutes(): void
    {
        Route::middleware('web')
            ->group(base_path('routes/install.php'));
    }

    /**
     * Map update route
     */
    protected function mapUpdateRoutes(): void
    {
        Route::middleware('web')
            ->group(base_path('routes/update.php'));
    }
}
