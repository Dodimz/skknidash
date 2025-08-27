<?php

namespace App\Repositories\Admin;

use App\Models\Service;
use App\Models\ServiceCategoryContent;
use App\Models\ServiceContent;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class ServiceRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Service $model;

    /**
     *  Constructor for Service repository
     */
    public function __construct(Service $service)
    {
        $this->model = $service;
    }

    /**
     * Get services
     */
    public function paginateSearchResult($search, array $sort = [], array $filter = []): LengthAwarePaginator
    {
        $query = $this->model->with(['content', 'category.content', 'contents'])->newQuery();

        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // Filter service by category title
        if (isset($filter['category']) && $filter['category'] !== 'All Categories') {
            $query->whereHas('category.content', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // sort
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(ServiceContent::select($sort['column'])
                    ->whereColumn('services.id', 'service_contents.service_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    ServiceCategoryContent::select('title')
                        ->whereColumn('service_category_contents.service_category_id', 'services.category_id')
                        ->where('language_code', app()->getLocale()),
                    $order
                );
            } else {
                $query->orderBy($column, $order);
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
     * Store service
     */
    public function store(Request $request, SettingRepository $repository): void
    {
        $default_lang = Setting::pull('default_lang');

        $service = $this->model->create([
            'slug' => Str::slug($request->pageInfo[$default_lang]['title']),
            'category_id' => $request->pageInfo[$default_lang]['category'],
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            ServiceContent::create([
                'service_id' => $service->id,
                'language_code' => $key,
                'title' => $request->pageInfo[$key]['title'],
                'breadcrumb_title' => $request->pageInfo[$key]['breadcrumb_title'],
                'header_action_button_text' => $request->pageInfo[$key]['header_action_button_text'],
                'header_action_button_url' => $request->pageInfo[$key]['header_action_button_url'],
                'meta_title' => $request->pageInfo[$key]['meta_title'],
                'meta_description' => $request->pageInfo[$key]['meta_description'],
                'meta_tags' => $request->pageInfo[$key]['meta_tags'],
                'sections_data' => json_encode($request->pageData[$key]),
            ]);
        }
    }

    /**
     * Update service
     */
    public function update(Request $request, Service $service): void
    {
        $default_lang = Setting::pull('default_lang');
        $service->update([
            'category_id' => $request->pageInfo[$default_lang]['category'],
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            ServiceContent::updateOrCreate([
                'service_id' => $service->id,
                'language_code' => $key,
            ], [
                'service_id' => $service->id,
                'language_code' => $key,
                'title' => $request->pageInfo[$key]['title'],
                'breadcrumb_title' => $request->pageInfo[$key]['breadcrumb_title'],
                'header_action_button_text' => $request->pageInfo[$key]['header_action_button_text'],
                'header_action_button_url' => $request->pageInfo[$key]['header_action_button_url'],
                'meta_title' => $request->pageInfo[$key]['meta_title'],
                'meta_description' => $request->pageInfo[$key]['meta_description'],
                'meta_tags' => $request->pageInfo[$key]['meta_tags'],
                'sections_data' => json_encode($request->pageData[$key]),
            ]);
        }
    }

    /**
     * Service delete
     */
    public function destroy(Service $service): void
    {
        $service->delete();
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * Service slug update
     */
    public function updateSlug(Request $request, Service $service)
    {
        $service->update(['slug' => $request->input('slug')]);
    }

    /**
     * Get service data.
     */
    public function getServiceData(Service $service)
    {
        $service->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($service->contents as $serviceContent) {
            // Prepare case study data
            $content = json_decode($serviceContent->sections_data, true);
            $formattedPageData[$serviceContent->language_code] = $content;

            // Prepare case study info
            $formattedPageInfo[$serviceContent->language_code] = [
                'title' => $serviceContent->title,
                'breadcrumb_title' => $serviceContent->breadcrumb_title,
                'header_action_button_text' => $serviceContent->header_action_button_text,
                'header_action_button_url' => $serviceContent->header_action_button_url,
                'meta_title' => $serviceContent->meta_title,
                'meta_tags' => $serviceContent->meta_tags,
                'meta_description' => $serviceContent->meta_description,
                'category' => $service->category_id,
                'meta_image' => $service->meta_image,
                'header_layout' => $service->header_layout,
                'footer_layout' => $service->footer_layout,
                'is_show_breadcrumb' => (bool) $service->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $service->is_show_shopping_cart,
                'breadcrumb_image' => $service->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    public function clone(Service $service)
    {
        $newService = $service->replicate();
        $newService->slug = $service->slug . '-' . Str::random(6);
        $newService->save();

        foreach ($service->contents as $content) {
            $newContent = $content->replicate();
            $newContent->service_id = $newService->id;
            $newContent->save();
        }
    }
}
