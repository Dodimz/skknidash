<?php

namespace App\Repositories\Admin;

use App\Models\Portfolio;
use App\Models\PortfolioCategoryContent;
use App\Models\PortfolioContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class PortfolioRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Portfolio $model;

    /**
     *  Constructor for Portfolio repository
     */
    public function __construct(Portfolio $portfolio)
    {
        $this->model = $portfolio;
    }

    /**
     * Get portfolios
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

        // Filter portfolio by category title
        if (isset($filter['category']) && $filter['category'] !== 'All Categories') {
            $query->whereHas('category.content', function ($categoryQuery) use ($filter) {
                $categoryQuery->where('title', $filter['category']);
            });
        }

        // sort portfolio
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(PortfolioContent::select($sort['column'])
                    ->whereColumn('portfolios.id', 'portfolio_contents.portfolio_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'sub_title') {
                $query->orderBy(PortfolioContent::select($sort['column'])
                    ->whereColumn('portfolios.id', 'portfolio_contents.portfolio_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
            } elseif ($column === 'category' || $column === 'category_title') {
                $query->orderBy(
                    PortfolioCategoryContent::select('title')
                        ->whereColumn('portfolio_category_contents.portfolio_category_id', 'portfolios.category_id')
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
     * Store portfolio
     *
     * @return void
     */
    public function store(Request $request)
    {
        $default_lang = Setting::pull('default_lang');

        $portfolio = $this->model->create([
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
            PortfolioContent::create([
                'portfolio_id' => $portfolio->id,
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
     * Portfolio update
     */
    public function update(Request $request, Portfolio $portfolio): void
    {
        $default_lang = Setting::pull('default_lang');
        $portfolio->update([
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
            PortfolioContent::updateOrCreate([
                'portfolio_id' => $portfolio->id,
                'language_code' => $key,
            ], [
                'portfolio_id' => $portfolio->id,
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
     * Delete portfolio
     */
    public function destroy(Portfolio $portfolio): void
    {
        $portfolio->delete();
    }

    /**
     * Update slug portfolio
     */
    public function updateSlug(Request $request, Portfolio $portfolio)
    {
        $portfolio->update(['slug' => $request->input('slug')]);
    }

    public function getPortfolioData(Portfolio $portfolio)
    {
        $portfolio->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($portfolio->contents as $portfolioContent) {
            // Prepare case study data
            $content = json_decode($portfolioContent->sections_data, true);
            $formattedPageData[$portfolioContent->language_code] = $content;

            // Prepare case study info
            $formattedPageInfo[$portfolioContent->language_code] = [
                'title' => $portfolioContent->title,
                'breadcrumb_title' => $portfolioContent->breadcrumb_title,
                'header_action_button_text' => $portfolioContent->header_action_button_text,
                'header_action_button_url' => $portfolioContent->header_action_button_url,
                'meta_title' => $portfolioContent->meta_title,
                'meta_description' => $portfolioContent->meta_description,
                'meta_tags' => $portfolioContent->meta_tags,
                'category' => $portfolio->category_id,
                'meta_image' => $portfolio->meta_image,
                'header_layout' => $portfolio->header_layout,
                'footer_layout' => $portfolio->footer_layout,
                'is_show_breadcrumb' => (bool) $portfolio->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $portfolio->is_show_shopping_cart,
                'breadcrumb_image' => $portfolio->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    public function clone(Portfolio $portfolio)
    {
        $newPortfolio = $portfolio->replicate();
        $newPortfolio->slug = $portfolio->slug . '-' . Str::random(6);
        $newPortfolio->save();

        foreach ($portfolio->contents as $content) {
            $newContent = $content->replicate();
            $newContent->portfolio_id = $newPortfolio->id;
            $newContent->save();
        }
    }
}
