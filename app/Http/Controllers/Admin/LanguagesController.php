<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\Languages\LanguageStoreRequest;
use App\Http\Requests\Admin\Settings\Languages\LanguageUpdateRequest;
use App\Models\Language;
use App\Models\Setting;
use App\Repositories\Admin\LanguageRepository;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LanguagesController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $data['languages'] = json_decode(Setting::pull('languages'), true);
        $data['default_lang'] = Setting::pull('default_lang');

        return Inertia::render('Settings/Languages/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $data['languages'] = Language::all();

        return Inertia::render('Settings/Languages/Create', $data);
    }

    /**
     * Store a newly created language in storage.
     */
    public function store(LanguageStoreRequest $request, LanguageRepository $repository): RedirectResponse
    {
        $repository->createLang($request);

        return redirect()->route('admin.languages.index')->with('success', 'Language successfully created!');
    }

    /**
     * Edit the specified resource in storage.
     */
    public function edit($language): Response
    {
        $data['languages'] = Language::all();
        $data['edited_lang'] = json_decode(Setting::pull('languages'), true)[$language];

        return Inertia::render('Settings/Languages/Edit', $data);
    }

    /**
     * Update the specified resource.
     */
    public function update(LanguageUpdateRequest $request, $language, LanguageRepository $repository): RedirectResponse
    {
        $repository->update($request, $language);

        return redirect()->route('admin.languages.index')->with('success', 'Language file updated successfully!');
    }

    /**
     * Delete language from storage.
     */
    public function destroy($language, LanguageRepository $repository): RedirectResponse
    {
        $repository->deleteLang($language);

        return back()->with('success', 'Language successfully deleted!');
    }

    /**
     * Make default language.
     */
    public function makeDefault($language, LanguageRepository $repository, SettingRepository $settingRepository): RedirectResponse
    {
        $repository->makeDefault($language, $settingRepository);

        return back()->with('success', 'Language set successfully as default');
    }
}
