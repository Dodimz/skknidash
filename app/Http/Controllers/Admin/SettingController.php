<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\CurrencySettingUpdateRequest;
use App\Http\Requests\Admin\Settings\FacebookLoginUpdateRequest;
use App\Http\Requests\Admin\Settings\GoogleLoginUpdateRequest;
use App\Http\Requests\Backend\SmtpSettingUpdateRequest;
use App\Models\Page;
use App\Repositories\SettingRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{

    public function __construct()
    {
        // for demo mood
        $this->middleware('demo', ['only' => ['paymentGatewayUpdate', 'smtpUpdate', 'commonSettingsUpdate', 'googleCaptchaUpdate', 'pageSettingUpdate', 'currencySettingUpdate', 'invoiceSettingUpdate', 'googleLoginUpdate', 'facebookLoginUpdate']]);
    }

    public function commonSettings(SettingRepository $repository)
    {
        $data['get_common_settings'] = $repository->getCommonSettingConfiguration();

        return Inertia::render('Settings/CommonSettings', $data);
    }

    public function commonSettingsUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updateCommonSettingConfigure($request->all());

        return back()->with('success', 'Common settings has been updated');
    }

    public function googleCaptcha(SettingRepository $repository)
    {
        $data['get_captcha_config'] = $repository->getGoogleCaptchaConfiguration();

        return Inertia::render('Settings/GoogleCaptcha', $data);
    }

    public function googleCaptchaUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updateGoogleCaptchaConfigure($request->all());

        return back()->with('success', 'Google captcha settings has been updated');
    }

    public function paymentGateway(SettingRepository $repository)
    {
        $data['gateway_credentials'] = $repository->getPaymentGatewayConfiguration();

        return Inertia::render('Settings/PaymentGateway', $data);
    }

    public function paymentGatewayUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updatePaymentGatewayConfigure($request->all());

        return back()->with('success', 'Payment settings has been update');
    }

    public function smtpSetting(SettingRepository $repository)
    {
        $data['smtp_config'] = $repository->getSmtpConfiguration();

        return Inertia::render('Settings/SmtpSettings', $data);
    }

    public function smtpUpdate(SmtpSettingUpdateRequest $request, SettingRepository $repository)
    {
        $repository->updateEnvByKey($request->all());

        return back()->with('success', 'Mail setting has been updated');
    }

    /**
     * Show page setting form.
     */
    public function pageSetting(SettingRepository $repository)
    {
        $data['pages'] = Page::with('content')->get();
        $data['page_info'] = $repository->getPageSettingInfo();

        return Inertia::render('Settings/PageSetting', $data);
    }

    /**
     * Update page setting information.
     */
    public function pageSettingUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updatePageSetting($request->all());

        return back()->with('success', 'Page setting updated successfully!');
    }

    /**
     * Update the specified resource.
     */
    public function changeLang($lang): RedirectResponse
    {
        session()->put('lang', $lang);

        return back()->with('success', 'Language successfully changed');
    }

    /**
     * Show currency setting form.
     */
    public function currencySetting(SettingRepository $repository)
    {
        $data['currency_info'] = $repository->getCurrencySettingInfo();

        return Inertia::render('Settings/CurrencySettings', $data);
    }

    /**
     * Update currency setting information.
     */
    public function currencySettingUpdate(CurrencySettingUpdateRequest $request, SettingRepository $repository)
    {
        $repository->updateCurrencySetting($request->all());

        return back()->with('success', 'Currency setting updated successfully!');
    }

    /**
     * Invoice settings.
     */
    public function invoiceSetting(SettingRepository $repository)
    {
        $data['invoice_setting'] = $repository->getInvoiceSettings();

        return Inertia::render('Settings/InvoiceSetting', $data);
    }

    /**
     * Update Social Login.
     */
    public function invoiceSettingUpdate(Request $request, SettingRepository $repository)
    {
        $repository->updateInvoiceSettings($request->all());

        return back()->with('success', 'Invoice setting updated successfully!');
    }

    /**
     * Social Login configuration.
     */
    public function socialLogin(SettingRepository $repository)
    {
        $data['social_media_config'] = $repository->getSocialMediaConfig();

        return Inertia::render('Settings/SocialLogin', $data);
    }

    /**
     * Update Social Login.
     */
    public function googleLoginUpdate(GoogleLoginUpdateRequest $request, SettingRepository $repository)
    {
        $repository->updateGoogleLoginConfig($request->all());

        return back()->with('success', 'Google login configuration updated successfully!');
    }

    /**
     * Update Social Login.
     */
    public function facebookLoginUpdate(FacebookLoginUpdateRequest $request, SettingRepository $repository)
    {
        $repository->updateFacebookLoginConfig($request->all());

        return back()->with('success', 'Facebook login configuration updated successfully!');
    }
}
