<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\DashboardRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(DashboardRepository $repository)
    {
        $data['post_count'] = $repository->getPostCount();
        $data['service_count'] = $repository->getServiceCount();
        $data['portfolio_count'] = $repository->getPortfolioCount();
        $data['case_study_count'] = $repository->getCaseStudyCount();
        $data['comment_count'] = $repository->getCommentCount();
        $data['user_count'] = $repository->getUserCount();
        $data['subscriber_count'] = $repository->getSubscribeCount();
        $data['form_response_count'] = $repository->getFormResponseCount();
        $data['latest_form_responses'] = $repository->getLatestFormResponses();
        $data['latest_comments'] = $repository->getLatestComments();

        return Inertia::render('Dashboard', $data);
    }

    public function test()
    {
        return redirect()->back()->with('success', 'Hello');
    }
}
