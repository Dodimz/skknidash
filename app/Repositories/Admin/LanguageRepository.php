<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudyCategoryContent;
use App\Models\CaseStudyContent;
use App\Models\CategoryContent;
use App\Models\Page;
use App\Models\PageContent;
use App\Models\PortfolioCategoryContent;
use App\Models\PortfolioContent;
use App\Models\PostContent;
use App\Models\PricingPlanContent;
use App\Models\ProductCategoryContent;
use App\Models\ProductContent;
use App\Models\ServiceCategoryContent;
use App\Models\ServiceContent;
use App\Models\Setting;
use App\Models\TeamContent;
use App\Models\TestimonialContent;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;

class LanguageRepository
{
    use ModelRepositoryTraits;

    /**
     * Create or update a language.
     *
     * @param  \Illuminate\Http\Request  $request  The request containing language data.
     */
    public function createLang(Request $request)
    {
        $directory = base_path('lang/');
        $default_lang = Setting::pull('default_lang');
        $path = $directory.$request->language.'.json';

        if (! File::exists($directory)) {
            File::makeDirectory($directory, 0777, true, true);
        }

        $existingData = [];
        if (File::exists($path)) {
            $existingData = json_decode(File::get($path), true);
        }

        if (! File::exists($directory."{$default_lang}.json")) {
            $defaultData = [];
        } else {
            $defaultData = json_decode(File::get($directory."{$default_lang}.json"), true);
        }

        $mergedData = array_merge($defaultData, $existingData);

        try {
            File::put($path, json_encode($mergedData, JSON_PRETTY_PRINT));
        } catch (\Exception $e) {
            return back()->withInput()->withErrors(['error' => 'Failed to create/update the language file. Please check your server configuration.']);
        }

        $languages = get_options('languages', true) ?? [];

        $languages[$request->language] = [
            'name' => $request->name,
            'code' => $request->language,
            'is_ltr' => $request->is_ltr,
        ];

        $languageList = Setting::where('setting_key', 'languages')->first();
        if (empty($languageList)) {
            $languageList = new Setting;
            $languageList->setting_group = 'languages';
            $languageList->setting_key = 'languages';
            $languageList->setting_value = json_encode($languages);
        } else {
            $existingLangs = json_decode($languageList->setting_value, true);
            $mergedLanguages = array_merge($existingLangs, [$request->language => $languages[$request->language]]);
            $languageList->setting_value = json_encode($mergedLanguages);
        }
        $languageList->save();

        $default_lang = Setting::pull('default_lang');

        PostContent::where('language_code', $default_lang)
            ->each(function ($postContent) use ($request) {
                $replicatedContent = $postContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        CategoryContent::where('language_code', $default_lang)
            ->each(function ($categoryContent) use ($request) {
                $replicatedContent = $categoryContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        ProductContent::where('language_code', $default_lang)
            ->each(function ($productContent) use ($request) {
                $replicatedContent = $productContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        ProductCategoryContent::where('language_code', $default_lang)
            ->each(function ($productCategoryContent) use ($request) {
                $replicatedContent = $productCategoryContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        PricingPlanContent::where('language_code', $default_lang)
            ->each(function ($pricingPlanContent) use ($request) {
                $replicatedContent = $pricingPlanContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        PortfolioContent::where('language_code', $default_lang)
            ->each(function ($portfolioContent) use ($request) {
                $replicatedContent = $portfolioContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });
        PortfolioCategoryContent::where('language_code', $default_lang)
            ->each(function ($portfolioCategoryContent) use ($request) {
                $replicatedContent = $portfolioCategoryContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        ServiceContent::where('language_code', $default_lang)
            ->each(function ($serviceContant) use ($request) {
                $replicatedContent = $serviceContant->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        ServiceCategoryContent::where('language_code', $default_lang)
            ->each(function ($servicveCategoryContent) use ($request) {
                $replicatedContent = $servicveCategoryContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        CaseStudyContent::where('language_code', $default_lang)
            ->each(function ($caseStudyContent) use ($request) {
                $replicatedContent = $caseStudyContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        CaseStudyCategoryContent::where('language_code', $default_lang)
            ->each(function ($caseStudyContent) use ($request) {
                $replicatedContent = $caseStudyContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        TeamContent::where('language_code', $default_lang)
            ->each(function ($teamContent) use ($request) {
                $replicatedContent = $teamContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        PageContent::where('language_code', $default_lang)
            ->each(function ($pageContent) use ($request) {
                $replicatedContent = $pageContent->replicate();
                $replicatedContent->language_code = $request->language;
                $replicatedContent->save();
            });

        // clear relevant page cache
        Cache::forget('settings:languages');

        Page::each(function (Page $page) {
            Cache::forget('page:'.$page->slug);
        });

        Cache::forget('home:page');
        Cache::forget('home_page_header_footer');

        return true;
    }

    /**
     * Update language.
     *
     * @param  string  $language
     */
    public function update(Request $request, $language)
    {
        $languageList = Setting::where('setting_key', 'languages')->first();

        if (! $languageList) {
            return back()->withErrors(['message' => 'Language settings not found.']);
        }

        $existingLangs = json_decode($languageList->setting_value, true);

        if (array_key_exists($language, $existingLangs)) {
            $existingLangs[$language] = [
                'name' => $request->input('name'),
                'code' => $request->input('language'),
                'is_ltr' => $request->input('is_ltr'),
            ];

            $languageList->setting_value = json_encode($existingLangs);
            $languageList->save();
        }
        Cache::forget('settings:languages');
    }

    /**
     * Update language data.
     *
     * @param  string  $language
     */
    public function updateLangData(Request $request, $language)
    {
        $data = $request->values;
        if ($data) {
            $file = json_encode($data, JSON_PRETTY_PRINT);
            File::put(base_path('lang/'.$language.'.json'), $file);
        }

        if (isset($request->values) && is_array($request->values)) {
            $file = json_encode($request->values, JSON_PRETTY_PRINT);
            File::put(base_path('lang/'.$language.'.json'), $file);
        }

        $file = base_path('lang/'.$language.'.json');
        $posts = file_get_contents($file);

        if ($posts === false) {
            return back()->with('error', 'Failed to read language file!');
        }

        $data = json_decode($posts, true);

        if ($data === null) {
            return back()->with('error', 'Faild to decode JSON content');
        }

        foreach ($request->values as $key => $value) {
            $data[$key] = $value;
        }

        $updateContent = json_encode($data, JSON_PRETTY_PRINT);

        try {
            file_put_contents($file, $updateContent);
        } catch (\Exception $e) {
            return back()->with('error', 'Faild to update language file!');
        }
    }

    /**
     * Delete a language.
     *
     * @param  string  $language  The language.
     */
    public function deleteLang($language)
    {
        $posts = Setting::where('setting_key', 'languages')->first();
        $languages = json_decode($posts->setting_value);

        $data = [];
        foreach ($languages as $key => $row) {
            if ($language != $key) {
                $data[$key] = $row;
            }
        }

        $posts->setting_value = json_encode($data);
        $posts->save();

        if (file_exists(base_path('lang/'.$language.'.json'))) {
            unlink(base_path('lang/'.$language.'.json'));
        }

        PostContent::where('language_code', $language)->delete();
        CategoryContent::where('language_code', $language)->delete();
        ProductContent::where('language_code', $language);
        ProductCategoryContent::where('language_code', $language);
        PricingPlanContent::where('language_code', $language)->delete();
        PortfolioContent::where('language_code', $language)->delete();
        PortfolioCategoryContent::where('language_code', $language)->delete();
        ServiceContent::where('language_code', $language)->delete();
        ServiceCategoryContent::where('language_code', $language)->delete();
        CaseStudyContent::where('language_code', $language)->delete();
        CaseStudyCategoryContent::where('language_code', $language)->delete();
        PageContent::where('language_code', $language)->delete();
        TeamContent::where('language_code', $language)->delete();

        Cache::forget('settings:languages');
    }

    public function makeDefault($languageCode, SettingRepository $repository)
    {
        $repository->updateSettingByGroup('languages', ['default_lang' => $languageCode]);
        Cache::forget('settings:languages');
        Cache::forget('settings:default_lang');
    }
}
