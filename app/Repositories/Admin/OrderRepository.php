<?php

namespace App\Repositories\Admin;

use App\Models\Order;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class OrderRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Order $model;

    /**
     * Constructor for Order repository
     */
    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    /**
     * Get search result with pagination
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->with(['orderitems'])->newQuery();

        $query->where('status', '!=', 'initialize');

        if ($search) {
            $query->whereHas('orderitems', function ($q) use ($search) {
                $q->where('product_name', 'like', "%{$search}%");
            })
                ->orWhere('order_number', 'like', "%$search%")
                ->orWhere('customer_name', 'like', "%$search%")
                ->orWhere('customer_phone', 'like', "%$search%")
                ->orWhere('customer_email', 'like', "%$search%");
        }

        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'product_name') {
                $query->join('order_items', 'orders.id', '=', 'order_items.order_id')
                    ->groupBy('orders.id')
                    ->orderBy('order_items.product_name', $order)
                    ->select('orders.*');
            } else {
                $query->orderBy($column, $order);
            }
        }

        // Filter by status
        if (isset($filter['status']) && $filter['status'] !== 'All Order Status') {
            $query->where('status', $filter['status']);
        }

        // Filter by payment status
        if (isset($filter['payment_status']) && $filter['payment_status'] !== 'All Payment Status') {
            $query->where('payment_status', $filter['payment_status']);
        }

        return $query->paginate(30)->appends(array_filter([
            'search' => $search,
            'sort' => $sort,
        ]));
    }

    public function updateStatus(Request $request, Order $order)
    {
        $order->update([
            'status' => $request->status,
            'payment_status' => $request->payment_status,
        ]);
    }

    /**
     * Get invoice front name
     */
    public function getInvoiceFrontName(): string
    {
        $language_code = session()->get('lang') ?? Setting::pull('default_lang');
        $currency_code = Setting::pull('currency_code');

        if (
            $currency_code == 'BDT' ||
            $language_code == 'bd'
        ) {
            // bengali font
            $font_family = "'Hind Siliguri','freeserif'";
        } elseif (
            $currency_code == 'KHR' ||
            $language_code == 'kh'
        ) {
            // khmer font
            $font_family = "'Hanuman','sans-serif'";
        } elseif ($currency_code == 'AMD') {
            // Armenia font
            $font_family = "'arnamu','sans-serif'";
        } elseif (
            $currency_code == 'AED' ||
            $currency_code == 'EGP' ||
            $language_code == 'sa' ||
            $currency_code == 'IQD' ||
            $language_code == 'ir' ||
            $language_code == 'om' ||
            $currency_code == 'ROM' ||
            $currency_code == 'SDG' ||
            $currency_code == 'ILS' ||
            $language_code == 'jo' ||
            $language_code == 'ar'
        ) {
            $font_family = 'xbriyaz';
        } elseif ($currency_code == 'THB') {
            $font_family = "'Kanit','sans-serif'";
        } elseif (
            $currency_code == 'CNY' ||
            $language_code == 'zh'
        ) {
            $font_family = "'sun-exta','gb'";
        } elseif (
            $currency_code == 'MMK' ||
            $language_code == 'mm'
        ) {
            $font_family = 'tharlon';
        } elseif (
            $currency_code == 'THB' ||
            $language_code == 'th'
        ) {
            $font_family = "'zawgyi-one','sans-serif'";
        } elseif (
            $currency_code == 'USD' ||
            $currency_code == 'TRY' ||
            $language_code == 'tr'
        ) {
            $font_family = "'Roboto','sans-serif'";
        } else {
            $font_family = 'freeserif';
        }

        return $font_family;
    }

    /**
     * Get invoice direction
     */
    public function getInvoiceDirection(): string
    {
        $direction = null;
        $language_code = session()->get('lang') ?? Setting::pull('default_lang');
        $languages = json_decode(Setting::pull('languages'), true);
        if ($languages[$language_code]['is_ltr'] == 'yes') {
            $direction = 'ltr';
        } else {
            $direction = 'rtl';
        }

        return $direction;
    }

    /**
     * Delete order
     */
    public function destroy(Order $order): void
    {
        $order->delete();
    }

    /**
     * Bulk delete orders.
     */
    public function bulkDelete(string $ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
