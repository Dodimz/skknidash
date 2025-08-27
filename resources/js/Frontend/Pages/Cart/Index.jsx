import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import { useSelector } from "react-redux"
import React, { useState } from "react"
import axios from "axios"
import { Icon } from "@iconify/react"
import { useDispatch } from "react-redux"
import { decreaseCart, increaseCart, removeCart, setCoupon } from "@/Redux/features/Cart/cart"
import { Link } from "@inertiajs/react"
import translate from "@/utils/translate"
import Amount from "@/Components/Amount"
import BioneMeta from "@/utils/BioneMeta"
import PageHeading from "@/Frontend/Components/PageHeading"

const Index = ({ meta_tags, tagline, site_name, meta_title, title, meta_description, meta_image, shop_slug }) => {
    BioneMeta(meta_title ?? title, meta_title, meta_tags, meta_description, meta_image, site_name)
    const { carts, coupon } = useSelector((state) => state.carts)
    const dispatch = useDispatch()

    const [couponCode, setCouponCode] = useState("")
    const [couponErrMsg, setCouponErrMsg] = useState("")
    const [couponApplying, setCouponApplying] = useState(false)
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    let pageHeaderData = {
        title,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: title, url: null }
        ]
    }
    const subtotal = carts.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
    let discount = 0
    if (coupon) {
        discount = coupon.discount_type === "fixed" ? coupon.discount_value : (subtotal * coupon.discount_value) / 100
    }
    const total = subtotal - discount

    const handleApplyCoupon = (e) => {
        e.preventDefault()
        setCouponApplying(true)
        dispatch(setCoupon(""))
        axios
            .post(route("apply.coupon"), {
                code: couponCode
            })
            .then((res) => {
                setCouponErrMsg("")
                dispatch(setCoupon(res.data.coupon))
                setCouponApplying(false)
                setCouponCode("")
            })
            .catch((e) => {
                setCouponErrMsg(e.response.data.message)
                setCouponApplying(false)
            })
    }
    return (
        <FrontendLayout cart={true}>
            <>
                {is_show_breadcrumb === "1" && (
                    <PageHeading
                        data={pageHeaderData}
                        is_show_breadcrumb={true}
                        bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                        variant="cs_type_1"
                    />
                )}

                {/* Start Cart  */}
                <div className="cs_height_100 cs_height_lg_80" />
                <div className="container">
                    <div className="row cs_gap_y_30">
                        <div className="col-xl-8">
                            <div className="table-responsive">
                                <table className="cs_cart_table">
                                    <thead>
                                        <tr>
                                            <th>{translate("Product")}</th>
                                            <th>{translate("Price")}</th>
                                            <th>{translate("Quantity")}</th>
                                            <th>{translate("Subtotal")}</th>
                                            <th />
                                        </tr>
                                    </thead>
                                    {carts.map((cartItem) => (
                                        <tbody>
                                            <tr key={cartItem.id}>
                                                <td>
                                                    <div className="cs_cart_table_media">
                                                        <img src={cartItem.thumbnail_image} alt="Thumb" />
                                                        <h3>{cartItem.title}</h3>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Amount amount={cartItem.price} />
                                                </td>
                                                <td>
                                                    <div className="cs_quantity">
                                                        <button
                                                            onClick={() => dispatch(increaseCart(cartItem.id))}
                                                            className="cs_quantity_button cs_increment"
                                                        >
                                                            <Icon icon="fa6-solid:angle-up" />
                                                        </button>
                                                        <span className="cs_quantity_input">{cartItem.quantity}</span>
                                                        <button
                                                            onClick={() => dispatch(decreaseCart(cartItem.id))}
                                                            disabled={cartItem.quantity === 1}
                                                            className="cs_quantity_button cs_decrement"
                                                        >
                                                            <Icon icon="fa6-solid:angle-down" />{" "}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <Amount amount={(cartItem.price * cartItem.quantity).toFixed(2)} />
                                                </td>
                                                <td className="text-center">
                                                    <button onClick={() => dispatch(removeCart(cartItem.id))} className="cs_cart-table-close">
                                                        <Icon icon="mdi:cancel-bold" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                            <div className="cs_height_5 cs_height_lg_5" />
                            {carts.length > 0 ? (
                                <div className="cs_cart-offer" style={{ alignItems: "start" }}>
                                    <div>
                                        <form onSubmit={handleApplyCoupon} className="cs_coupon-doce-form">
                                            <input
                                                required
                                                type="text"
                                                placeholder={translate("Coupon Code")}
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />

                                            <button disabled={couponApplying} type="submit" className="cs_product_btn cs_color1 cs_semi_bold">
                                                {translate("Apply Coupon")}
                                            </button>
                                        </form>
                                        {couponErrMsg && <span className="text-danger">{couponErrMsg}</span>}
                                        {coupon && (
                                            <span className="text-success">
                                                {translate("Coupon applied")} <span className="badge bg-success">{coupon.code}</span>
                                                <span onClick={() => dispatch(setCoupon(""))} role="button" className="text-danger">
                                                    <Icon icon="mdi:cancel-bold" />
                                                </span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    {translate("No products in cart!")}{" "}
                                    <strong>
                                        <Link className="" href={route("pages.show", { slug: shop_slug })}>
                                            {translate("Shop Now")}
                                        </Link>
                                    </strong>{" "}
                                </div>
                            )}
                        </div>
                        <div className="col-xl-4">
                            <div className="cs_shop-side-spacing">
                                <div className="cs_shop-card">
                                    <h2>{translate("Cart Totals")}</h2>
                                    <table className="cs_medium">
                                        <tbody>
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
                                                <td>{translate("Total")}</td>
                                                <td className="text-end">
                                                    <Amount amount={total.toFixed(2)} />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="cs_height_30 cs_height_lg_30" />
                                    <Link
                                        href={route("checkout.index")}
                                        className={`cs_product_btn cs_semi_bold w-100 ${carts?.length === 0 ? "cs_disable" : ""}`}
                                    >
                                        {translate("Procced To Checkout")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs_height_100 cs_height_lg_80" />
                {/* End Cart  */}
            </>
        </FrontendLayout>
    )
}

export default Index
