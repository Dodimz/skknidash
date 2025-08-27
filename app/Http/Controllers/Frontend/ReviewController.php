<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\ReviewStoreRequest;
use App\Models\OrderItem;
use App\Models\Review;
use App\Models\Setting;
use App\Repositories\Frontend\ReviewRepository;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReviewController extends Controller
{
    public function index()
    {
        if (Setting::pull("is_enabled_ecommerce") === "0") {
            abort(404);
        }

        $userId = Auth::id();

        $purchasedProducts = OrderItem::query()
            ->select('order_items.product_id', 'order_items.product_name', 'order_items.product_image')
            ->join('orders', 'order_items.order_id', '=', 'orders.id')
            ->where('orders.user_id', $userId)
            ->where('orders.payment_status', '2')
            ->distinct('order_items.product_id')
            ->paginate(10);

        $userReviews = Review::where('user_id', $userId)
            ->select('product_id', 'rating', 'is_approved')
            ->get()
            ->keyBy('product_id');

        $purchasedProducts->getCollection()->transform(function ($product) use ($userReviews) {
            $product->already_reviewed = isset($userReviews[$product->product_id]);

            if ($product->already_reviewed) {
                $product->rating = $userReviews[$product->product_id]->rating;
                $product->is_approved = $userReviews[$product->product_id]->is_approved;
            } else {
                $product->rating = 0;
                $product->is_approved = false;
            }

            return $product;
        });

        return Inertia::render('User/Reviews/Index', [
            'products' => $purchasedProducts,
        ]);
    }

    public function makeReview(ReviewStoreRequest $request, $productId, ReviewRepository $repository)
    {
        $repository->makeReview($request, $productId);

        return redirect()->route('user.review.index')->with('success', 'Review submitted successfully');
    }
}
