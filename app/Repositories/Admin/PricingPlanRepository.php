<?php

namespace App\Repositories\Admin;

use App\Models\PricingPlan;
use App\Models\PricingPlanContent;
use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class PricingPlanRepository
{
    use ModelRepositoryTraits;

    /**
     * Object model will be used to modify pricingPlan table
     */
    protected PricingPlan $model;

    /**
     * Constructor for PricingPlan repository
     */
    public function __construct(PricingPlan $pricingPlan)
    {
        $this->model = $pricingPlan;
    }

    /**
     * Get search result with paginate
     */
    public function paginateSearchResult($search, array $sort = []): LengthAwarePaginator
    {
        $query = $this->model->with('currency', 'content')->newQuery();

        // search pricing plan
        if (isset($search)) {
            $query->whereHas('contents', function ($q) use ($search) {
                $q->where('language_code', app()->getLocale())
                    ->where('name', 'like', '%' . $search . '%');
            });
        }

        // sort pricing plan
        if (isset($sort['column'])) {
            if ($sort['column'] == 'name' || $sort['column'] == 'plan_duration') {
                $query->orderBy(
                    PricingPlanContent::select($sort['column'])
                        ->whereColumn('pricing_plans.id', 'pricing_plan_contents.pricing_plan_id')
                        ->where('language_code', app()->getLocale()),
                    $sort['order']
                );
            } else {
                $query->orderBy($sort['column'], $sort['order']);
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
     * Create pricingPlan
     */
    public function create(Request $request): void
    {
        $plan = $this->model->create([
            'price' => $request->input('price'),
            'currency_id' => $request->input('select_currency'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        $content = array_map(function ($language) use ($request) {
            $langCode = $language['code'];

            return [
                'language_code' => $langCode,
                'name' => $request[$langCode . '_name'],
                'plan_duration' => $request[$langCode . '_plan_duration'],
                'subtitle' => $request[$langCode . '_subtitle'],
                'plan_features' => json_encode($request[$langCode . '_plan_features']),
            ];
        }, $languages);

        $plan->contents()->createMany($content);
    }

    /**
     * Get edited data
     */
    public function getEditData(PricingPlan $pricingPlan): array
    {
        $languages = json_decode(Setting::pull('languages'), true);
        $data = [
            'id' => $pricingPlan->id,
            'select_currency' => $pricingPlan->currency_id,
            'price' => $pricingPlan->price,
            'created_at' => $pricingPlan->created_at,
        ];

        foreach ($languages as $language) {
            $langCode = $language['code'];
            $data[$langCode . '_name'] = '';
            $data[$langCode . '_plan_duration'] = '';
            $data[$langCode . '_subtitle'] = '';
            $data[$langCode . '_plan_features'] = '';
        }

        foreach ($pricingPlan->contents as $content) {
            $langCode = $content->language_code;
            $data[$langCode . '_name'] = $content->name;
            $data[$langCode . '_plan_duration'] = $content->plan_duration;
            $data[$langCode . '_subtitle'] = $content->subtitle;
            $data[$langCode . '_plan_features'] = json_decode($content->plan_features);
        }

        return $data;
    }

    /**
     * Update pricingPlan
     */
    public function update(Request $request, PricingPlan $pricingPlan)
    {
        $pricingPlan->update([
            'price' => $request->input('price'),
            'currency_id' => $request->input('select_currency'),
        ]);

        $languages = json_decode(Setting::pull('languages'), true);
        foreach ($languages as $language) {
            $langCode = $language['code'];

            $pricingPlan->contents()->updateOrCreate(
                ['language_code' => $langCode],
                [
                    'name' => $request[$langCode . '_name'],
                    'plan_duration' => $request[$langCode . '_plan_duration'],
                    'subtitle' => $request[$langCode . '_subtitle'],
                    'plan_features' => json_encode($request[$langCode . '_plan_features']),
                ],
            );
        }
    }

    /**
     * Delete pricingPlan
     */
    public function destroy(PricingPlan $pricingPlan)
    {
        $pricingPlan->delete();
    }

    /**
     * Bulk delete pricingPlans
     */
    public function bulkDelete($ids): void
    {
        $idArray = explode(',', $ids);
        $this->model->destroy($idArray);
    }
}
