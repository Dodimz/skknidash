<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentHistory;
use App\Repositories\Admin\PaymentHistoryRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, PaymentHistoryRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['paymentHistories'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('PaymentHistory/Index', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentHistory $paymentHistory)
    {
        $data['paymentHistory'] = $paymentHistory->load('plan.currency');

        return Inertia::render('PaymentHistory/Show', $data);
    }
}
