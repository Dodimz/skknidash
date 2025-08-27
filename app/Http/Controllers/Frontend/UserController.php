<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\UserUpdateRequest;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use App\Repositories\Admin\OrderRepository;
use App\Repositories\Admin\UserRepositories;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PDF;

class UserController extends Controller
{
    public function dashboard()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $userId = Auth::id();

        $data['total'] = Order::where('user_id', $userId)->count();
        $data['pending_orders'] = Order::where('user_id', $userId)->where('status', 'pending')->count();
        $data['completed_orders'] = Order::where('user_id', $userId)->where('status', 'completed')->count();
        $data['canceled_orders'] = Order::where('user_id', $userId)->where('status', 'canceled')->count();
        $data['payments'] = Order::where('user_id', $userId)
            ->where('payment_status', '2')
            ->sum('total_price');

        $data['tickets'] = '1';
        $data['recent_orders'] = Order::where('user_id', $userId)
            ->where('status', '!=', 'initialize')->with('orderitems')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('User/Dashboard', $data);
    }

    public function orders()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $userId = Auth::id();
        $data['orders'] = Order::where('user_id', $userId)->with('orderitems')->latest()->paginate(10);
        return Inertia::render('User/Order/Order', $data);
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

    public function profile()
    {
        return Inertia::render('User/Profile/Edit');
    }

    /**
     * User update
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'about' => $request->about,
        ]);
        return back()->with('success', 'User successfully updated');
    }
}
