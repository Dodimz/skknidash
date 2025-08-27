<?php

namespace App\Repositories\Frontend;

use App\Models\User;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify the user table.
     */
    protected User $model;

    /**
     * Constructor for the user repository.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->model = $user;
    }

    /**
     * Update User profile Information.
     *
     * @param  \App\Http\Requests\Admin\Profile\ProfileUpdateRequest  $request  The profile update request.
     * @param  \App\Models\User  $user  The user instance.
     */
    public function updateProfile(Request $request): void
    {
        $user = Auth::user();
        // user image
        if ($request->hasFile('avatar')) {
            $imagePath = $request->file('avatar')->store('users');
            $user->update(['photo_path' => Storage::url($imagePath)]);
        }

        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'country' => $request->input('country'),
            'address' => $request->input('address'),
        ]);
    }

    /**
     * Update User password.
     *
     * @param  \App\Http\Requests\Admin\Profile\PasswordUpdateRequest  $request  The password update request.
     * @param  \App\Models\User  $user  The user instance.
     */
    public function updatePassword(Request $request): void
    {
        $user = Auth::user();
        $user->update([
            'password' => bcrypt($request->input('password')),
        ]);
    }
}
