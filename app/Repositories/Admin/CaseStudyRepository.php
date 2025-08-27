<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudy;
use App\Models\CaseStudyCategoryContent;
use App\Models\CaseStudyContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class CaseStudyRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected CaseStudy $model;

    /**
     *  Constructor for Case Study repository
     */
    public function __construct(CaseStudy $caseStudy)
    {
        $this->model = $caseStudy;
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

        // Filter post by category title
        if (isset($filter['category']) && $filter['category'] !== 'All Categories') {
            $query->whereHas('category.content', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // sort case study
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(CaseStudyContent::select($sort['column'])
                    ->whereColumn('case_studies.id', 'case_study_contents.case_study_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    CaseStudyCategoryContent::select('title')
                        ->whereColumn('case_study_category_contents.case_study_category_id', 'case_studies.category_id')
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
     * Store case study
     */
    public function store(Request $request): void
    {
        $default_lang = Setting::pull('default_lang');
        $caseStudy = CaseStudy::create([
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
            CaseStudyContent::create([
                'case_study_id' => $caseStudy->id,
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
     * Update case study
     */
    public function update(Request $request, CaseStudy $caseStudy): void
    {
        $default_lang = Setting::pull('default_lang');
        $caseStudy->update([
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
            CaseStudyContent::updateOrCreate([
                'case_study_id' => $caseStudy->id,
                'language_code' => $key,
            ], [
                'case_study_id' => $caseStudy->id,
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
     * Bulk delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * Delete case study
     */
    public function destroy(CaseStudy $caseStudy): void
    {
        $caseStudy->delete();
    }

    /**
     * Case study slug update
     */
    public function updateSlug(Request $request, CaseStudy $caseStudy)
    {
        $caseStudy->update(['slug' => $request->input('slug')]);
    }

    /**
     * Get case study data
     */
    public function getCaseStudyData(CaseStudy $caseStudy): array
    {
        $caseStudy->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($caseStudy->contents as $caseStudyContent) {
            // Prepare case study data
            $content = json_decode($caseStudyContent->sections_data, true);
            $formattedPageData[$caseStudyContent->language_code] = $content;

            // Prepare case study info
            $formattedPageInfo[$caseStudyContent->language_code] = [
                'title' => $caseStudyContent->title,
                'breadcrumb_title' => $caseStudyContent->breadcrumb_title,
                'header_action_button_text' => $caseStudyContent->header_action_button_text,
                'header_action_button_url' => $caseStudyContent->header_action_button_url,
                'meta_title' => $caseStudyContent->meta_title,
                'meta_description' => $caseStudyContent->meta_description,
                'meta_tags' => $caseStudyContent->meta_tags,
                'category' => $caseStudy->category_id,
                'meta_image' => $caseStudy->meta_image,
                'header_layout' => $caseStudy->header_layout,
                'footer_layout' => $caseStudy->footer_layout,
                'is_show_breadcrumb' => (bool) $caseStudy->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $caseStudy->is_show_shopping_cart,
                'breadcrumb_image' => $caseStudy->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    public function clone(CaseStudy $caseStudy)
    {
        $newCaseStudy = $caseStudy->replicate();
        $newCaseStudy->slug = $caseStudy->slug . '-' . Str::random(6);
        $newCaseStudy->save();

        foreach ($caseStudy->contents as $content) {
            $newContent = $content->replicate();
            $newContent->case_study_id = $newCaseStudy->id;
            $newContent->save();
        }
    }
}
