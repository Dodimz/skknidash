<?php

use App\Http\Controllers\Frontend\ProfileController;
use App\Http\Controllers\Frontend\ReviewController;
use App\Http\Controllers\Frontend\TicketController;
use App\Http\Controllers\Frontend\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/user/dashboard');

Route::get('/dashboard', [UserController::class, 'dashboard'])->name('dashboard');
Route::get('/profile', [UserController::class, 'profile'])->name('profile.edit');
Route::put('/profile-update/{user}', [UserController::class, 'update'])->name('profile.update');

// orders
Route::get('/order', [UserController::class, 'orders'])->name('orders');
Route::get('/download-invoice/{order}', [UserController::class, 'downloadInvoice'])->name('download.invoice');

// Review routes
Route::group(['prefix' => '/review', 'as' => 'review.'], function () {
    Route::get('/', [ReviewController::class, 'index'])->name('index');
    Route::get('/{productId}', [ReviewController::class, 'reviewShow'])->name('show');
    Route::post('/{productId}/make', [ReviewController::class, 'makeReview'])->name('make');
});

//support ticket
Route::group(['prefix' => 'tickets', 'as' => 'tickets.'], function () {
    Route::get('/', [TicketController::class, 'index'])->name('index');
    Route::get('/open-ticket', [TicketController::class, 'create'])->name('create');
    Route::post('/store', [TicketController::class, 'store'])->name('store');
    Route::get('/reply/{ticket}', [TicketController::class, 'reply'])->name('reply');
    Route::post('/reply/{ticket}', [TicketController::class, 'submitReply'])->name('submit.reply');
});

Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {
    Route::get('/change-password', [ProfileController::class, 'changePassword'])->name('change.password');
    Route::patch('/update-password', [ProfileController::class, 'updatePassword'])->name('update.password');
});
