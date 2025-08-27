<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>@lang('Order Confirmation')</title>
    @php
    $currency = app(\App\Repositories\SettingRepository::class)->getCurrencySettingInfo();
    @endphp
    <style>
        /* Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Page Styling */
        body {
            direction: <?php echo $direction; ?>;
            text-align: <?php echo $text_align; ?>;
            font-family: <?php echo $font_family; ?>;
            font-size: 12px;
            color: #333;
            background: #fff;
            position: relative;
        }



        /* Main Container */
        .container {
            width: 90%;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            position: relative;
        }

        /* Header Section */
        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .header img {
            max-width: 150px;
            margin-bottom: 10px;
        }

        .header h1 {
            font-size: 24px;
            color: #2d2d2d;
            margin-bottom: 5px;
        }

        .header p {
            font-size: 14px;
            color: #555;
        }

        .booking-details {
            margin-bottom: 20px;
        }

        .booking-details h2 {
            font-size: 18px;
            color: #2d2d2d;
            margin-bottom: 10px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }

        .booking-details .detail {
            margin-bottom: 8px;
        }

        .detail label {
            font-weight: bold;
            color: #2d2d2d;
        }

        /* Table Styles */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table,
        th,
        td {
            border: 1px solid #ddd;
        }

        th,
        td {
            padding: 8px;
            text-align: <?php echo $text_align; ?>;
            font-size: 12px;
        }

        th {
            background-color: #f0f0f0;
            color: #333;
        }

        /* Footer Section */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            text-align: center;
            font-size: 10px;
            color: #555;
            padding: 10px;
            background: #fff;
        }

        /* Watermark Styling */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-30deg);
            font-size: 80px;
            color: rgb(0, 128, 0);
            font-weight: bold;
            z-index: 100;
            text-align: center;
            opacity: 0.2;
        }

        .summary-item {
            text-align: right;
            margin-top: 5px;
        }

        .summary-items {
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <!-- Watermark -->
    {{-- @if ($booking->payment_status === '2')--}}
    {{-- <div class="watermark">@lang('PAID')</div>--}}
    {{-- @endif--}}

    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <img src="{{ asset($invoice_logo) }}" alt="Invoice Logo">
            <h1>@lang('Order Invoice Title')</h1>
            <p>@lang('Order Invoice Subtitle')</p>
        </div>

        <!-- Order Details -->
        <div class="booking-details">
            <h2>@lang('Order Details')</h2>
            <div class="detail"><label>@lang('Order Number')</label> #{{ $order->order_number }}</div>
            <div class="detail"><label>@lang('Customer Name')</label> {{ $order->customer_name }}</div>
        </div>

        <!-- Product Summary -->
        <div class="charges-details">
            <h2>@lang('Product Summary')</h2>
            <table>
                <tr>
                    <th>@lang('Product Title')</th>
                    <th style="text-align: right;">@lang('Price')</th>
                    <th style="text-align: right;">@lang('Total')</th>
                </tr>
                @foreach ($order->orderitems as $item)
                <tr>
                    <td>{{ $item?->product_name ?? 'N/A' }} (x{{ $item->quantity }})</td>
                    <td style="text-align: right;">{{ format_currency($item?->product_price, $currency) }}</td>
                    <td style="text-align: right;">{{ format_currency($item?->product_price * $item->quantity, $currency) }}</td>
                </tr>
                @endforeach
            </table>
            <div class="summary-items">
                <div class="summary-item"><strong>@lang('Subtotal')</strong>: {{ format_currency($order->total_price, $currency) }}</div>
                <div class="summary-item"><strong>@lang('Discount')</strong>: -{{ format_currency($order->discount, $currency) }}</div>
                <div class="summary-item"><strong>@lang('Grand Total')</strong>: {{ format_currency($order->total_price - $order->discount, $currency) }}</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>@lang('Address') {{ $footer_address }}</p>
            <p>@lang('Contact Us') {{ $footer_contact }}</p>
        </div>
    </div>
</body>

</html>