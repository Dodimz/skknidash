<?php

namespace App\Repositories\Frontend;

use App\Models\Page;

class PageRepository
{
    /**
     * Get page data
     */
    public function getPageData(Page $page)
    {
        $page->load('contents');
        $formattedPageData = [];
        $formattedPageInfo = [];

        foreach ($page->contents as $pageContent) {
            // Prepare page data
            $content = json_decode($pageContent->sections_data, true);
            $formattedPageData[$pageContent->language_code] = $content;

            // Prepare page info
            $formattedPageInfo[$pageContent->language_code] = [
                'title' => $pageContent->title,
                'breadcrumb_title' => $pageContent->breadcrumb_title,
                'header_action_button_text' => $pageContent->header_action_button_text,
                'header_action_button_url' => $pageContent->header_action_button_url,
                'meta_title' => $pageContent->meta_title,
                'meta_description' => $pageContent->meta_description,
                'meta_tags' => $pageContent->meta_tags,
                'is_show_breadcrumb' => (bool) $page->is_show_breadcrumb,
                'is_show_shopping_cart' => (bool) $page->is_show_shopping_cart,
                'breadcrumb_image' => $page->breadcrumb_image,
                'header_layout' => $page->header_layout,
                'footer_layout' => $page->footer_layout,
            ];
        }

        $data['page_data'] = $formattedPageData;
        $data['page_info'] = $formattedPageInfo;

        return $data;
    }
}
