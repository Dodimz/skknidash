import formatCurrency from "@/utils/formatCurrency"
import { usePage } from "@inertiajs/react"

export default function Amount({ amount }) {
    const {
        currency: { currency_symbol, currency_position, decimal_separator, no_of_decimal }
    } = usePage().props

    const formattedAmount = formatCurrency(amount, no_of_decimal, decimal_separator)

    let data = null
    if (currency_position === "left") {
        data = (
            <span>
                {currency_symbol}
                {formattedAmount}
            </span>
        )
    } else if (currency_position === "right") {
        data = (
            <span>
                {formattedAmount}
                {currency_symbol}
            </span>
        )
    } else if (currency_position === "left_space") {
        data = (
            <span>
                {currency_symbol} {formattedAmount}
            </span>
        )
    } else if (currency_position === "right_space") {
        data = (
            <span>
                {formattedAmount} {currency_symbol}
            </span>
        )
    } else {
        data = (
            <span>
                {currency_symbol}
                {formattedAmount}
            </span>
        )
    }
    return <>{data}</>
}
