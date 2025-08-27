<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubscribeRequest;
use App\Repositories\Admin\SubscribeRepository;
use Illuminate\Http\RedirectResponse;

class SubscribeController extends Controller
{
    /**
     * Subscribed
     */
    public function subscribe(SubscribeRequest $request, SubscribeRepository $repository): RedirectResponse
    {
        $repository->subscribe($request);

        return back()->with('success', 'Successfully subscribed');
    }
}
