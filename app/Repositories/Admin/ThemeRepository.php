<?php

namespace App\Repositories\Admin;

use App\Models\Theme;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;

class ThemeRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify theme table
     */
    protected Theme $model;

    /**
     *  Constructor for Category repository
     */
    public function __construct(Theme $theme)
    {
        $this->model = $theme;
    }

    /**
     * get all themes
     */
    public function getThemes(): mixed
    {
        return $this->model->orderBy('is_active', 'desc')->get();
    }

    /**
     * Theme activate
     */
    public function activate(Theme $theme, SettingRepository $repository): void
    {
        Theme::where('id', '<>', $theme->id)->update(['is_active' => '0']);
        $theme->update(['is_active' => '1']);

        // update active theme to setting
        $repository->updateSettingByGroup('theme_settings', ['active_theme' => $theme->identifier]);

    }
}
