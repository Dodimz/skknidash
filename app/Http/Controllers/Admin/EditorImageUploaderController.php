<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class EditorImageUploaderController extends Controller
{
    /**
     * Upload editor file
     *
     * @return string
     */
    public function upload(Request $request)
    {
        return Storage::url($request->file('files')->store('editor'));
    }
}
