<?php

namespace App\Http\Controllers\Frontend;

use App\Events\FormSubmitted;
use App\Http\Controllers\Controller;
use App\Models\FormResponse;
use App\Models\FormResponseType;
use App\Models\Setting;
use Illuminate\Http\Request;

class FormResponseController extends Controller
{
    public function store(Request $request)
    {
        $formResponseTo = Setting::pull('form_response_to');

        $formData = $request->except(['captchaToken']);

        if ($formResponseTo === 'email_only') {
            $data = new \stdClass;
            $data->response_data = $formData;
            $data->response_from = $request->response_from;

            event(new FormSubmitted($data));
        } elseif ($formResponseTo === 'database_only') {
            FormResponseType::updateOrCreate(
                ['form_response' => $request->response_from],
            );

            $data = FormResponse::create([
                'response_data' => json_encode($formData),
                'response_from' => $request->response_from,
                'form_name' => $request->form_name,
            ]);
        } else {
            FormResponseType::updateOrCreate(
                ['form_response' => $request->response_from],
            );

            $data = FormResponse::create([
                'response_data' => json_encode($formData),
                'response_from' => $request->response_from,
                'form_name' => $request->form_name,
            ]);

            $emailData = new \stdClass;
            $emailData->response_data = $formData;
            $emailData->response_from = $request->response_from;

            event(new FormSubmitted($emailData));
        }

        return back()->with('success', 'Form successfully submitted');
    }
}
