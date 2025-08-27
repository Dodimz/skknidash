<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormResponse;
use App\Models\FormResponseType;
use App\Repositories\Admin\FormResponseRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FormResponseController extends Controller
{
    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy', 'bulkDelete']]);
    }

    public function index(Request $request, FormResponseRepository $repository)
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'desc';
        $data['filter']['response'] = $request->filter['response'] ?? 'All Responses';
        $data['form_responses'] = FormResponseType::all();
        $data['responses'] = $repository->paginateSearchResult($data['search'], $data['sort'], $data['filter']);

        // return $data;

        return Inertia::render('FormResponse/Index', $data);
    }

    public function destroy(FormResponse $formResponse)
    {
        $formResponse->delete();

        return back()->with('success', 'Form response successfully deleted');
    }

    public function bulkDelete(Request $request, FormResponseRepository $repository)
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'The selected data successfully deleted');
    }

    public function show(FormResponse $formResponse)
    {
        $formResponse->update(['is_open' => '1']);
        $data['response'] = $formResponse;

        return Inertia::render('FormResponse/Show', $data);
    }
}
