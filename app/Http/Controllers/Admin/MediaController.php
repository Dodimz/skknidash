<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MediaController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['destroy']]);
    }

    public function index()
    {
        return Inertia::render('Media/Index');
    }

    /**
     * Display a listing of the resource.
     */
    public function getMediaData(Request $request): LengthAwarePaginator
    {
        $date = $request->filter['date'];
        $type = $request->filter['type'];

        $query = Media::query();
        if ($request->search) {
            $query->where('title', 'LIKE', '%' . $request->search . '%');
        }
        if ($date) {
            $query->where(DB::raw('DATE_FORMAT(created_at, "%b %Y")'), $date);
        }
        if ($type) {
            switch ($type) {
                case 'images':
                    $query->where('type', 'LIKE', 'image/%');
                    break;
                case 'video':
                    $query->where('type', 'LIKE', 'video/%');
                    break;
                case 'audio':
                    $query->where('type', 'LIKE', 'audio/%');
                    break;
                case 'pdf':
                    $query->where('type', 'application/pdf');
                    break;
                case 'text':
                    $query->where('type', 'LIKE', 'text/%');
                    break;
                case 'code':
                    $query->where('type', 'application/javascript')
                        ->orWhere('type', 'application/json')
                        ->orWhere('type', 'application/xml')
                        ->orWhere('type', 'text/html')
                        ->orWhere('type', 'text/css');
                    break;
                case 'zip':
                    $query->where('type', 'application/zip');
                    break;
                case 'spreadsheet':
                    $query->where('type', 'application/vnd.ms-excel')
                        ->orWhere('type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                        ->orWhere('type', 'application/vnd.oasis.opendocument.spreadsheet')
                        ->orWhere('type', 'application/vnd.ms-excel.sheet.macroenabled.12')
                        ->orWhere('type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.template');
                    break;
            }
        }

        return $query->latest()->paginate(72);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $file = $request->file('file');

        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $fileType = $file->getMimeType();
        $imageDimensions = null;
        // Check if the file is an image but not an SVG
        if (str_starts_with($fileType, 'image') && $fileType !== 'image/svg+xml') {
            // Get image dimensions
            $dimensions = getimagesize($file->getPathname());
            if ($dimensions) {
                $imageDimensions = $dimensions[0] . ' x ' . $dimensions[1] . ' pixels';
            }
        }
        $path = $file->store('media');
        $media = Media::create([
            'title' => $fileName,
            'user_id' => Auth::id(),
            'media_url' => $path,
            'type' => $fileType,
            'dimensions' => $imageDimensions,
            'size' => $fileSize,
            'driver' => config('filesystems.default'),
        ]);

        return $media;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Media $media): bool
    {
        $media->delete();

        return true;
    }

    /**
     * Get filterede data.
     *
     * @param  Media  $media
     */
    public function getFilteredMonthYear(): mixed
    {
        $dates = Cache::remember('filtered_month_year', now()->addDays(15), function () {
            return DB::table(DB::raw('(SELECT DISTINCT DATE_FORMAT(created_at, "%b %Y") as month_year FROM media) as sub'))
                ->orderBy('sub.month_year', 'desc')
                ->pluck('month_year')
                ->toArray();
        });

        return $dates;
    }
}
