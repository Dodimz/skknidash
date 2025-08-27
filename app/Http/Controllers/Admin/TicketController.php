<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Tickets\TicketReplyStoreRequest;
use App\Models\Ticket;
use App\Repositories\Admin\TicketRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete', 'submitReply']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, TicketRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['tickets'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Tickets/Index', $data);
    }

    /**
     * Show the form for store the specified resource.
     */
    public function reply(Ticket $ticket): Response
    {
        if ($ticket->status === 'pending') {
            $ticket->update(['status' => 'open']);
        }

        $data['ticket'] = $ticket->load([
            'user',
            'replies.user' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
        ]);

        return Inertia::render('Tickets/Show', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function submitReply(TicketReplyStoreRequest $request, Ticket $ticket, TicketRepository $repository): RedirectResponse
    {
        $repository->createReply($request, $ticket);

        return redirect()->back()->with('success', 'Ticket reply successfully created!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket): RedirectResponse
    {
        $ticket->delete();

        return back()->with('success', 'Ticket successfully deleted!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, TicketRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Tickets successfully deleted!');
    }
}
