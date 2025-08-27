<?php

namespace App\Repositories\Admin;

use App\Models\CaseStudy;
use App\Models\Comment;
use App\Models\FormResponse;
use App\Models\Portfolio;
use App\Models\Post;
use App\Models\Service;
use App\Models\Subscriber;
use App\Models\User;

class DashboardRepository
{
    /**
     * Get post count
     */
    public function getPostCount(): mixed
    {
        return Post::count();
    }

    /**
     * Get service count
     */
    public function getServiceCount(): mixed
    {
        return Service::count();
    }

    /**
     * Get portfolio count
     */
    public function getPortfolioCount(): mixed
    {
        return Portfolio::count();
    }

    /**
     * Get case study count
     */
    public function getCaseStudyCount(): mixed
    {
        return CaseStudy::count();
    }

    /**
     * Get comment count
     */
    public function getCommentCount(): mixed
    {
        return Comment::count();
    }

    /**
     * Get subscriber count
     */
    public function getSubscribeCount(): mixed
    {
        return Subscriber::count();
    }

    /**
     * Get contact count
     */
    public function getFormResponseCount(): mixed
    {
        return FormResponse::count();
    }

    public function getUserCount(): mixed
    {
        return User::count();
    }

    /**
     * Get latest contacts
     */
    public function getLatestFormResponses(): mixed
    {
        return FormResponse::latest()->limit(10)->get();
    }

    /**
     * Get latest comments
     */
    public function getLatestComments(): mixed
    {
        return Comment::latest()->limit(10)->get();
    }
}
