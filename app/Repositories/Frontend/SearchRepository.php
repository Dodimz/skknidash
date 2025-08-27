<?php

namespace App\Repositories\Frontend;

use App\Models\CaseStudy;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Service;
use App\Models\Team;
use Illuminate\Support\Facades\DB;

class SearchRepository
{
    protected Post $postModel;

    protected Page $pageModel;

    protected Portfolio $portfolioModel;

    protected Service $serviceModel;

    protected CaseStudy $caseStudyModel;

    protected Team $teamModel;

    public function __construct(Post $post, Page $page, Portfolio $portfolio, Service $service, CaseStudy $caseStudy, Team $team)
    {
        $this->postModel = $post;
        $this->pageModel = $page;
        $this->portfolioModel = $portfolio;
        $this->serviceModel = $service;
        $this->caseStudyModel = $caseStudy;
        $this->teamModel = $team;
    }

    public function searchResult($search)
    {
        if (empty($search)) {
            return collect();
        }

        // Search information
        $posts = $this->searchPosts($search);

        $pages = $this->searchPages($search);

        $portfolios = $this->searchPortfolios($search);

        $services = $this->searchServices($search);

        $caseStudies = $this->searchCaseStudies($search);

        $teams = $this->searchTeams($search);

        $products = $this->searchProducts($search);

        $result = $posts->concat($pages)->concat($portfolios)->concat($services)->concat($caseStudies)->concat($teams)->concat($products);

        $result->each(function ($item) {
            if (isset($item->post_id)) {
                $item->type = 'post';
                $item->route = 'blog';
                $item->id = $item->post_id;
            } elseif (isset($item->page_id)) {
                $item->type = 'page';
                $item->route = '';
                $item->id = $item->page_id;
            } elseif (isset($item->portfolio_id)) {
                $item->type = 'portfolio';
                $item->route = 'portfolio';
                $item->id = $item->portfolio_id;
            } elseif (isset($item->service_id)) {
                $item->type = 'service';
                $item->route = 'service';
                $item->id = $item->service_id;
            } elseif (isset($item->case_study_id)) {
                $item->type = 'caseStudy';
                $item->route = 'case-study';
                $item->id = $item->case_study_id;
            } elseif (isset($item->team_id)) {
                $item->type = 'team';
                $item->route = 'team';
                $item->id = $item->team_id;
            } elseif (isset($item->product_id)) {
                $item->type = 'product';
                $item->route = 'product';
                $item->id = $item->product_id;
            }
        });

        return $result;
    }

    private function searchPosts($search)
    {
        return DB::table('post_contents')
            ->join('posts', 'post_contents.post_id', '=', 'posts.id')
            ->where('post_contents.title', 'like', "%{$search}%")
            ->select('posts.id as post_id', 'posts.slug', 'post_contents.title', 'post_contents.language_code')
            ->get();
    }

    private function searchPages($search)
    {
        return DB::table('page_contents')
            ->join('pages', 'page_contents.page_id', '=', 'pages.id')
            ->where('page_contents.title', 'like', "%{$search}%")
            ->select('pages.id as page_id', 'pages.slug', 'page_contents.title', 'page_contents.language_code')
            ->get();
    }

    private function searchPortfolios($search)
    {
        return DB::table('portfolio_contents')
            ->join('portfolios', 'portfolio_contents.portfolio_id', '=', 'portfolios.id')
            ->where('portfolio_contents.title', 'like', "%{$search}%")
            ->select('portfolios.id as portfolio_id', 'portfolios.slug', 'portfolio_contents.title', 'portfolio_contents.language_code')
            ->get();
    }

    private function searchServices($search)
    {
        return DB::table('service_contents')
            ->join('services', 'service_contents.service_id', '=', 'services.id')
            ->where('service_contents.title', 'like', "%{$search}%")
            ->select('services.id as service_id', 'services.slug', 'service_contents.title', 'service_contents.language_code')
            ->get();
    }

    private function searchCaseStudies($search)
    {
        return DB::table('case_study_contents')
            ->join('case_studies', 'case_study_contents.case_study_id', '=', 'case_studies.id')
            ->where('case_study_contents.title', 'like', "%{$search}%")
            ->select('case_studies.id as case_study_id', 'case_studies.slug', 'case_study_contents.title', 'case_study_contents.language_code')
            ->get();
    }

    private function searchProducts($search)
    {
        return DB::table('product_contents')
            ->join('products', 'product_contents.product_id', '=', 'products.id')
            ->where('product_contents.title', 'like', "%{$search}%")
            ->select('products.id as product_id', 'products.slug', 'product_contents.title', 'product_contents.language_code')
            ->get();
    }


    private function searchTeams($search)
    {
        return DB::table('team_contents')
            ->join('teams', 'team_contents.team_id', '=', 'teams.id')
            ->where('team_contents.title', 'like', "%{$search}%")
            ->select('teams.id as team_id', 'teams.slug', 'team_contents.title', 'team_contents.language_code')
            ->get();
    }
}
