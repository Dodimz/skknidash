import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import { Head, useForm, usePage } from "@inertiajs/react"

export default function ChangePassword() {
    // page header data
    let pageHeaderData = {
        title: translate("Change Password"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Dashboard"), url: route("user.profile.change.password") }
        ]
    }
    const { auth, flash } = usePage().props
    const { data, setData, errors, patch, processing, wasSuccessful } = useForm({
        _method: "patch",
        current_password: "",
        password: "",
        password_confirmation: ""
    })

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await patch(route("profile.update.password"))
            setData({
                current_password: "",
                password: "",
                password_confirmation: ""
            })
        } catch (error) {
            console.error("Password update failed:", error)
        }
    }
    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Change Password" />
            <div className="cs_dashboard_right">
                <div className="cs_dashboard_card">
                    <form onSubmit={handleFormSubmit} className="row cs_gap_y_20">
                        <div className="col-lg-12">
                            <label htmlFor="current_password">{translate("Current Password")}</label>
                            <input
                                type="password"
                                id="current_password"
                                className="cs_form_field cs_radius_20"
                                value={data.current_password}
                                onChange={(e) => setData("current_password", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.current_password}</span>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="password">{translate("New Password")}</label>
                            <input
                                type="password"
                                id="password"
                                className="cs_form_field cs_radius_20"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.password}</span>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="password_confirmation">{translate("Confirm New Password")}</label>
                            <input
                                type="password"
                                id="password_confirmation"
                                className="cs_form_field cs_radius_20"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.password_confirmation}</span>
                        </div>
                        {wasSuccessful && <span className="text-success">{flash.success}</span>}
                        <div className="col-lg-12 text-end">
                            <button type="submit" disabled={processing} className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color">
                                {translate("Update")}
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
            </div>
        </UserDashboardLayout>
    )
}
