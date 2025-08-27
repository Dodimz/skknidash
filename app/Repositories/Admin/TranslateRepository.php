<?php

namespace App\Repositories\Admin;

use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class TranslateRepository
{
    use ModelRepositoryTraits;

    /**
     * Update language data.
     *
     * @param  \Illuminate\Http\Request  $request  The request containing language data.
     * @param  string  $language  The language language.
     */
    public function updateLangData(Request $request, $language)
    {
        $data = $request->values;
        if ($data) {
            $file = json_encode($data, JSON_PRETTY_PRINT);
            File::put(base_path('lang/'.$language.'.json'), $file);
        }

        if (isset($request->values) && is_array($request->values)) {
            $file = json_encode($request->values, JSON_PRETTY_PRINT);
            File::put(base_path('lang/'.$language.'.json'), $file);
        }

        $file = base_path('lang/'.$language.'.json');
        $posts = file_get_contents($file);

        if ($posts === false) {
            return back()->with('error', 'Failed to read language file!');
        }

        $data = json_decode($posts, true);

        if ($data === null) {
            return back()->with('error', 'Failed to decode JSON content');
        }

        foreach ($request->values as $key => $value) {
            $data[$key] = $value;
        }

        $updateContent = json_encode($data, JSON_PRETTY_PRINT);

        try {
            file_put_contents($file, $updateContent);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update language file!');
        }
    }

    public function autoTranslateFromFile($sourceLang, $targetLang, $key)
    {
        $sourceFile = base_path("lang/{$sourceLang}.json");
        $targetFile = base_path("lang/{$targetLang}.json");

        if (! File::exists($sourceFile)) {
            return back()->with('error', "Source language file '{$sourceLang}.json' not found.");
        }

        $sourceContent = File::get($sourceFile);
        $sourceData = json_decode($sourceContent, true);

        if (! is_array($sourceData) || ! isset($sourceData[$key])) {
            return back()->with('error', "Key '{$key}' not found in source file.");
        }

        $valueToTranslate = $sourceData[$key];

        $translatedText = $this->translateText($valueToTranslate, $sourceLang, $targetLang);

        // Load existing translations (or create a new array)
        $targetData = [];
        if (File::exists($targetFile)) {
            $targetContent = File::get($targetFile);
            $targetData = json_decode($targetContent, true) ?? [];
        }

        // Add or update translation
        $targetData[$key] = $translatedText;

        try {
            File::put($targetFile, json_encode($targetData, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        } catch (\Exception $e) {
            throw new \Exception('Failed to write translated file: '.$e->getMessage());
        }

        return $translatedText;
    }

    private function translateText($text, $sourceLang, $targetLang)
    {
        $url = 'https://translate.googleapis.com/translate_a/single?client=gtx'
            .'&sl='.urlencode($sourceLang)
            .'&tl='.urlencode($targetLang)
            .'&dt=t&q='.urlencode($text);

        try {
            $response = file_get_contents($url);
            $responseData = json_decode($response, true);

            return $responseData[0][0][0] ?? $text;
        } catch (\Exception $e) {
            return $text; // fallback to original
        }
    }
}
