<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Setting;
use App\Repositories\Admin\OrderRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PDF;

class OrderController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['updateStatus', 'destroy', 'bulkDelete']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, OrderRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['status'] = $request->filter['status'] ?? 'All Order Status';
        $data['filter']['payment_status'] = $request->filter['payment_status'] ?? 'All Payment Status';
        $data['orders'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        return Inertia::render('Orders/Index', $data);
    }

    /**
     * Show the form for showing the specified resource.
     */
    public function show(Order $order)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['order'] = $order->load('orderitems');
        return Inertia::render('Orders/Show', $data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return RedirectResponse
     */
    public function updateStatus(Request $request, Order $order, OrderRepository $repository)
    {
        $repository->updateStatus($request, $order);

        return redirect()->route('admin.orders.index')->with('success', 'Order status successfully updated!');
    }

    /**
     * Show invoice.
     */
    public function showInvoice(Order $order, OrderRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['invoice_logo'] = Setting::pull('invoice_logo');
        $data['footer_contact'] = Setting::pull('footer_contact');
        $data['footer_address'] = Setting::pull('footer_address');
        $data['currency_symbol'] = Setting::pull('currency_symbol');
        $data['font_family'] = $repository->getInvoiceFrontName();
        $data['direction'] = $repository->getInvoiceDirection();
        $data['text_align'] = $data['direction'] == 'ltr' ? 'left' : 'right';
        $data['order'] = $order->load('orderitems');
        $pdf = PDF::loadView('invoice', $data);

        return $pdf->stream("invoice-{$order->order_number}.pdf");
    }

    /**
     * Download invoice
     */
    public function downloadInvoice(Order $order, OrderRepository $repository)
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['invoice_logo'] = Setting::pull('invoice_logo');
        $data['footer_contact'] = Setting::pull('footer_contact');
        $data['footer_address'] = Setting::pull('footer_address');
        $data['currency_symble'] = Setting::pull('currency_symble');
        $data['font_family'] = $repository->getInvoiceFrontName();
        $data['direction'] = $repository->getInvoiceDirection();
        $data['text_align'] = $data['direction'] == 'ltr' ? 'left' : 'right';
        $data['order'] = $order->load('orderitems');
        $pdf = PDF::loadView('invoice', $data);

        return $pdf->download("invoice-{$order->order_number}.pdf");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order, OrderRepository $repository)
    {
        $repository->destroy($order);

        return back()->with('success', 'Orders successfully deleted!');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, OrderRepository $repository)
    {
        $repository->bulkDelete($request->ids);

        return back()->with('success', 'Orders successfully deleted!');
    }
}
