<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\Ticket\TicketReplyStoreRequest;
use App\Http\Requests\Frontend\Ticket\TicketStoreRequest;
use App\Models\Ticket;
use App\Repositories\Frontend\TicketRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(TicketRepository $repository): Response
    {
        $data['tickets'] = $repository->paginateSearchResult();

        return Inertia::render('User/Tickets/Index', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('User/Tickets/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TicketStoreRequest $request, TicketRepository $repository): RedirectResponse
    {
        $repository->create($request);

        return redirect()->back()->with('success', Lang::get('Ticket Successfully Created'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function reply(Ticket $ticket): Response
    {
        $data['ticket'] = $ticket->load([
            'user',
            'replies.user' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
        ]);

        return Inertia::render('User/Tickets/Reply', $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function submitReply(TicketReplyStoreRequest $request, Ticket $ticket, TicketRepository $repository): RedirectResponse
    {
        $repository->createReply($request, $ticket);

        return redirect()->back()->with('success', Lang::get('Ticket reply successfully send to admin'));
    }
}
