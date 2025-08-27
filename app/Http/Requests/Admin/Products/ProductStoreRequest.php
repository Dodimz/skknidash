<?php

namespace App\Http\Requests\Admin\Products;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'category' => ['required'],
            'short_description' => ['nullable'],
            'sku' => ['required'],
            'quantity' => ['required'],
            'price' => ['required', 'numeric', 'min:0'],
            'discount_price' => [
                'nullable',
                'numeric',
                'lt:price',
            ],
            'thumbnail_image' => ['required', 'max:2048'],
            'slider_images' => ['required', 'array', 'min:1'],
            'slider_images.*' => ['max:2048'],
            'status' => ['required', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:255'],
            'seo_description' => ['nullable', 'string'],
        ];

        // Append language-specific validation rules
        $languages = json_decode(Setting::pull('languages'));
        foreach ($languages as $language) {
            $langCode = $language->code;
            $rules[$langCode . '_name'] = 'required|max:255';
            $rules[$langCode . '_description'] = 'nullable';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'discount_price.lt' => 'The discount price must be less than the regular price.',
        ];
    }
}
