<?php

namespace App\Repositories\Admin;

use App\Models\Page;
use App\Models\PageContent;
use App\Models\Setting;
use App\Repositories\SettingRepository;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PageRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify posts table
     */
    protected Page $model;

    /**
     * Constructor for Page repository
     */
    public function __construct(Page $page)
    {
        $this->model = $page;
    }

    /**
     * Get pages
     */
    public function paginateSearchResult($search, array $sort, $lang): LengthAwarePaginator
    {
        $query = $this->model->with(['content', 'contents'])->newQuery();

        if ($search) {
            $query->orWhere('type', 'like', '%' . $search . '%')
                ->orWhereHas('contents', function ($pageContentQuery) use ($search) {
                    $pageContentQuery->where('title', 'like', '%' . $search . '%');
                });
        }

        if (Setting::pull('is_enabled_ecommerce') === '0') {
            $query->whereNotIn('rendered_page', ['shop', 'cart']);
        }

        if (isset($sort['column'])) {
            $query->orderBy($sort['column'], $sort['order']);
        }

        // sort post
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->join('page_contents', 'pages.id', '=', 'page_contents.page_id')
                    ->where('page_contents.language_code', app()->getLocale())
                    ->orderBy('page_contents.title', $order)
                    ->select('pages.*');
            } else {
                $query->orderBy($column, $order);
            }
        }

        return $query->paginate(30)->appends(array_filter([
            'search' => $search,
            'sort' => $sort,
            'filter' => [
                'lang' => $lang,
            ],
        ]));
    }

    /**
     * Store page
     */
    public function store(Request $request, SettingRepository $settingRepository): void
    {
        $default_lang = Setting::pull('default_lang');
        $page = Page::create([
            'slug' => Str::slug($request->pageInfo[$default_lang]['title']),
            'type' => 'custom',
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            PageContent::create([
                'page_id' => $page->id,
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
     * Update pages
     */
    public function updatePage(Request $request, Page $page, SettingRepository $settingRepository): void
    {
        $default_lang = Setting::pull('default_lang');
        $page->update([
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            PageContent::updateOrCreate(
                [
                    'page_id' => $page->id,
                    'language_code' => $key,
                ],
                [
                    'page_id' => $page->id,
                    'language_code' => $key,
                    'title' => $request->pageInfo[$key]['title'],
                    'breadcrumb_title' => $request->pageInfo[$key]['breadcrumb_title'],
                    'header_action_button_text' => $request->pageInfo[$key]['header_action_button_text'],
                    'header_action_button_url' => $request->pageInfo[$key]['header_action_button_url'],
                    'meta_title' => $request->pageInfo[$key]['meta_title'],
                    'meta_description' => $request->pageInfo[$key]['meta_description'],
                    'meta_tags' => $request->pageInfo[$key]['meta_tags'],
                    'sections_data' => json_encode($request->pageData[$key]),
                ]
            );
        }
    }

    /**
     * Upload file
     */
    public function uploadFile(Request $request): string
    {
        return Storage::url($request->file('file')->store('pages'));
    }

    /**
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $ids = explode(',', $request->ids);
        $this->model->whereIn('id', $ids)->where('type', '!=', 'regular')->delete();
    }

    /**
     * Update page slug
     */
    public function updateSlug(Request $request, Page $page)
    {
        $page->update(['slug' => $request->input('slug')]);
    }

    /**
     * Get page data
     */
    public function getPageData(Page $page): array
    {
        $page->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($page->contents as $pageContent) {
            // Prepare page data
            $content = json_decode($pageContent->sections_data, true);
            $formattedPageData[$pageContent->language_code] = $content;

            // Prepare page info
            $formattedPageInfo[$pageContent->language_code] = [
                'title' => $pageContent->title,
                'breadcrumb_title' => $pageContent->breadcrumb_title,
                'header_action_button_text' => $pageContent->header_action_button_text,
                'header_action_button_url' => $pageContent->header_action_button_url,
                'meta_title' => $pageContent->meta_title,
                'meta_description' => $pageContent->meta_description,
                'meta_tags' => $pageContent->meta_tags,
                'meta_image' => $page->meta_image,
                'is_show_breadcrumb' => (bool) $page->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $page->is_show_shopping_cart,
                'breadcrumb_image' => $page->breadcrumb_image,
                'header_layout' => $page->header_layout,
                'footer_layout' => $page->footer_layout,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    public function clone(Page $page)
    {
        $newPage = $page->replicate();
        $newPage->type = 'custom';
        $newPage->slug = $page->slug . '-' . Str::random(6);
        $newPage->save();

        foreach ($page->contents as $content) {
            $newContent = $content->replicate();
            $newContent->page_id = $newPage->id;
            $newContent->save();
        }

        return $newPage;
    }
}
