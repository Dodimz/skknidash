<?php

namespace App\Repositories\Admin;

use App\Repositories\SettingRepository;
use Illuminate\Http\Request;

class CustomizeRepository
{
    /**
     * Update customize
     */
    public function update(Request $request, SettingRepository $repository): void
    {
        $repository->updateSettingByGroup('general_settings', $request->general);
        $repository->updateSettingByGroup('sidebar_settings', $request->sidebar);
        $repository->updateSettingByGroup('footer_settings', $request->footer);
        $repository->updateSettingByGroup('contact_settings', $request->contact);
        $repository->updateSettingByGroup('social_settings', $request->social_links);
        $repository->updateSettingByGroup('subscribe_settings', $request->subscriber);
        $repository->updateSettingByGroup('custom_css', [$request->custom_css]);
        $repository->updateSettingByGroup('embed_html', ['html_embed_code' => $request->html_embed_code]);
    }

    /**
     * Get customize settings
     */
    public function getCustomize(SettingRepository $repository): array
    {
        return $repository->getSiteSettings();
    }
}
