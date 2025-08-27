<?php

namespace App\Http\Requests\Admin\Posts;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

class PostStoreRequest extends FormRequest
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
     */
    public function rules(): array
    {
        $rules = [
            'thumbnail_image' => 'required',
            'category' => 'required',
            'tags' => 'nullable',
        ];

        // Append language-specific validation rules
        $languages = json_decode(Setting::pull('languages'));
        foreach ($languages as $language) {
            $langCode = $language->code;
            $rules[$langCode.'_title'] = 'required|max:255';
            $rules[$langCode.'_content'] = 'required';
            $rules[$langCode.'_meta_title'] = 'max:250';
            $rules[$langCode.'_meta_description'] = 'max:250';
        }

        return $rules;
    }
}
