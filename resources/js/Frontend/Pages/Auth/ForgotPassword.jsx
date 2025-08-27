import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Head, useForm } from "@inertiajs/react"
import translate from "@/utils/translate"
import ReCAPTCHA from "react-google-recaptcha"
import { useState } from "react"
import BioneMeta from "@/utils/BioneMeta"

export default function ForgotPassword({ flash, meta_tags, tagline, site_name }) {
    const captchaSiteKey = localStorage.getItem("google_captcha_site_key") ? JSON.parse(localStorage.getItem("google_captcha_site_key")) : []
    const is_active_google_captcha = localStorage.getItem("is_active_google_captcha")
        ? JSON.parse(localStorage.getItem("is_active_google_captcha"))
        : []
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const [captchaError, setCaptchaError] = useState(null)

    const { data, setData, errors, post, processing } = useForm({
        email: ""
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

    // handle forget password
    const handleForgetPass = (e) => {
        e.preventDefault()

        if (!captchaVerified && is_active_google_captcha === "1") {
            setCaptchaError(translate("Please complete the captcha verification"))
            return
        }

        post(route("forgot.password"))
    }

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title={translate("Recover your password")} />
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Recover your password")}!</h1>
                {flash.error && <div className="alert alert-danger">{flash.error}</div>}
                <p>
                    {translate(
                        "We understand you need to reset your password. Please enter the email address associated with your account, and we'll send you a One-Time Password (OTP) to verify your identity. Use the OTP to proceed with setting up a new password."
                    )}
                </p>
                <form onSubmit={handleForgetPass} className="">
                    <div className="cs_mb_15">
                        <label id="email">{translate("Your Registered Email Address")}*</label>
                        <input
                            id="email"
                            type="text"
                            className="cs_form_field"
                            onChange={(e) => setData("email", e.target.value)}
                            value={data?.email}
                        />
                        <span style={{ color: "red" }}>{errors.email}</span>
                    </div>
                    {is_active_google_captcha && (
                        <div className="cs_mb_15">
                            <ReCAPTCHA sitekey={captchaSiteKey} onChange={handleCaptchaChange} />
                            {captchaError && <div className="text-danger mb-3">{captchaError}</div>}
                        </div>
                    )}
                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100"
                        >
                            {translate("Submit")}
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
                </form>
            </div>
        </AuthLayout>
    )
}
