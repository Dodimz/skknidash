import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Head, Link, useForm, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import NProgress from "nprogress"
import translate from "@/utils/translate"

export default function AccountVerify({ retry_after }) {
    const [errorMessage, setErrorMessage] = useState("")
    const [isBlocked, setIsBlocked] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [retryAfter, setRetryAfter] = useState(retry_after)
    const [sendingOtp, setSendingOtp] = useState(false)

    const { data, setData, errors, processing, post } = useForm({
        otp: ""
    })

    const resetOtp = () => {
        NProgress.start()
        setSendingOtp(true)
        setErrorMessage("")
        setSuccessMessage("")
        axios
            .post(route("auth.resent.otp"), { otp: data.otp })
            .then((data) => {
                NProgress.done()
                setSendingOtp(false)
                setSuccessMessage(data.data.message)
            })
            .catch((e) => {
                const error = e.response.data
                setErrorMessage(error.message)
                setRetryAfter(error.retry_after)
                NProgress.done()
                setSendingOtp(false)
                setSuccessMessage("")
            })
    }

    useEffect(() => {
        let timer
        if (retryAfter > 0) {
            setIsBlocked(true)
            timer = setInterval(() => {
                setRetryAfter((prev) => (prev > 0 ? prev - 1 : 0))
            }, 1000)
        } else {
            setIsBlocked(false)
        }
        return () => clearInterval(timer)
    }, [retryAfter])

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title={translate("Verify your account")} />
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Verify your account")}!</h1>
                <p>
                    {translate(
                        "Thanks for signing up! To get started, please verify your account by entering the OTP we sent to your email address or phone number. If you didn't receive the OTP, you can request a new one."
                    )}
                </p>
                {successMessage && <div className="alert alert-success">{translate(successMessage)}</div>}

                {errorMessage && <div className="alert alert-danger">{translate(errorMessage)}</div>}
                <div className="cs_mb_15">
                    <label htmlFor="otp">{translate("Enter OTP")}*</label>
                    <input
                        id="otp"
                        type="number"
                        className="cs_form_field_2 cs_radius_20"
                        onChange={(e) => setData("otp", e.target.value)}
                        value={data?.otp}
                    />
                    <span style={{ color: "red" }}>{errors.otp}</span>
                </div>
                <div>
                    <button onClick={verifyOtp} className="cs_btn cs_style_2 cs_accent_btn cs_medium cs_radius_20 cs_fs_15 w-100 mb-5">
                        {translate("Verify")}
                        <span>
                            <i>
                                <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </i>
                            <i>
                                <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </i>
                        </span>
                    </button>
                    <button
                        onClick={resetOtp}
                        className="cs_btn cs_style_2 cs_accent_btn cs_medium cs_radius_20 cs_fs_15 w-100"
                        disabled={isBlocked || sendingOtp}
                    >
                        {isBlocked ? (
                            <>Retry after {retryAfter}s</>
                        ) : (
                            <>
                                {translate("Resend OTP")}
                                <span>
                                    <i>
                                        <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </i>
                                    <i>
                                        <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </i>
                                </span>
                            </>
                        )}
                    </button>
                    <Link method="post" href={route("logout")} className="cs_btn cs_style_2 cs_accent_btn cs_medium cs_radius_20 cs_fs_15 w-100 mt-3">
                        {translate("Logout")}
                        <span>
                            <i>
                                <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </i>
                            <i>
                                <svg width={9} height={9} viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.00431 0.872828C9.00431 0.458614 8.66852 0.122828 8.25431 0.122828L1.50431 0.122827C1.0901 0.122827 0.754309 0.458614 0.754309 0.872828C0.754309 1.28704 1.0901 1.62283 1.50431 1.62283H7.50431V7.62283C7.50431 8.03704 7.84009 8.37283 8.25431 8.37283C8.66852 8.37283 9.00431 8.03704 9.00431 7.62283L9.00431 0.872828ZM1.53033 8.65747L8.78464 1.40316L7.72398 0.342497L0.46967 7.59681L1.53033 8.65747Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </i>
                        </span>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    )
}
