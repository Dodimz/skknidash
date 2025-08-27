<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Setting;
use App\Repositories\Admin\ReviewRepository;
use Inertia\Inertia;

class ReviewController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['approved', 'unApproved']]);
    }

    public function index()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $data['reviews'] = Review::with('product.content')
            ->orderBy('id', 'desc')
            ->paginate(10);
        return Inertia::render('Products/Reviews/Index', $data);
    }

    /**
     * Approved Review
     */
    public function approved(Review $review, ReviewRepository $repository)
    {
        $repository->approved($review);
        return back()->with('success', 'Review successfully approved!');
    }

    /**
     * Un Approved Review
     */
    public function unApproved(Review $review, ReviewRepository $repository)
    {
        $repository->unApproved($review);
        return back()->with('success', 'Review successfully un-approved!');
    }
}
