<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\PasswordChangeRequest;
use App\Http\Requests\Backend\ProfileUpdateRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthRepository
{
    /**
     * Update profile
     */
    public function updateProfile(ProfileUpdateRequest $request): void
    {
        Auth::user()->update([
            'name' => $request->name,
            'about' => $request->about,
        ]);
    }

    /**
     * Change password
     */
    public function changePassword(PasswordChangeRequest $request): void
    {
        Auth::user()->update([
            'password' => Hash::make($request->password),
        ]);
    }
}
