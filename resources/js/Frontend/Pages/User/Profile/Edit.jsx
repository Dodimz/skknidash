import Spacing from "@/Frontend/Components/Spacing"
import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import { Head, useForm, usePage } from "@inertiajs/react"

export default function edit() {
    const { auth, flash } = usePage().props
    const user = auth.user
    const { data, setData, errors, post, processing, wasSuccessful } = useForm({
        _method: "put",
        avatar: null,
        name: user.name,
        email: user.email,
        about: user.about
    })

    const handleFormSubmit = (e) => {
        e.preventDefault()
        post(route("user.profile.update", user), {
            preserveScroll: true
        })
    }

    // page header data
    let pageHeaderData = {
        title: translate("Update Profile"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Dashboard"), url: route("user.profile.change.password") }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Profile Settings" />
            <div className="cs_dashboard_right">
                <div className="cs_dashboard_card">
                    <form onSubmit={handleFormSubmit} className="row cs_gap_y_20">
                        <img src={user?.image_url} style={{ marginBottom: "10px", width: "150px" }} alt="" />
                        <div className="col-lg-12">
                            <label htmlFor="avatar">{translate("Avatar")}*</label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                className="cs_form_field cs_radius_20"
                                onChange={(e) => setData("avatar", e.target.files[0])}
                            />
                            <span style={{ color: "red" }}>{errors.avatar}</span>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="name">{translate("Full Name")}*</label>
                            <input
                                type="text"
                                id="name"
                                className="cs_form_field cs_radius_20"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.name}</span>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="email">{translate("Email Address")}*</label>
                            <input
                                type="text"
                                id="email"
                                className="cs_form_field cs_radius_20"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.email}</span>
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="about">{translate("About")}</label>
                            <input
                                type="text"
                                id="about"
                                className="cs_form_field cs_radius_20"
                                value={data.about}
                                onChange={(e) => setData("about", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.about}</span>
                        </div>
                        {wasSuccessful && <span className="text-success">{flash.success}</span>}
                        <div className="col-lg-12 text-end">
                            <Spacing lg="5" md="5" />
                            <button type="submit" disabled={processing} className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color">
                                {translate("Submit Changes")}
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
