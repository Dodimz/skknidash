<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use App\Repositories\Admin\SubscribeRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SubscribeController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete']]);
    }

    /**
     * Get subscribers
     */
    public function index(Request $request, SubscribeRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'email';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['subscribers'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Subscribers/Index', $data);
    }

    /**
     * Delete subscriber
     */
    public function destroy(Subscriber $subscriber, SubscribeRepository $repository): RedirectResponse
    {
        $repository->destroy($subscriber);

        return redirect()->route('admin.subscribers.index')->with('success', 'Subscriber successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, SubscribeRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return redirect()->route('admin.subscribers.index')->with('success', 'Selected subscriber successfully deleted');
    }

    /**
     * Export Newslatter Data.
     */
    public function exportNewslatter(SubscribeRepository $repository): StreamedResponse
    {
        return $repository->exportCsv();
    }
}
