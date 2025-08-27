export default function formatCurrency(amount, decimals, locale = 'en-US', currency = undefined) {
    const options = {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    };

    if (currency) {
        options.style = 'currency';
        options.currency = currency;
    }

    return new Intl.NumberFormat(locale, options).format(amount);
}
