<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Theme;
use App\Repositories\Admin\ThemeRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ThemeController extends Controller
{
    /**
     * Themes index
     */
    public function index(ThemeRepository $repository): Response
    {
        $data['themes'] = $repository->getThemes();

        return Inertia::render('Themes/index', $data);
    }

    /**
     * Theme activate
     */
    public function activate(Theme $theme, ThemeRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->activate($theme, $settingRepository);

        return back()->with('success', 'Theme successfully activate');
    }
}
