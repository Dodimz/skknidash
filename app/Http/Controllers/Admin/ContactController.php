<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Repositories\Admin\ContactRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ContactController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete']]);
    }

    /**
     * Get contacts
     */
    public function index(Request $request, ContactRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'ticket_id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['contacts'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Contacts/Index', $data);
    }

    /**
     * Show contacts
     */
    public function show(Contact $contact): Response
    {
        $contact->update(['is_open' => '1']);
        $data['contact'] = $contact;

        return Inertia::render('Contacts/Show', $data);
    }

    /**
     * Delete contact
     */
    public function destroy(Contact $contact, ContactRepository $repository): RedirectResponse
    {
        $repository->destroy($contact);

        return back()->with('success', 'Contact successfully deleted');
    }

    /**
     * Bulk delete contact
     */
    public function bulkDelete(Request $request, ContactRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected contact successfully deleted');
    }

    /**
     * Export Contact Data.
     */
    public function exportContact(ContactRepository $repository): StreamedResponse
    {
        return $repository->exportCsv();
    }
}
