<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Repositories\Admin\TranslateRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TranslateController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['update', 'auto']]);
    }

    /**
     * Display a listing of the languages.
     */
    public function index(): Response
    {
        $data['languages'] = json_decode(Setting::pull('languages'), true);
        $data['default_lang'] = Setting::pull('default_lang');

        return Inertia::render('Settings/Translate/Index', $data);
    }

    /**
     * Show the form for edit a new resource.
     */
    public function show($language): Response
    {
        $file = base_path('lang/' . $language . '.json');
        $post = file_get_contents($file);
        $data['posts'] = json_decode($post);
        $data['language'] = $language;

        return Inertia::render('Settings/Translate/Show', $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $language, TranslateRepository $repository): RedirectResponse
    {
        $repository->updateLangData($request, $language);

        return redirect()->route('admin.translations.index')->with('success', 'Language file successfully translated!');
    }

    public function auto(Request $request, $language, TranslateRepository $repository)
    {
        try {
            $data = $repository->autoTranslateFromFile('en', $language, $request->key);

            return response()->json(['translated' => $data]);
        } catch (\Exception) {
        }
    }
}
