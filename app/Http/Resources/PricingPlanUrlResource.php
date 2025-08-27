<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PricingPlanUrlResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'text' => $this->content?->name,
            'price' => $this->price,
            'duration' => $this->content?->plan_duration,
            'url' => route('pricing.plan', ['pricing_plan' => $this->id]),
        ];
    }
}
