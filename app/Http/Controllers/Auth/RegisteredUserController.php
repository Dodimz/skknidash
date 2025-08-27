<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisteredUserStoreRequest;
use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Artesaos\SEOTools\Facades\OpenGraph;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\TwitterCard;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $terms_condition_page_id = Setting::pull('default_terms_and_conditions_page');
        $page = Page::find($terms_condition_page_id);
        $data['terms_condition_url'] = route('pages.show', $page->slug);

        $current_page_url = request()->url();
        $meta_tags = 'register';
        $site_name = Setting::pull('site_name');
        $tagline = __('Register');

        SEOMeta::setTitle($tagline . ' - ' . $site_name);
        SEOMeta::setCanonical($current_page_url);
        SEOMeta::addMeta('robots', 'index, follow');
        SEOMeta::addKeyword(explode(',', $meta_tags));

        OpenGraph::setUrl($current_page_url);
        OpenGraph::setSiteName($site_name);
        OpenGraph::addProperty('type', 'website');

        TwitterCard::setSite('@bione');
        TwitterCard::setType('summary_large_image');
        SEOMeta::addMeta('viewport', 'width=device-width, initial-scale=1');
        $data['meta_tags'] = $meta_tags;
        $data['site_name'] = $site_name;
        $data['tagline'] = $tagline;

        return Inertia::render('Auth/Register', $data);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisteredUserStoreRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'about' => $request->about
        ])->assignRole('user');

        event(new Registered($user));

        Auth::login($user);

        return Inertia::location(RouteServiceProvider::USER_HOME);
    }
}
