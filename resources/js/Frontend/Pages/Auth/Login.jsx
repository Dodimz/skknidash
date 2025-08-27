import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Icon } from "@iconify/react"
import { Link, useForm } from "@inertiajs/react"
import translate from "@/utils/translate"
import BioneMeta from "@/utils/BioneMeta"
import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import LoginLink from "@/Frontend/Components/LoginLink"

export default function Login({ is_facebook_login_active, is_demo, is_google_login_active, meta_tags, tagline, site_name, flash }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key") ? JSON.parse(localStorage.getItem("google_captcha_site_key")) : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)

    const { data, errors, post, setData, processing } = useForm({
        login: "",
        password: "",
        remember: false
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
    const handleLogin = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("login.store"), {
            onSuccess: () => window.location.reload()
        })
    }

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Login with your account")}</h1>
                {flash.success && <div className="alert alert-success">{translate(flash.success)}</div>}
                <div className="">
                    <div className="cs_mb_15">
                        <label htmlFor="login">{translate("Email")}*</label>
                        <input
                            id="login"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("login", e.target.value)}
                            value={data?.login}
                        />
                        <span style={{ color: "red" }}>{errors.login}</span>
                    </div>
                    <div className="cs_mb_15">
                        <label htmlFor="password">{translate("Password")}*</label>
                        <input id="password" type="password" className="cs_form_field" onChange={(e) => setData("password", e.target.value)} />
                        <span style={{ color: "red" }}>{errors.password}</span>
                    </div>
                    <div className="cs_card_row_1 cs_mb_15">
                        <div>
                            <div className="cs_custom_checkbox">
                                <input
                                    className="cs_custom_checkbox_input"
                                    type="checkbox"
                                    id="gridCheck"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                />
                                <label htmlFor="gridCheck" className="cs_custom_checkbox_label">
                                    {translate("Remember me")}
                                </label>
                            </div>
                        </div>
                        <div>
                            <Link href={route("forgot.password")} className="cs_card_text_btn">
                                {translate("Forgot Password")}?
                            </Link>
                        </div>
                    </div>
                    {is_active_google_captcha === "1" && (
                        <div className="cs_mb_15">
                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                            {is_demo && (
                                <div style={{ marginTop: "20px" }}>
                                    <LoginLink
                                        label="Quick login as User"
                                        redirectUrl={route("user.dashboard")}
                                        email="user@example.com"
                                        className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100"
                                    />
                                    <LoginLink
                                        label="Quick login as Admin"
                                        redirectUrl={route("admin.dashboard")}
                                        email="admin@example.com"
                                        className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100 mt-2"
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    <div className="cs_mb_20">
                        <button
                            type="submit"
                            onClick={handleLogin}
                            disabled={!captchaError && processing}
                            className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100"
                        >
                            {translate("Login")}
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
                        {translate("Don't have an account")}?{" "}
                        <Link href={route("register")} className="cs_card_text_btn">
                            {translate("Register Now")}
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    )
}
