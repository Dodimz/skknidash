<?php

namespace App\Http\Requests\Admin\ManualPaymentGateway;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

class ManualPaymentGatewayUpdateRequest extends FormRequest
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

        // Append language-specific validation rules
        $languages = json_decode(Setting::pull('languages'));
        foreach ($languages as $language) {
            $langCode = $language->code;
            $rules[$langCode . '_gateway_name'] = 'required|max:255';
            $rules[$langCode . '_instructions'] = 'required';
        }

        return $rules;
    }
}
