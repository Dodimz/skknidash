<?php

namespace App\Repositories\Frontend;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function makeReview(Request $request, $productId)
    {
        $user = Auth::user();

        return Review::create([
            'product_id' => $productId,
            'user_id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'rating' => $request->rating,
            'review' => $request->review,
            'is_approved' => '0',
        ]);
    }
}
