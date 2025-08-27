<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ServiceUpdateRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'icon_box_title' => 'required|max:255',
            'icon_box_sub_title' => 'required|max:255',
            'info_title' => 'nullable|max:255',
            'info_thumbnail_image' => 'nullable|max:255',
            'category' => 'required',
        ];
    }
}
