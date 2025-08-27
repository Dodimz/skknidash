<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Setting;
use App\Repositories\Admin\CustomizeRepository;
use App\Repositories\Frontend\PageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CustomizeController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['update']]);
    }

    /**
     * Get customization
     */
    public function customize(CustomizeRepository $repository, SettingRepository $settingRepository, PageRepository $pageRepository)
    {
        $homePageId = Setting::pull('default_home_page') ?? Page::first()->id;
        $page = Page::find($homePageId);
        $data = $pageRepository->getPageData($page);
        $data['customize_settings'] = $repository->getCustomize($settingRepository);
        $data['customize_settings']['social_links']['social_list'] = json_decode($data['customize_settings']['social_links']['social_list']);
        $data['sitemap_url'] = asset('sitemap.xml');

        return Inertia::render('Customize/Customize', $data);
    }

    /**
     * Update customization
     */
    public function update(Request $request, CustomizeRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $generalValidator = Validator::make($request->input('general'), [
            'site_name' => 'required',
            'site_favicon' => 'required',
            'site_logo_dark' => 'required',
            'site_logo_light' => 'required',
            'meta_title' => 'nullable|max:250',
            'meta_tags' => 'nullable|max:250',
            'meta_description' => 'nullable|max:250',
        ]);

        if ($generalValidator->fails()) {
            return back()->withErrors($generalValidator)->withInput();
        }

        $repository->update($request, $settingRepository);

        return back()->with('success', 'Successfully updated');
    }
}
