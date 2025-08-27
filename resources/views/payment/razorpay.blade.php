<form action="https://api.razorpay.com/v1/checkout/embedded" method="POST">
    <input type="hidden" name="key_id" value={{ $razorpayKeyId }}>
    <input type="hidden" name="amount" value="{{ $paymentHistory->amount }}">
    <input type="hidden" name="order_id" value="{{ $order_id }}">
    <input type="hidden" name="name" value="{{ $paymentHistory->name }}">
    <input type="hidden" name="description" value="Pay to {{ env('APP_NAME') }}">
    <input type="hidden" name="prefill[name]" value="{{ $paymentHistory->name }}">
    <input type="hidden" name="prefill[contact]" value="{{ $paymentHistory->mobile }}">
    <input type="hidden" name="prefill[email]" value="{{ $paymentHistory->email }}">
    <input type="hidden" name="callback_url" value="{{ route('payment.success', ['method' => 'razorpay', 'identifier' => $paymentHistory]) }}">
    <input type="hidden" name="cancel_url" value="{{ route('payment.cancel', ['method' => 'razorpay', 'identifier' => $paymentHistory]) }}">
    <button type="submit" id="submit_btn"></button>
</form>

<script>
    var submitBtn = document.getElementById("submit_btn");
    submitBtn.click();
</script>
