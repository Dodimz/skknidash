<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class SettingsController extends Controller
{
    /**
     * Update the specified resource.
     */
    public function changeLang($lang): RedirectResponse
    {
        session()->put('lang', $lang);

        return back()->with('success', 'Language successfully changed');
    }
}
