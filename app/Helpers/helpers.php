<?php

use App\Models\Setting;

if (! function_exists('get_options')) {
    function get_options(string $key, bool $decode = false, $locale = false)
    {
        if ($locale === true) {
            $cachekey = $key.$locale;
        } else {
            $cachekey = $key;
        }

        $cacheKey =
            $option = cache_remember($cachekey, function () use ($key, $locale) {
                $row = Setting::query();
                if ($locale != false) {
                    $row = $row->where('lang', current_local());
                }

                return $row = $row->where('setting_key', $key)->first();
            });

        return $decode ? json_decode($option->value ?? '') : $option->value ?? null;
    }
}

if (! function_exists('cache_remember')) {
    function cache_remember(string $key, callable $callback, int $ttl = 1800)
    {
        return cache()->remember($key, env('CACHE_LIFETIME', $ttl), $callback);
    }
}

if (! function_exists('current_local')) {
    function current_local()
    {
        return app()->getLocale();
    }
}

if (! function_exists('format_currency')) {
    /**
     * Format a given amount into the specified currency format.
     *
     * @param  float|int  $amount
     * @return string
     */
    function format_currency($amount, array $settings)
    {
        $symbol = $settings['currency_symbol'] ?? '';
        $position = $settings['currency_position'] ?? 'left';
        $decimals = $settings['no_of_decimal'] ?? 2;
        $decimalSeparator = $settings['decimal_separator'] === 'en-US' ? '.' : ',';
        $thousandsSeparator = $settings['decimal_separator'] === 'en-US' ? ',' : '.';

        $formattedAmount = number_format($amount, $decimals, $decimalSeparator, $thousandsSeparator);

        switch ($position) {
            case 'left':
                return "{$symbol}{$formattedAmount}";
            case 'right':
                return "{$formattedAmount}{$symbol}";
            case 'left_space':
                return "{$symbol} {$formattedAmount}";
            case 'right_space':
                return "{$formattedAmount} {$symbol}";
            default:
                return "{$symbol}{$formattedAmount}";
        }
    }
}
