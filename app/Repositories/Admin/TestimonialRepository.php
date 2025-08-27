<?php

namespace App\Repositories\Admin;

use App\Http\Requests\Admin\TestimonialStoreRequest;
use App\Http\Requests\Admin\TestimonialUpdateRequest;
use App\Models\Setting;
use App\Models\Testimonial;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class TestimonialRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify categories table
     */
    protected Testimonial $model;

    /**
     *  Constructor for testimonial repository
     */
    public function __construct(Testimonial $testimonial)
    {
        $this->model = $testimonial;
    }

    /**
     * Get testimonial
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('content')->newQuery();

        if ($search) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('name', 'like', '%'.$search.'%');
            });
        }

        // sort post
        $query->orderBy($sort['column'], $sort['order']);

        return $query->paginate(30)
            ->appends(array_filter([
                'search' => $search,
                'sort' => $sort,
                'lang' => app()->getLocale(),
            ]));
    }

    /**
     * Store testimonial
     */
    public function store(TestimonialStoreRequest $request): void
    {
        $testimonial = $this->model->create([
            'client_image' => $request->client_image,
            'rating_count' => $request->rating,
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'name' => $request[$langCode.'_client_name'],
                'designation' => $request[$langCode.'_client_designation'],
                'review_description' => $request[$langCode.'_description'],
            ];
        }, $languages);

        $testimonial->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(Testimonial $testimonial): array
    {
        $languages = json_decode(Setting::pull('languages'), true);
        $data = [
            'id' => $testimonial->id,
            'client_image' => $testimonial->client_image,
            'rating' => $testimonial->rating_count,
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode.'_client_name'] = '';
            $data[$langCode.'_client_designation	'] = '';
            $data[$langCode.'_description	'] = '';
        }

        foreach ($testimonial->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode.'_client_name'] = $content->name;
            $data[$langCode.'_client_designation'] = $content->designation;
            $data[$langCode.'_description'] = $content->review_description;
        }

        return $data;

    }

    /**
     * Update testimonial
     */
    public function update(TestimonialUpdateRequest $request, Testimonial $testimonial): void
    {
        $testimonial->update([
            'client_image' => $request->client_image,
            'rating_count' => $request->rating,
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $testimonial->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'name' => $request[$langCode.'_client_name'],
                    'designation' => $request[$langCode.'_client_designation'],
                    'review_description' => $request[$langCode.'_description'],
                ],
            );
        }
    }

    /**
     * Delete testimonial
     */
    public function destroy(Testimonial $testimonial): void
    {
        $testimonial->delete();
    }

    /**
     * Bulk testimonial delete
     */
    public function bulkDelete(Request $request): void
    {
        $idArray = explode(',', $request->ids);
        $this->model->destroy($idArray);
    }

    /**
     * Get testimonial data
     */
    public function getTestimonialData()
    {
        return [];
    }
}
