<?php

namespace App\Http\Requests\Frontend;

use Illuminate\Foundation\Http\FormRequest;

class PricingPlanStoreRequest extends FormRequest
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
        return [
            'name' => 'required|max:255',
            'email' => 'required|max:255|email',
            'mobile' => 'required',
            'name' => 'required|max:255',
            'whatsapp_skype' => 'nullable',
            'note' => 'nullable',
            'payment_method' => 'required',
            'agreed' => 'required|accepted',
        ];
    }
}
