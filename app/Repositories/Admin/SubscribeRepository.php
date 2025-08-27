<?php

namespace App\Repositories\Admin;

use App\Models\Service;
use App\Models\Subscriber;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubscribeRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify subscribe table
     */
    protected Subscriber $subscriber;

    /**
     *  Constructor for Service repository
     */
    public function __construct(Subscriber $subscriber)
    {
        $this->model = $subscriber;
    }

    /**
     * Get subscribers
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        if ($search) {
            $query->orWhere('email', 'like', "%$search%");
        }

        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
            ]));
    }

    /**
     * Store subscribe
     */
    public function subscribe(Request $request): void
    {
        $this->model->create([
            'email' => $request->email,
        ]);
    }

    /**
     * Delete subscriber
     */
    public function destroy(Subscriber $subscriber): void
    {
        $subscriber->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->delete();
    }

    /**
     * Export CSV
     */
    public function exportCsv()
    {
        $fileName = 'newslatter_subscribers.csv';
        $subscribers = Subscriber::all('email');

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
            'Cache-Control' => 'no-store, no-cache, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ];

        $callback = function () use ($subscribers) {
            $file = fopen('php://output', 'w');
            fputcsv($file, ['Email']);

            foreach ($subscribers as $subscriber) {
                fputcsv($file, [$subscriber->email]);
            }
            fclose($file);
        };

        return new StreamedResponse($callback, 200, $headers);
    }
}
