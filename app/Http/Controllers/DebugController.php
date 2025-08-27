<?php

namespace App\Http\Controllers;

use App\Models\CaseStudy;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Team;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class DebugController extends Controller
{
    public function any()
    {
        $main_menu = Setting::pull('main_menu');
        $newDomain = request()->getHost();
        $this->replaceDomainPaths(json_decode($main_menu, true), "bione-laravel.laralink.com", $newDomain);

        // update page
        Page::with('contents')->each(function ($page) {
            $page->contents->each(function ($content) {
                $contentData = $content->toArray();
                $newDomain = request()->getHost();
                $contentData['sections_data'] = $this->replaceDomainPaths($contentData['sections_data'], "bione-laravel.laralink.com", $newDomain);
                $content->update($contentData);
            });
        });

        // update portfolio
        Portfolio::with('contents')->each(function ($portfolio) {
            $portfolio->contents->each(function ($content) {
                $contentData = $content->toArray();
                $newDomain = request()->getHost();
                $contentData['sections_data'] = $this->replaceDomainPaths($contentData['sections_data'], "bione-laravel.laralink.com", $newDomain);
                $content->update($contentData);
            });
        });

        // service update
        Service::with('contents')->each(function ($service) {
            $service->contents->each(function ($content) {
                $contentData = $content->toArray();
                $newDomain = request()->getHost();
                $contentData['sections_data'] = $this->replaceDomainPaths($contentData['sections_data'], "bione-laravel.laralink.com", $newDomain);
                $content->update($contentData);
            });
        });

        // case study update
        CaseStudy::with('contents')->each(function ($caseStudy) {
            $caseStudy->contents->each(function ($content) {
                $contentData = $content->toArray();
                $newDomain = request()->getHost();
                $contentData['sections_data'] = $this->replaceDomainPaths($contentData['sections_data'], "bione-laravel.laralink.com", $newDomain);
                $content->update($contentData);
            });
        });

        // Team update
        Team::with('contents')->each(function ($team) {
            $team->contents->each(function ($content) {
                $contentData = $content->toArray();
                $newDomain = request()->getHost();
                $contentData['sections_data'] = $this->replaceDomainPaths($contentData['sections_data'], "bione-laravel.laralink.com", $newDomain);
                $content->update($contentData);
            });
        });
    }

    /**
     * Recursively replace all URLs with a specific domain.
     *
     * @param mixed $data
     * @param string $oldDomain
     * @param string $newDomain
     * @return mixed
     */
    private function replaceDomainPaths($data, string $oldDomain, string $newDomain)
    {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = $this->replaceDomainPaths($value, $oldDomain, $newDomain);
            }
        } elseif (is_string($data) && str_contains($data, $oldDomain)) {
            $data = str_replace("https://{$oldDomain}", "https://{$newDomain}", $data);
        }

        return $data;
    }
}
