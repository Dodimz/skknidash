<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Traits\ModelRepositoryTraits;
use Illuminate\Support\Facades\Cache;

class SettingRepository
{
    use ModelRepositoryTraits;

    protected $model;

    public function __construct(Setting $setting)
    {
        $this->model = $setting;
    }

    /**
     * Get setting by group
     */
    private function getSettingByGroup($groupName): array
    {

        $settings = $this->model->where('setting_group', $groupName)->get();
        $data = [];
        foreach ($settings as $setting) {
            $data[$setting->setting_key] = $setting->setting_value;
        }

        return $data;
    }

    /**
     * Get payment configure settings
     */
    public function getPaymentGatewayConfiguration(): array
    {
        return $this->getSettingByGroup('payment_gateways');
    }

    /**
     * Get google captcha settings
     */
    public function getGoogleCaptchaConfiguration(): array
    {
        return $this->getSettingByGroup('google_captcha');
    }

    /**
     * Get common settings
     */
    public function getCommonSettingConfiguration(): array
    {
        return $this->getSettingByGroup('common_settings');
    }

    /**
     * Get site settings
     */
    public function getSiteSettings(): array
    {
        return [
            'general' => $this->getSettingByGroup('general_settings'),
            'sidebar' => $this->getSettingByGroup('sidebar_settings'),
            'footer' => $this->getSettingByGroup('footer_settings'),
            'contact' => $this->getSettingByGroup('contact_settings'),
            'subscriber' => $this->getSettingByGroup('subscribe_settings'),
            'social_links' => $this->getSettingByGroup('social_settings'),
            'custom_css' => $this->getSettingByGroup('custom_css'),
            'html_embed_code' => $this->getSettingByGroup('embed_html'),
        ];
    }

    /**
     * Get Smtp Configuration
     */
    public function getSmtpConfiguration()
    {
        return [
            'MAIL_HOST' => env('MAIL_HOST'),
            'MAIL_PORT' => env('MAIL_PORT'),
            'MAIL_USERNAME' => env('MAIL_USERNAME'),
            'MAIL_PASSWORD' => env('MAIL_PASSWORD'),
            'MAIL_ENCRYPTION' => env('MAIL_ENCRYPTION'),
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
        ];
    }

    /**
     * Update setting by group
     */
    public function updateSettingByGroup($settingGroup, array $values = []): void
    {
        $settingKeys = array_keys($values);
        foreach ($settingKeys as $settingKey) {
            $this->model->updateOrCreate(
                ['setting_key' => $settingKey, 'setting_group' => $settingGroup],
                ['setting_value' => $values[$settingKey]]
            );
            Cache::forget('settings:'.$settingKey);
        }
    }

    public function updateEnvByKey($data = [])
    {

        $path = base_path('.env');
        if (file_exists($path)) {
            foreach ($data as $key => $value) {
                $this->writeEnvironmentFile($key, $value);
            }
        }
    }

    private function writeEnvironmentFile($key, $value)
    {
        $path = base_path('.env');
        if (file_exists($path)) {
            // Read the current contents of the .env file
            $contents = file_get_contents($path);

            // Check if the key exists in the .env file
            if (strpos($contents, $key) !== false) {
                // If the value contains double quotes, handle it differently
                if (strpos($value, '"') !== false) {
                    $pattern = preg_quote($key.'='.env($key), '/');
                    $replacement = $key.'='.$value;
                    $contents = preg_replace('/'.$pattern.'/', $replacement, $contents);
                } else {
                    // If the value does not contain double quotes, replace normally
                    $contents = preg_replace("/{$key}=(.*)/", "{$key}={$value}", $contents);
                }

                // Write the updated contents back to the .env file
                file_put_contents($path, $contents);
            }
        }
    }

    /**
     * Get currency setting information.
     */
    public function getCurrencySettingInfo(): array
    {
        return $this->getSettingByGroup('currency_settings');
    }

    /**
     * Update currency setting info.
     */
    public function updateCurrencySetting(array $data): void
    {
        $this->updateSettingByGroup('currency_settings', $data);
    }

    /**
     * Get page settings
     */
    public function getInvoiceSettings(): mixed
    {
        return $this->getSettingByGroup('invoice_setting');
    }

    /**
     * Update invoice settings.
     *
     **/
    public function updateInvoiceSettings(array $data): void
    {
        $this->updateSettingByGroup('invoice_setting', $data);
    }

    /**
     * Store theme data
     */
    public function storeThemeData($themeData): void
    {
        $activeTheme = Setting::pull('active_theme');
        $selectedTheme = '';
        switch ($activeTheme) {
            case 'default':
                $selectedTheme = 'default_theme_data';
                break;
            case 'photography_agency':
                $selectedTheme = 'photography_agency_theme_data';
                break;
            case 'creative_portfolio':
                $selectedTheme = 'creative_portfolio_theme_data';
                break;
            case 'digital_agency':
                $selectedTheme = 'digital_agency_theme_data';
                break;
            case 'marketing_agency':
                $selectedTheme = 'marketing_agency_theme_data';
                break;
            case 'showcase_portfolio':
                $selectedTheme = 'showcase_portfolio_theme_data';
                break;
            case 'case_study_showcase':
                $selectedTheme = 'case_study_showcase_theme_data';
                break;
            case 'freelancing_agency':
                $selectedTheme = 'freelancing_agency_theme_data';
                break;
            case 'architecture_agency':
                $selectedTheme = 'architecture_agency_theme_data';
                break;
            case 'creative_solution':
                $selectedTheme = 'creative_solution_theme_data';
                break;
            case 'personal_portfolio':
                $selectedTheme = 'personal_portfolio_theme_data';
                break;
            default:
                $homeData = '';
        }
        $this->updateSettingByGroup('theme_settings', [$selectedTheme => $themeData]);
    }

    /**
     * Update payment gateway configure
     */
    public function updatePaymentGatewayConfigure(array $data): void
    {
        $this->updateSettingByGroup('payment_gateways', $data);
    }

    /**
     * Update google captcha settings
     */
    public function updateGoogleCaptchaConfigure(array $data): void
    {
        $this->updateSettingByGroup('google_captcha', $data);
    }

    /**
     * Update common settings
     */
    public function updateCommonSettingConfigure(array $data): void
    {
        $this->updateSettingByGroup('common_settings', $data);
    }

    /**
     * Get page setting information.
     *
     * @return array
     */
    public function getPageSettingInfo()
    {
        return $this->getSettingByGroup('page_settings');
    }

    /**
     * Update page setting info.
     */
    public function updatePageSetting(array $data): void
    {
        $this->updateSettingByGroup('page_settings', $data);
    }

    /**
     * Get social media configuration settings.
     *
     * @return array
     */
    public function getSocialMediaConfig()
    {

        return $this->getSettingByGroup('social_login');
    }

    /**
     * Update social media configuration settings.
     *
     **/
    public function updateGoogleLoginConfig(array $data): void
    {
        $this->updateSettingByGroup('social_login', $data);
    }

    /**
     * Update social media configuration settings.
     *
     **/
    public function updateFacebookLoginConfig(array $data): void
    {
        $this->updateSettingByGroup('social_login', $data);
    }
}
