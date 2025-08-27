import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import PageHeading from "@/Frontend/Components/PageHeading"
import React from "react"
import { Link, useForm } from "@inertiajs/react"
import { produce } from "immer"
import BioneMeta from "@/utils/BioneMeta"
import translate from "@/utils/translate"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function Show({ pricing_plan, flash, payment_gateway, meta_tags, tagline, site_name, terms_condition_url }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key") ? JSON.parse(localStorage.getItem("google_captcha_site_key")) : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        email: "",
        mobile: "",
        whatsapp_skype: "",
        payment_method: "",
        note: "",
        agreed: false
    })

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

    // handle pay
    const handlePay = () => {
        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("pricing.pay", pricing_plan))
    }

    BioneMeta(tagline ?? pricing_plan?.content?.name, "", meta_tags, "", "", site_name)

    return (
        <FrontendLayout headerLayout="1" footerLayout="1">
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={{
                        title: pricing_plan?.content?.name,
                        breadcrumb: [
                            { label: "Home", url: "/" },
                            {
                                label: "Pricing Plans",
                                url: route("pricing.plan.index")
                            }
                        ]
                    }}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                />
            )}
            <div className="cs_height_150 cs_height_lg_80"></div>
            <div className="container">
                <div className="row cs_gap_40_y">
                    <div className="col-xl-4 col-lg-5">
                        <div className="cs_pricing_table cs_style_1" style={{ padding: "40px" }}>
                            <h2 className="cs_pricing_title cs_fs_53 cs_normal">{pricing_plan?.content?.name}</h2>
                            <ul className="cs_pricing_feature cs_mp0 cs_fs_18 cs_medium">
                                {JSON.parse(pricing_plan?.content?.plan_features).map((feature, index) => (
                                    <li key={index}>
                                        {feature && (
                                            <i className="cs_feature_icon cs_accent_color">
                                                <svg width={25} height={25} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="12.5" cy="12.5" r="12.5" fill="currentColor" />
                                                    <path
                                                        d="M10.9273 14.5469C10.9828 14.4487 11.0197 14.3453 11.0844 14.273C12.8305 12.3146 14.5766 10.3666 16.3226 8.40821C16.5305 8.17569 16.7615 8 17.0663 8C17.4359 8.00517 17.7177 8.19119 17.8886 8.55806C18.0595 8.92493 18.0318 9.2918 17.8193 9.62767C17.7592 9.72585 17.6807 9.81369 17.6068 9.89637C15.6205 12.1183 13.6342 14.3402 11.6479 16.5621C11.126 17.146 10.6271 17.146 10.1097 16.5621C9.18586 15.5286 8.25739 14.4952 7.33354 13.4566C6.98709 13.069 6.90856 12.6092 7.10719 12.1906C7.40744 11.5499 8.13267 11.4414 8.62693 11.9839C9.31982 12.7435 9.99886 13.5186 10.6825 14.2833C10.7472 14.3557 10.8072 14.4177 10.9273 14.5469Z"
                                                        fill="white"
                                                    />
                                                </svg>
                                            </i>
                                        )}
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="cs_pricing_info">
                                <div className="cs_price">
                                    <h3 className="cs_fs_53 cs_normal mb-0">
                                        {pricing_plan?.currency?.symbol}
                                        {pricing_plan?.price}
                                    </h3>
                                    <span>
                                        {pricing_plan?.content.plan_duration && "/"}
                                        {translate(pricing_plan?.content.plan_duration)}
                                    </span>
                                </div>
                            </div>
                            {pricing_plan?.content?.subtitle && <div className="cs_price_text">{pricing_plan?.content?.subtitle}</div>}
                        </div>
                    </div>
                    <div className="col-lg-7 offset-xl-1">
                        {!flash.payment_status ? (
                            <div className="row">
                                <div className="col-lg-6">
                                    <label className="cs_primary_color">{translate("Your Name")}*</label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.name = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.name && <span className="text-danger">{errors.name}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_primary_color">{translate("Email")}*</label>
                                    <input
                                        type="email"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.email = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.email && <span className="text-danger">{errors.email}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_primary_color">{translate("Mobile")}*</label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.mobile = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-6">
                                    <label className="cs_primary_color">
                                        {translate("Whatsapp")}/{translate("Skype")}
                                    </label>
                                    <input
                                        type="text"
                                        className="cs_form_field"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.whatsapp_skype = e.target.value
                                                })
                                            )
                                        }
                                    />
                                    {errors.whatsapp_skype && <span className="text-danger">{errors.whatsapp_skype}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs_primary_color">{translate("Note")}</label>
                                    <textarea
                                        id=""
                                        cols="20"
                                        className="cs_form_field"
                                        rows="5"
                                        onChange={(e) =>
                                            setData(
                                                produce((draft) => {
                                                    draft.note = e.target.value
                                                })
                                            )
                                        }
                                    ></textarea>
                                    {errors.note && <span className="text-danger">{errors.note}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    <label className="cs_primary_color">{translate("Select Payment Method")}*</label>
                                    <div className="cs_checkbox_wrap">
                                        {payment_gateway.is_paypal_active && (
                                            <div>
                                                <div className="cs_checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="payment_method"
                                                        id="paypal"
                                                        value="paypal"
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.payment_method = e.target.value
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="paypal">
                                                        {translate("Paypal")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {payment_gateway.is_stripe_active && (
                                            <div>
                                                <div className="cs_checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="payment_method"
                                                        id="Stripe"
                                                        value="stripe"
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.payment_method = e.target.value
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="Stripe">
                                                        {translate("Stripe")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {payment_gateway.is_sslcz_active && (
                                            <div>
                                                <div className="cs_checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="payment_method"
                                                        id="sslcmz"
                                                        value="sslcmz"
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.payment_method = e.target.value
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="sslcmz">
                                                        {translate("Sslcommerz")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {payment_gateway.is_flutterwave_active && (
                                            <div>
                                                <div className="cs_checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="payment_method"
                                                        id="flutterwave"
                                                        value="flutterwave"
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.payment_method = e.target.value
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="flutterwave">
                                                        {translate("Flutterwave")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                        {payment_gateway.is_razorpay_active && (
                                            <div>
                                                <div className="cs_checkbox">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="payment_method"
                                                        id="razorpay"
                                                        value="razorpay"
                                                        onChange={(e) =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.payment_method = e.target.value
                                                                })
                                                            )
                                                        }
                                                    />
                                                    <label className="form-check-label" htmlFor="razorpay">
                                                        {translate("Razorpay")}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {errors.payment_method && <span className="text-danger">{errors.payment_method}</span>}
                                    <div className="cs_height_20 cs_height_lg_20"></div>
                                </div>
                                <div className="col-lg-12">
                                    {is_active_google_captcha === "1" && (
                                        <>
                                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                                        </>
                                    )}
                                    <div className="cs_height_20 cs_height_lg_20" />
                                </div>
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
                                <div className="col-sm-12">
                                    <button
                                        onClick={handlePay}
                                        disabled={!captchaError && processing}
                                        className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color"
                                    >
                                        {translate("Pay Now")}
                                        <span>
                                            <i>
                                                <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </i>
                                            <i>
                                                <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "column",
                                    gap: "25px"
                                }}
                            >
                                {flash.payment_status === "success" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "green",
                                                borderRadius: "50%",
                                                color: "#ffffff"
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-check"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </div>
                                        <h3>{translate("Payment has been success")}</h3>
                                    </>
                                )}

                                {flash.payment_status === "failed" && (
                                    <>
                                        <div
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                background: "red",
                                                borderRadius: "50%",
                                                color: "#ffffff"
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="icon icon-tabler icon-tabler-x"
                                                width={40}
                                                height={40}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M18 6l-12 12" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </div>
                                        <h3>{translate("Payment has been failed")}!</h3>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="cs_height_150 cs_height_lg_80"></div>
                <hr />
            </div>
        </FrontendLayout>
    )
}
