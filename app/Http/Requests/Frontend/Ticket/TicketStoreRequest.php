<?php

namespace App\Http\Requests\Frontend\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class TicketStoreRequest extends FormRequest
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
            'subject' => 'required|max:255',
            'properly' => 'required|max:255',
            'message' => 'nullable',
            'document' => 'nullable|max:3000|mimetypes:image/jpeg,image/png,image/gif,application/pdf,application/msword,application/vnd.            openxmlformats-officedocument.wordprocessingml.document',
        ];
    }
}
