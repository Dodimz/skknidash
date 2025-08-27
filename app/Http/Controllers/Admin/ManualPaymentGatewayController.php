<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ManualPaymentGateway\ManualPaymentGatewayStoreRequest;
use App\Http\Requests\Admin\ManualPaymentGateway\ManualPaymentGatewayUpdateRequest;
use App\Models\ManualPaymentGateway;
use App\Models\Setting;
use App\Repositories\Admin\ManualPaymentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManualPaymentGatewayController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'store', 'update', 'bulkDelete', 'statusToggle']]);
    }
    public function index(Request $request, ManualPaymentRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['manual_payment_gateways'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render("ManualPaymentGateway/Index", $data);
    }

    public function create()
    {

        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        return Inertia::render("ManualPaymentGateway/Create", $data);
    }

    public function store(ManualPaymentGatewayStoreRequest $request, ManualPaymentRepository $repository)
    {
        $repository->create($request);
        return redirect()->route("admin.manual.payment.gateway.index")->with('success', 'Manual Payment Gateway Created Successfully!');
    }

    public function edit(ManualPaymentGateway $gateway, ManualPaymentRepository $repository)
    {
        $data['edited_gateway'] = $repository->getEditedData($gateway);
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render("ManualPaymentGateway/Edit", $data);
    }

    public function update(ManualPaymentGatewayUpdateRequest $request, ManualPaymentGateway $gateway, ManualPaymentRepository $repository)
    {
        $repository->update($request, $gateway);
        return redirect()->route("admin.manual.payment.gateway.index")->with("success", "Manual Payment Gateway Updated Successfully!");
    }

    public function destroy(ManualPaymentGateway $gateway, ManualPaymentRepository $repository)
    {
        $repository->destroy($gateway);
        return redirect()->route("admin.manual.payment.gateway.index")->with("success", "Manual Payment Gateway Successfully Deleted!");
    }

    public function bulkDelete(Request $request, ManualPaymentRepository $repository)
    {
        $repository->bulkDelete($request->ids);
        return back()->with('success', 'Manual Payment Gateway Successfully Deleted!');
    }

    /**
     * Gateway status toggle
     */
    public function statusToggle(Request $request, ManualPaymentRepository $repository)
    {
        $repository->statusToggle($request->id);
        return back()->with('success', 'Manual Payment Gateway Status Has Been Changed!');
    }
}
