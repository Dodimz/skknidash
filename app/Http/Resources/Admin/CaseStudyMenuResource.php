<?php

namespace App\Http\Resources\Admin;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CaseStudyMenuResource extends ResourceCollection
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $result = [];
        $languages = json_decode(Setting::pull('languages'), true);

        foreach ($languages as $lang) {
            $result[$lang['code']] = [];
        }

        foreach ($this->collection as $caseStudy) {
            foreach ($caseStudy->contents as $content) {
                $language = $content->language_code;
                if (! isset($result[$language])) {
                    $result[$language] = [];
                }
                $result[$language][] = [
                    'name' => $content->title,
                    'url' => route('case.study.show', $caseStudy->slug),
                    'type' => 'Case Study',
                ];
            }
        }

        return $result;
    }
}
