<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PasswordChangeRequest;
use App\Http\Requests\Backend\ProfileUpdateRequest;
use App\Repositories\Admin\AuthRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['updateProfile', 'changePassword']]);
    }

    /**
     * Profile
     */
    public function profile(): Response
    {
        return Inertia::render('Profile/Profile');
    }

    public function updateProfile(ProfileUpdateRequest $request, AuthRepository $repository): RedirectResponse
    {
        $repository->updateProfile($request);

        return back()->with('success', 'Profile successfully updated');
    }

    /**
     * Change password
     */
    public function changePassword(PasswordChangeRequest $request, AuthRepository $repository): RedirectResponse
    {
        $repository->changePassword($request);

        return back()->with('success', 'Password successfully changed');
    }
}
