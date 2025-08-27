import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import translate from "@/utils/translate"
import { Head, Link, useForm, usePage } from "@inertiajs/react"

export default function VerifyEmail() {
    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title={translate("Verify your mail")} />
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Verify your mail")}!</h1>
                <p>
                    {translate(
                        "Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."
                    )}
                </p>
                <div className="alert alert-success">
                    {translate("A new verification link has been sent to the email address you provided during registration.")}
                </div>
                <div>
                    <Link
                        method="post"
                        href={route("verification.send")}
                        className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100"
                    >
                        {translate("Resend Verification Email")}
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
                    <Link
                        method="post"
                        href={route("logout")}
                        className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm w-100 mt-3"
                    >
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
