<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TestimonialStoreRequest;
use App\Http\Requests\Admin\TestimonialUpdateRequest;
use App\Models\Setting;
use App\Models\Testimonial;
use App\Repositories\Admin\TestimonialRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    /**
     * Get testimonial
     */
    public function index(Request $request, TestimonialRepository $repository): Response
    {
        $data['search'] = $request->search ?: '';
        $data['sort']['column'] = $request->sort['column'] ?? 'id';
        $data['sort']['order'] = $request->sort['order'] ?? 'asc';
        $data['filtered_lang'] = $request->filter['lang'] ?? Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['testimonials'] = $repository->paginateSearchResult($data['search'], $data['sort']);

        return Inertia::render('Testimonials/Index', $data);
    }

    /**
     * Create team
     */
    public function create(): Response
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));

        return Inertia::render('Testimonials/Create', $data);
    }

    /**
     * Store testimonial
     */
    public function store(TestimonialStoreRequest $request, TestimonialRepository $repository): RedirectResponse
    {
        $repository->store($request);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial successfully created');
    }

    /**
     * Edit testimonial
     */
    public function edit(Testimonial $testimonial, TestimonialRepository $repository): Response
    {
        $data['default_lang'] = Setting::pull('default_lang');
        $data['languages'] = json_decode(Setting::pull('languages'));
        $data['testimonial'] = $repository->getEditData($testimonial);

        return Inertia::render('Testimonials/Edit', $data);
    }

    /**
     * Update testimonial
     */
    public function update(TestimonialUpdateRequest $request, Testimonial $testimonial, TestimonialRepository $repository): RedirectResponse
    {
        $repository->update($request, $testimonial);

        return redirect()->route('admin.testimonials.index')->with('success', 'Testimonial successfully updated');
    }

    /**
     * Delete testimonial
     */
    public function destroy(Testimonial $testimonial, TestimonialRepository $repository): RedirectResponse
    {
        $repository->destroy($testimonial);

        return back()->with('success', 'Testimonial successfully deleted');
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request, TestimonialRepository $repository): RedirectResponse
    {
        $repository->bulkDelete($request);

        return back()->with('success', 'Selected testimonial successfully deleted');
    }
}
