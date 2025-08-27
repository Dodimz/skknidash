<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\PasswordUpdateRequest;
use App\Http\Requests\Frontend\ProfileUpdateRequest;
use App\Models\User;
use App\Repositories\Frontend\ProfileRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(): Response
    {
        return Inertia::render('User/Profile/Edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request, ProfileRepository $repository): RedirectResponse
    {
        try {
            $repository->updateProfile($request);

            return redirect()->back()->with('success', Lang::get('Profile successfully updated'));
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Error updating profile: '.$e->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function changePassword(): Response
    {
        return Inertia::render('User/Profile/ChangePassword');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  User  $user
     */
    public function updatePassword(PasswordUpdateRequest $request, ProfileRepository $repository): RedirectResponse
    {
        $repository->updatePassword($request);

        return redirect()->back()->with('success', Lang::get('Password updated successfully'));
    }
}
