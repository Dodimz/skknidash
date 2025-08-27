<?php

// use App\Http\Controllers\Debug\DebugController;

use App\Http\Controllers\DebugController;
use App\Http\Controllers\Frontend\BlogController;
use App\Http\Controllers\Frontend\CaseStudyController;
use App\Http\Controllers\Frontend\CheckoutController;
use App\Http\Controllers\Frontend\ContactController;
use App\Http\Controllers\Frontend\FormResponseController;
use App\Http\Controllers\Frontend\PageController;
use App\Http\Controllers\Frontend\PaymentController;
use App\Http\Controllers\Frontend\PortfolioController;
use App\Http\Controllers\Frontend\PricingPlanController;
use App\Http\Controllers\Frontend\ProductController;
use App\Http\Controllers\Frontend\ProfileController;
use App\Http\Controllers\Frontend\ReviewController;
use App\Http\Controllers\Frontend\SearchController;
use App\Http\Controllers\Frontend\ServiceController;
use App\Http\Controllers\Frontend\SettingsController;
use App\Http\Controllers\Frontend\SubscribeController;
use App\Http\Controllers\Frontend\TeamController;
use App\Http\Controllers\Frontend\TicketController;
use App\Http\Controllers\Frontend\UserController;
use App\Models\Setting;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', [PageController::class, 'home'])->name('home');
Route::redirect('/', '/admin')->name('home');

Route::redirect('/admin', '/admin/dashboard');

Route::get('debug', [DebugController::class, 'any']);

Route::get('/payment/success/{order}', [PaymentController::class, 'paymentSuccess'])->name('payment.success.page');
Route::get('/order/success/{order}', [PaymentController::class, 'orderSuccess'])->name('order.success.page');
Route::get('/payment/cancel', [PaymentController::class, 'paymentCancel'])->name('payment.cancel.page');

// Frontend search routes
Route::get('/search', [SearchController::class, 'index'])->name('search.name');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// frontend blog routes
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/comment', [BlogController::class, 'comment'])->name('blog.comment');

// services routes
Route::get('/service/{slug}', [ServiceController::class, 'show'])->name('service.show');

// teams routes
Route::get('/team/{slug}', [TeamController::class, 'show'])->name('team.show');

// portfolio route
Route::get('/portfolio/{slug}', [PortfolioController::class, 'show'])->name('portfolio.show');

// case study route
Route::get('/case-study/{slug}', [CaseStudyController::class, 'show'])->name('case.study.show');
Route::get('/change-language/{lang}', [SettingsController::class, 'changeLang'])->name('change.lang');

// pricing plan
Route::get('/pricing-plans', [PricingPlanController::class, 'index'])->name('pricing.plan.index');
Route::get('/pricing-plan/{pricing_plan}', [PricingPlanController::class, 'show'])->name('pricing.plan');
Route::post('/pricing-plan/{pricing_plan}/pay', [PricingPlanController::class, 'pay'])->name('pricing.pay');

//User
Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
Route::put('/profile-update/{user}', [UserController::class, 'update'])->name('profile.update');

//support ticket
Route::group(['prefix' => 'tickets', 'as' => 'tickets.'], function () {
    Route::get('/', [TicketController::class, 'index'])->name('index');
    Route::get('/open-ticket', [TicketController::class, 'create'])->name('create');
    Route::post('/store', [TicketController::class, 'store'])->name('store');
    Route::get('/reply/{ticket}', [TicketController::class, 'reply'])->name('reply');
    Route::post('/reply/{ticket}', [TicketController::class, 'submitReply'])->name('submit.reply');
});

//product routes
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('shop.show');

// orders
Route::get('/order', [UserController::class, 'orders'])->name('orders');
Route::get('/download-invoice/{order}', [UserController::class, 'downloadInvoice'])->name('download.invoice');

// Review routs
Route::group(['prefix' => '/review', 'as' => 'review.'], function () {
    Route::get('/', [ReviewController::class, 'index'])->name('index');
    Route::get('/{productId}', [ReviewController::class, 'reviewShow'])->name('show');
    Route::post('/{productId}/make', [ReviewController::class, 'makeReview'])->name('make');
});

// Checkout
Route::get('/checkout', [CheckoutController::class, 'checkout'])->name('checkout.index')->middleware('checkAllowGuestCheckout');
Route::post('/checkout', [CheckoutController::class, 'placeOrder'])->name('checkout.store')->middleware('checkAllowGuestCheckout');

// pages route
Route::get('/{slug}', [PageController::class, 'show'])->name('pages.show');

// subscribe
Route::post('/subscribe', [SubscribeController::class, 'subscribe'])->name('subscribe');

// contact
Route::post('/contact', [ContactController::class, 'submitContact'])->name('contact');

// form
Route::post('/form-store', [FormResponseController::class, 'store'])->name('form.submit');

// Apply Coupon
Route::post('/apply/coupon', [CheckoutController::class, 'applyCoupon'])->name('apply.coupon');

// payment gateway related route
Route::any('payment/{method}/cancel', [PaymentController::class, 'cancelCallback'])->name('payment.cancel');
Route::any('payment/{method}/success', [PaymentController::class, 'successCallback'])->name('payment.success');
Route::get('payment/razorpay/pay', [PaymentController::class, 'razorpayPay'])->name('payment.razorpay.pay');

// custom css
Route::get('custom/css', function () {
    // Generate the CSS content dynamically
    $cssContent = view('custom-css')->render();
    // Set the content type as CSS
    $response = Response::make($cssContent);
    $response->header('Content-Type', 'text/css');

    return $response;
})->name('custom.css');
