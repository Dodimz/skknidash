<?php

namespace App\Http\Requests\Auth;

use App\Models\Setting;
use App\Rules\MatchEmail;
use App\Rules\MatchPhone;
use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [];
        $verification_method = $this->input('verification_method');
        if ($verification_method == 'email') {
            $rules['email'] = ['required', 'email', new MatchEmail];
        } else {
            $rules['phone'] = ['required', new MatchPhone];
        }

        return $rules;
    }

    /**
     * Modify the request data before validation.
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'verification_method' => Setting::pull('authentication_verification_method'),
        ]);
    }
}
