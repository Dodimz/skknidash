@php
$custom_css = \App\Models\Setting::pull('custom_css');
$accent_color = \App\Models\Setting::pull('accent_color');
$primary_color = \App\Models\Setting::pull('primary_color');
$secondary_color = \App\Models\Setting::pull('secondary_color');
$primary_font = \App\Models\Setting::pull('primary_font');
$secondary_font = \App\Models\Setting::pull('secondary_font');
@endphp

:root {
--accent: {{ $accent_color }} !important;
--primary: {{ $primary_color }} !important;
--secondary: {{ $secondary_color }} !important;
--primary-font: {{$primary_font}}, sans-serif;
--secondary-font: {{$secondary_font}}, sans-serif;
}

{{ $custom_css }}