import AuthLayout from "@/Frontend/Layouts/AuthLayout"
import { Head, useForm } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function ResetPassword({ status, token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        email: email,
        token: token,
        password: "",
        password_confirmation: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("rest.password.update"))
    }

    return (
        <AuthLayout>
            <div className="cs_card_card_in">
                <Head title={translate("Reset Password")} />
                <h1 className="cs_fs_30 cs_medium cs_mb_30">{translate("Reset Password")}</h1>

                {status && <div className="alert alert-success mb-4">{translate("status")}</div>}

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="token" value={token} />

                    <div className="cs_mb_15">
                        <label htmlFor="email">{translate("Email")}</label>
                        <input
                            id="email"
                            type="email"
                            className="cs_form_field_2 cs_radius_20"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            disabled
                        />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>

                    <div className="cs_mb_15">
                        <label htmlFor="password">{translate("New Password")}</label>
                        <input
                            id="password"
                            type="password"
                            className="cs_form_field_2 cs_radius_20"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            required
                        />
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>

                    <div className="cs_mb_15">
                        <label htmlFor="password_confirmation">{translate("Confirm Password")}</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            className="cs_form_field_2 cs_radius_20"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" disabled={processing} className="cs_btn cs_style_2 cs_accent_btn cs_medium cs_radius_20 cs_fs_15 w-100">
                        {translate("Reset Password")}
                    </button>
                </form>
            </div>
        </AuthLayout>
    )
}
