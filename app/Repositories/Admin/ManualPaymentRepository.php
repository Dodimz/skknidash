<?php

namespace App\Repositories\Admin;

use App\Models\ManualPaymentGateway;
use App\Models\ManualPaymentGatewayContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class ManualPaymentRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify manual payment gateways table
     */
    protected ManualPaymentGateway $model;

    /**
     * Constructor for manual payment gateway repository
     */
    public function __construct(ManualPaymentGateway $manualPaymentGateway)
    {
        $this->model = $manualPaymentGateway;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        // search manual payment gateway
        if (isset($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('gateway_name', 'like', '%' . $search . '%');
            });
        }

        // sort manual payment gateway
        if (isset($sort['column'])) {
            if ($sort['column'] == 'gateway_name') {
                $query->orderBy(
                    ManualPaymentGatewayContent::select($sort['column'])
                        ->whereColumn('manual_payment_gateways.id', 'manual_payment_gateway_contents.manual_payment_gateway_id')
                        ->where('language_code', app()->getLocale()),
                    $sort['order']
                );
            } else {
                $query->orderBy($sort['column'], $sort['order']);
            }
        }

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Create manual payment gateway
     */
    public function create(Request $request): void
    {
        $manualPayment = $this->model->create([
            'thumbnail_image' => $request->input('thumbnail_image'),
            'payment_type' => $request->input('payment_type'),
            'status' => $request->input('status'),
            'bank_information' => $request->has('bank_information') ? json_encode($request->input('bank_information')) : null,
        ]);

        $languages = json_decode(Setting::pull('languages'), true);

        $contents = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'gateway_name' => $request->input($langCode . '_gateway_name'),
                'instructions' => $request->input($langCode . '_instructions'),
            ];
        }, $languages);

        $manualPayment->contents()->createMany($contents);
    }

    /**
     * Get featured manual payment gateway
     *
     * @return array
     */
    public function getEditedData(ManualPaymentGateway $gateway)
    {
        $languages = json_decode(Setting::pull('languages'), true);

        $data = [
            'id' => $gateway->id,
            'thumbnail_image' => $gateway->thumbnail_image,
            'bank_information' => json_decode($gateway->bank_information, true),
            'payment_type' => $gateway->payment_type,
            'status' => $gateway->status,
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_gateway_name'] = '';
            $data[$langCode . '_instructions	'] = '';
        }

        foreach ($gateway->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode . '_gateway_name'] = $content->gateway_name;
            $data[$langCode . '_instructions'] = $content->instructions;
        }

        return $data;
    }

    /**
     * Update manual payment gateway
     */
    public function update(Request $request, ManualPaymentGateway $gateway): void
    {

        $gateway->update([
            'thumbnail_image' => $request->input('thumbnail_image'),
            'payment_type' => $request->input('payment_type'),
            'status' => $request->input('status'),
            'bank_information' => $request->has('bank_information') ? json_encode($request->input('bank_information')) : null,
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $gateway->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'gateway_name' => $request[$langCode . '_gateway_name'],
                    'instructions' => $request[$langCode . '_instructions'],
                ],
            );
        }
    }

    /**
     * Delete manual payment gateway
     */
    public function destroy(ManualPaymentGateway $gateway): void
    {
        $gateway->delete();
    }

    /**
     * Bulk delete manual payment gateways
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }

    /**
     * Toggle manual payment gateway status
     */
    public function statusToggle($manualPaymentGatewayId): void
    {
        $manualPaymentGateway = $this->model->find($manualPaymentGatewayId);
        $newStatus = $manualPaymentGateway->status == '1' ? '0' : '1';
        $manualPaymentGateway->status = $newStatus;
        $manualPaymentGateway->save();
    }
}
