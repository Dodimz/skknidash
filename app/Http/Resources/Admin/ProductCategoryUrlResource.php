<?php

namespace App\Http\Resources\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductCategoryUrlResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'text' => $this->content?->title,
            'url' => $this->generateCategoryUrl(),
        ];
    }

    protected function generateCategoryUrl(): string
    {
        return url('/shop') . '?' . http_build_query([
            'filter' => [
                'category' => $this->content?->title ?? '',
                'tag' => '',
                'type' => '',
                'min_price' => '0',
                'max_price' => '',
                'sort' => 'latest',
            ],
            'search' => '',
        ]);
    }
}
