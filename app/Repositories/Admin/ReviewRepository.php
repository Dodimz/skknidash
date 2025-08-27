<?php

namespace App\Repositories\Admin;

use App\Models\Review;

class ReviewRepository
{
    /**
     * Object model will be used to modify reviews table
     */
    protected Review $model;

    /**
     * Constructor for review repository
     */
    public function __construct(Review $review)
    {
        $this->model = $review;
    }

    /**
     * Review approved
     */
    public function approved(Review $review): void
    {
        $review->update(['is_approved' => '1']);
    }

    /**
     * Review unApproved
     */
    public function unApproved(Review $review): void
    {
        $review->update(['is_approved' => '0']);
    }
}
