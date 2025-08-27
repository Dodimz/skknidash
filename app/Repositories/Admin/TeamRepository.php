<?php

namespace App\Repositories\Admin;

use App\Models\Setting;
use App\Models\Team;
use App\Models\TeamContent;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class TeamRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Team $model;

    /**
     *  Constructor for Team repository
     */
    public function __construct(Team $team)
    {
        $this->model = $team;
    }

    /**
     * Get services
     *
     * @param  array  $filter
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('title', 'like', '%' . $search . '%');
            });
        }

        // sort post
        if (isset($sort['column']) && isset($sort['order'])) {
            $column = $sort['column'];
            $order = $sort['order'];

            if ($column === 'title') {
                $query->orderBy(TeamContent::select($sort['column'])
                    ->whereColumn('teams.id', 'team_contents.team_id')
                    ->where('language_code', app()->getLocale()), $sort['order']);
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
     * Store team
     */
    public function store(Request $request): void
    {
        $default_lang = Setting::pull('default_lang');
        $team = Team::create([
            'slug' => Str::slug($request->pageInfo[$default_lang]['title']),
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            TeamContent::create([
                'team_id' => $team->id,
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
     * Update team
     */
    public function update(Request $request, Team $team): void
    {
        $default_lang = Setting::pull('default_lang');
        $team->update([
            'is_show_breadcrumb' => $request->pageInfo[$default_lang]['is_show_breadcrumb'] ? '1' : '0',
            'is_show_shopping_cart' => $request->pageInfo[$default_lang]['is_show_shopping_cart'] ? '1' : '0',
            'breadcrumb_image' => $request->pageInfo[$default_lang]['breadcrumb_image'],
            'header_layout' => $request->pageInfo[$default_lang]['header_layout'],
            'footer_layout' => $request->pageInfo[$default_lang]['footer_layout'],
            'sections' => json_encode($request->customizeSections),
            'meta_image' => $request->pageInfo[$default_lang]['meta_image'],
        ]);

        foreach ($request->pageData as $key => $value) {
            TeamContent::updateOrCreate(
                [
                    'team_id' => $team->id,
                    'language_code' => $key,
                ],
                [
                    'team_id' => $team->id,
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
     * Delete team
     */
    public function destroy(Team $team): void
    {
        $team->delete();
    }

    /**
     * Bulk team delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    public function getTeamData(Team $team)
    {
        $team->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($team->contents as $teamContent) {
            $content = json_decode($teamContent->sections_data, true);
            $formattedPageData[$teamContent->language_code] = $content;
            $formattedPageInfo[$teamContent->language_code] = [
                'title' => $teamContent->title,
                'breadcrumb_title' => $teamContent->breadcrumb_title,
                'header_action_button_text' => $teamContent->header_action_button_text,
                'header_action_button_url' => $teamContent->header_action_button_url,
                'meta_title' => $teamContent->meta_title,
                'meta_description' => $teamContent->meta_description,
                'meta_tags' => $teamContent->meta_tags,
                'meta_image' => $team->meta_image,
                'header_layout' => $team->header_layout,
                'footer_layout' => $team->footer_layout,
                'is_show_breadcrumb' => (bool) $team->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $team->is_show_shopping_cart,
                'breadcrumb_image' => $team->breadcrumb_image,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }

    /**
     * team slug update
     */
    public function updateSlug(Request $request, Team $team)
    {
        $team->update(['slug' => $request->input('slug')]);
    }

    public function clone(Team $team)
    {
        $newTeam = $team->replicate();
        $newTeam->slug = $team->slug . '-' . Str::random(6);
        $newTeam->save();

        foreach ($team->contents as $content) {
            $newContent = $content->replicate();
            $newContent->team_id = $newTeam->id;
            $newContent->save();
        }
    }
}
