import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import translate from "@/utils/translate"
import { Link, useForm } from "@inertiajs/react"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearCart, removeCoupon } from "@/Redux/features/Cart/cart"
import BioneMeta from "@/utils/BioneMeta"
import PageHeading from "@/Frontend/Components/PageHeading"
import ReCAPTCHA from "react-google-recaptcha"
import Amount from "@/Components/Amount"

const Index = ({ payment_gateway, meta_tags, tagline, site_name, terms_condition_url, manual_payment_gateways }) => {
    BioneMeta(tagline, "", meta_tags, "", "", site_name)
    const { carts, coupon } = useSelector((state) => state.carts)
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key") ? JSON.parse(localStorage.getItem("google_captcha_site_key")) : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)
    const [isCheckouting, setIsCheckouting] = useState(false)

    const [selectedGateway, setSelectedGateway] = useState(null)
    const [receiptFile, setReceiptFile] = useState(null)

    let pageHeaderData = {
        title: translate("Checkout"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Checkout"), url: null }
        ]
    }

    if (!carts.length && !isCheckouting) {
        window.history.back()
    }
    const dispatch = useDispatch()
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        phone: "",
        address: "",
        orderNotes: "",
        coupon: coupon,
        items: carts,
        agreed: false,
        paymentMethod: "",
        transactionId: "",
        receiptFile: null
    })
    const subtotal = carts.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
    let discount = 0
    if (coupon) {
        discount = coupon.discount_type === "fixed" ? coupon.discount_value : (subtotal * coupon.discount_value) / 100
    }
    const total = subtotal - discount

    useEffect(() => {
        if (data.paymentMethod) {
            const gateway = manual_payment_gateways.find((gateway) => gateway?.content?.gateway_name === data.paymentMethod)
            setSelectedGateway(gateway)

            if (!gateway) {
                setData("transactionId", "")
                setData("receiptFile", null)
                setReceiptFile(null)
            }
        }
    }, [data.paymentMethod])

    const handleCaptchaChange = (value) => {
        if (is_active_google_captcha === "1") {
            if (value) {
                setData("captchaToken", value)
                setCaptchaVerified(true)
                setCaptchaError(null)
            } else {
                setCaptchaVerified(false)
            }
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setReceiptFile(file)
        setData("receiptFile", file)
    }

    const handlePlaceOrder = (e) => {
        setIsCheckouting(true)
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("checkout.store"), {
            onSuccess: () => {
                dispatch(clearCart())
                dispatch(removeCoupon())
            }
        })
    }

    return (
        <FrontendLayout cart={true}>
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={true}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                    variant="cs_type_1"
                />
            )}
            <div className="cs_height_100 cs_height_lg_80" />
            <div className="container">
                <div className="row">
                    <div className="col-xl-7">
                        <h2 className="cs_checkout-title">{translate("Shipping Details")}</h2>
                        <div className="cs_height_45 cs_height_lg_40" />
                        <div className="row">
                            <div className="col-lg-12">
                                <label className="cs_shop-label">{translate("Name")} *</label>
                                <input type="text" onChange={(e) => setData("name", e.target.value)} value={data.name} className="cs_shop-input" />
                                {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                            </div>
                            <div className="col-lg-12">
                                <label className="cs_shop-label">{translate("Email")} *</label>
                                <input type="email" onChange={(e) => setData("email", e.target.value)} value={data.email} className="cs_shop-input" />
                                {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                            </div>
                            <div className="col-lg-12">
                                <label className="cs_shop-label">{translate("Phone")} *</label>
                                <input type="text" onChange={(e) => setData("phone", e.target.value)} value={data.phone} className="cs_shop-input" />
                                {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                            </div>
                            <div className="col-lg-12">
                                <label className="cs_shop-label">{translate("Full Address")} *</label>
                                <input
                                    type="text"
                                    onChange={(e) => setData("address", e.target.value)}
                                    value={data.address}
                                    className="cs_shop-input"
                                />
                                {errors.address && <span style={{ color: "red" }}>{errors.address}</span>}
                            </div>
                        </div>
                        <div className="cs_height_45 cs_height_lg_45" />
                        <h2 className="cs_checkout-title">{translate("Additional information")}</h2>
                        <div className="cs_height_30 cs_height_lg_30" />
                        <label className="cs_shop-label">{`${translate("Order notes")} (${translate("optional")})`}</label>
                        <textarea
                            cols={30}
                            rows={6}
                            onChange={(e) => setData("orderNotes", e.target.value)}
                            value={data.orderNotes}
                            className="cs_shop-input"
                        />
                        <div className="cs_height_30 cs_height_lg_30" />
                    </div>
                    <div className="col-xl-5">
                        <div className="cs_shop-side-spacing">
                            <div className="cs_shop-card" style={{ paddingBottom: "15px" }}>
                                <h2>{translate("Your order")}</h2>
                                <table style={{ borderBottom: "0" }}>
                                    <tbody>
                                        <tr className="cs_semi_bold">
                                            <td>{translate("Products")}</td>
                                            <td className="text-end">{translate("Amount")}</td>
                                        </tr>
                                        {carts.map((cartItem, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {cartItem.title} x {cartItem.quantity}
                                                </td>
                                                <td className="text-end">
                                                    <Amount amount={(cartItem.price * cartItem.quantity).toFixed(2)} />
                                                </td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="cs_semi_bold">{translate("Subtotal")}</td>
                                            <td className="text-end">
                                                <Amount amount={subtotal.toFixed(2)} />
                                            </td>
                                        </tr>
                                        {discount > 0 && (
                                            <tr>
                                                <td className="cs_semi_bold">{translate("Discount")}</td>
                                                <td className="text-end">
                                                    -<Amount amount={discount.toFixed(2)} />
                                                </td>
                                            </tr>
                                        )}
                                        <tr className="cs_semi_bold">
                                            <td className="cs_bold cs_primary_color">Total</td>
                                            <td className="text-end cs_bold cs_primary_color">
                                                <Amount amount={total.toFixed(2)} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="cs_height_30 cs_height_lg_30" />
                            <form onSubmit={handlePlaceOrder} className="cs_shop-card">
                                <h2>{translate("Payment")}</h2>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {payment_gateway.is_cod_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="cod"
                                                            id="cod"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="cod">
                                                            {translate("Cash On Delivery")}
                                                        </label>
                                                    </div>
                                                )}
                                                {payment_gateway.is_paypal_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="paypal"
                                                            id="paypal"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="paypal">
                                                            {translate("Paypal")}
                                                        </label>
                                                    </div>
                                                )}
                                                {payment_gateway.is_stripe_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="stripe"
                                                            id="stripe"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="stripe">
                                                            {translate("Stripe")}
                                                        </label>
                                                    </div>
                                                )}
                                                {payment_gateway.is_flutterwave_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="flutterwave"
                                                            id="flutterwave"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="flutterwave">
                                                            {translate("Flutterwave")}
                                                        </label>
                                                    </div>
                                                )}
                                                {payment_gateway.is_razorpay_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="razorpay"
                                                            id="razorpay"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="razorpay">
                                                            {translate("Razorpay")}
                                                        </label>
                                                    </div>
                                                )}
                                                {payment_gateway.is_sslcz_active && (
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="sslcommerz"
                                                            id="sslcommerz"
                                                            onChange={(e) => setData("paymentMethod", e.target.value)}
                                                        />
                                                        <label className="form-check-label m-0 cs_semi_bold" htmlFor="sslcommerz">
                                                            {translate("Sslcommerz")}
                                                        </label>
                                                    </div>
                                                )}
                                                {manual_payment_gateways.length > 0 && (
                                                    <>
                                                        {manual_payment_gateways?.map((gateway, index) => (
                                                            <div key={index}>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        name="paymentMethod"
                                                                        value={gateway?.content?.gateway_name}
                                                                        id={gateway?.content?.gateway_name}
                                                                        onChange={(e) => setData("paymentMethod", e.target.value)}
                                                                    />
                                                                    <label
                                                                        className="form-check-label m-0 cs_semi_bold"
                                                                        htmlFor={gateway?.content?.gateway_name}
                                                                    >
                                                                        {gateway?.content?.gateway_name}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {selectedGateway && (
                                    <div className="manual-payment-details mt-4">
                                        <h3>{translate("Payment Instructions")}</h3>
                                        <div className="cs_height_15 cs_height_lg_15" />

                                        <div
                                            className="payment-instructions mb-4"
                                            dangerouslySetInnerHTML={{ __html: selectedGateway?.content?.instructions }}
                                        />
                                        {selectedGateway?.payment_type === "bank_payment" && (
                                            <div className="bank-info mb-4">
                                                <h4>{translate("Bank Information")}</h4>
                                                <div className="cs_height_10 cs_height_lg_10" />
                                                {JSON.parse(selectedGateway.bank_information).map((bank, idx) => (
                                                    <div key={idx} className="bank-detail p-3 mb-2 border rounded">
                                                        <p>
                                                            <strong>{translate("Bank Name")}:</strong> {bank.bank_name}
                                                        </p>
                                                        <p>
                                                            <strong>{translate("Account Name")}:</strong> {bank.account_name}
                                                        </p>
                                                        <p>
                                                            <strong>{translate("Account Number")}:</strong> {bank.account_number}
                                                        </p>
                                                        <p>
                                                            <strong>{translate("Routing Number")}:</strong> {bank.routing_number}
                                                        </p>
                                                        <p>
                                                            <strong>{translate("Branch")}:</strong> {bank.branch_name}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="mb-3">
                                            <label className="cs_shop-label">{translate("Transaction ID")} *</label>
                                            <input
                                                type="text"
                                                className="cs_shop-input"
                                                value={data.transactionId}
                                                onChange={(e) => setData("transactionId", e.target.value)}
                                                placeholder={translate("Enter your transaction ID")}
                                                required
                                            />
                                            {errors.transactionId && <span style={{ color: "red" }}>{errors.transactionId}</span>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="cs_shop-label">{translate("Photo")}</label>
                                            <input type="file" className="form-control" onChange={handleFileChange} accept="image/*,.pdf" />
                                            {receiptFile && (
                                                <div className="mt-2">
                                                    <span className="badge bg-success">{receiptFile.name}</span>
                                                </div>
                                            )}
                                            {errors.receiptFile && <span style={{ color: "red" }}>{errors.receiptFile}</span>}
                                        </div>
                                    </div>
                                )}
                                {errors.paymentMethod && <span style={{ color: "red" }}>{errors.paymentMethod}</span>}
                                <div className="cs_height_25 cs_height_lg_25" />
                                <p className="m-0 cs_payment_text">
                                    {translate(
                                        "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our"
                                    )}{" "}
                                </p>
                                <div className="cs_height_20 cs_height_lg_20" />
                                {is_active_google_captcha === "1" && (
                                    <>
                                        <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                                        {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                                    </>
                                )}
                                <div className="cs_height_20 cs_height_lg_20" />
                                <div className="form-check">
                                    <input
                                        className="form-check-input custom-cursor-default-hover"
                                        type="checkbox"
                                        id="agreed"
                                        checked={data.agreed}
                                        onChange={(e) => setData("agreed", e.target.checked)}
                                    />
                                    <label className="form-check-label m-0 cs_semi_bold custom-cursor-default-hover" htmlFor="agreed">
                                        <Link href={terms_condition_url}>{translate("Accept Terms And Conditions")}</Link>
                                    </label>
                                </div>
                                {errors.agreed && <span style={{ color: "red" }}>{errors.agreed}</span>}
                                <div className="cs_height_20 cs_height_lg_20" />
                                <button className="cs_product_btn cs_semi_bold w-100" disabled={!captchaError && processing}>
                                    {translate("Place Order")}
                                </button>
                            </form>
                            <div className="cs_height_30 cs_height_lg_30" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="cs_height_100 cs_height_lg_80" />
        </FrontendLayout>
    )
}

export default Index
