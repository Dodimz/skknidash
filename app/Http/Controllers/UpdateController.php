<?php

namespace App\Http\Controllers;

use App\Models\Media;
use App\Models\Page;
use App\Models\PageContent;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class UpdateController extends Controller
{
    public function update()
    {
        $sql_path = base_path('update.sql');
        if (file_exists($sql_path)){
            DB::unprepared(file_get_contents($sql_path));
            // copy language file
            $language = json_decode(Setting::pull('languages'), true);
            $directory = base_path('lang/');
            $newData = base_path('lang.json');
            $newLangData = json_decode(File::get($newData), true);
            foreach ($language as $key => $lang){
                $path = $directory.$key.'.json';
                $existingData = [];
                if (File::exists($path)) {
                    $existingData = json_decode(File::get($path), true);
                }
                $mergedData = array_merge($existingData, $newLangData);
                File::put($path, json_encode($mergedData, JSON_PRETTY_PRINT));
            }
            $this->createPage();
            $this->handleMedia();
            // Delete the update.sql file
            unlink($sql_path);
            unlink($newData);
            // create symlink
            Artisan::call('storage:link');
            Artisan::call('optimize:clear');
            return redirect('/');
        }
    }

    private function createPage()
    {
        $pagePath = base_path('page.json');
        $pageData = json_decode(File::get($pagePath), true);
        foreach ($pageData as $value){
            $page = Page::create([
                'slug' => $value['slug'],
                'type' => $value['type'],
                'sections' => $value['sections'],
                'is_show_breadcrumb' => $value['is_show_breadcrumb'],
                'is_show_shopping_cart' => $value['is_show_shopping_cart'],
                'header_layout' => $value['header_layout'],
                'footer_layout' => $value['footer_layout'],
            ]);


            $language = json_decode(Setting::pull('languages'), true);
            foreach ($language as $key => $lang){
                PageContent::create([
                    'page_id' => $page->id,
                    'language_code' => $key,
                    'title' => $value['title'],
                    'header_action_button_text' => $value['header_action_button_text'],
                    'header_action_button_url' => $value['header_action_button_url'],
                    'meta_title' => $value['meta_title'],
                    'meta_description' => $value['meta_description'],
                    'sections_data' => $value['sections_data'],
                ]);
            }
        }
        unlink($pagePath);
    }

    private function handleMedia()
    {
        $mediaPath = base_path('new-media/media-export.json');
        $mediaData = json_decode(File::get($mediaPath), true);
        $filteredData = array_map(function ($item) {
            unset($item['full_url']);
            unset($item['created_at']);
            unset($item['updated_at']);
            unset($item['id']);
            return $item;
        }, $mediaData);
        Media::insert($filteredData);
        foreach ($filteredData as $media) {
            $mediaName = basename($media['media_url']);
            $sourcePath = base_path('new-media/' . $mediaName);
            $destinationPath = storage_path('app/public/media/' . $mediaName);

            if (File::exists($sourcePath)) {
                // Ensure target directory exists
                File::ensureDirectoryExists(storage_path('app/public/media'));

                // Move or copy the file
                File::copy($sourcePath, $destinationPath);
            } else {
                logger()->warning("File not found: " . $sourcePath);
            }
        }
        File::deleteDirectory(base_path('new-media'));
    }
}
