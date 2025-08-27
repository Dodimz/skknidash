import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Icon } from "@iconify/react"
import { Head, Link, useForm } from "@inertiajs/react"
import translate from "@/utils/translate"
import BioneMeta from "@/utils/BioneMeta"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"

export default function Register({ terms_condition_url, is_facebook_login_active, is_google_login_active, meta_tags, tagline, site_name }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key") ? JSON.parse(localStorage.getItem("google_captcha_site_key")) : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)

    const { data, setData, errors, post, processing } = useForm({
        name: "",
        email: "",
        about: "",
        password: "",
        password_confirmation: "",
        agreed: false
    })

    BioneMeta(tagline, "", meta_tags, "", "", site_name)

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

    // handle login
    const handleSignUp = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("register"))
    }

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title="Register" />
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Create your account")}</h1>
                <form onSubmit={handleSignUp} className="">
                    <div className="cs_mb_15">
                        <label htmlFor="name">{translate("Name")}*</label>
                        <input id="name" type="text" className="cs_form_field" onChange={(e) => setData("name", e.target.value)} value={data?.name} />
                        <span style={{ color: "red" }}>{errors.name}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="email">{translate("Email")}*</label>
                        <input
                            id="email"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("email", e.target.value)}
                            value={data?.email}
                        />
                        <span style={{ color: "red" }}>{errors.email}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="about">{translate("About")}*</label>
                        <input
                            id="about"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("about", e.target.value)}
                            value={data?.about}
                        />
                        <span style={{ color: "red" }}>{errors.about}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="password">{translate("Password")}*</label>
                        <input id="password" type="password" className="cs_form_field" onChange={(e) => setData("password", e.target.value)} />
                        <span style={{ color: "red" }}>{errors.password}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="password_confirmation">{translate("Confirm Password")}*</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            className="cs_form_field"
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                        />
                        <span style={{ color: "red" }}>{errors.password_confirmation}</span>
                    </div>
                    {is_active_google_captcha === "1" && (
                        <div className="cs_mb_15">
                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                        </div>
                    )}
                    <div className="cs_mb_15">
                        <div className="cs_custom_checkbox">
                            <input
                                className="cs_custom_checkbox_input"
                                type="checkbox"
                                id="gridCheck"
                                checked={data.agreed}
                                onChange={(e) => setData("agreed", e.target.checked)}
                            />
                            <label htmlFor="gridCheck" className="cs_custom_checkbox_label">
                                <Link href={terms_condition_url}>{translate("Accept Terms And Conditions")}</Link>
                            </label>
                        </div>
                        <br />
                        {errors.agreed && <span style={{ color: "red" }}>{errors.agreed}</span>}
                    </div>
                    <div className="cs_mb_20">
                        <button
                            type="submit"
                            disabled={!captchaVerified && processing}
                            className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100"
                        >
                            {translate("Register")}
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
                    <p className="cs_mb_20 cs_or_login">
                        {(is_facebook_login_active || is_google_login_active) && <span>{translate("Or login with")}</span>}
                    </p>
                    <div className="cs_social_btns cs_mb_20">
                        {is_facebook_login_active && (
                            <a href={route("social.redirect", "facebook")} className="cs_social_btn cs_social_btn_facebook">
                                <Icon style={{ fontSize: "22px" }} icon="logos:facebook" />
                                {translate("Login With Facebook")}
                            </a>
                        )}
                        {is_google_login_active && (
                            <a href={route("social.redirect", "google")} className="cs_social_btn cs_social_btn_google">
                                <Icon style={{ fontSize: "22px" }} icon="logos:google-icon" />
                                {translate("Login With Google")}
                            </a>
                        )}
                    </div>
                    <p className="mb-0 cs_primary_color">
                        {translate("Already have an account")}?{" "}
                        <Link href={route("login.create")} className="cs_card_text_btn">
                            {translate("Sign In Now")}
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}
