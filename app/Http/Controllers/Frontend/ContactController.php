<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ContactSubmitRequest;
use App\Repositories\Admin\ContactRepository;
use Illuminate\Http\RedirectResponse;

class ContactController extends Controller
{
    /**
     * Submit contact
     */
    public function submitContact(ContactSubmitRequest $request, ContactRepository $repository): RedirectResponse
    {
        $repository->submitContact($request);

        return back()->with('success', 'Message successfully send');
    }
}
