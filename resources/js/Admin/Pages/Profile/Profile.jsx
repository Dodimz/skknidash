import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, router, useForm, usePage } from "@inertiajs/react"
import { IonIcon } from "@ionic/react"
import { key, newspaperOutline, people } from "ionicons/icons"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import translate from "@/utils/translate"
export default function Profile() {
    const { auth } = usePage().props
    const { data, setData, errors, put } = useForm(auth.user)
    const {
        data: password,
        setData: setPassword,
        errors: passwordError,
        put: passwordPut,
        reset
    } = useForm({
        old_password: "",
        password: "",
        password_confirmation: ""
    })
    // handle update profile
    const handleUpdateProfile = (e) => {
        e.preventDefault()
        put(route("admin.profile"))
    }

    // handle update password
    const handleUpdatePassword = (e) => {
        e.preventDefault()
        passwordPut(route("admin.change.password"), {
            onSuccess: () => {
                reset("old_password", "password", "password_confirmation")
            }
        })
    }

    return (
        <AdminLayouts>
            <Head title="Profile" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Profile")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="yoo-card yoo-style1 mb-5">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-blue-bg">
                                    <IonIcon
                                        icon={people}
                                        style={{
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                {translate("Profile info")}
                            </h2>
                        </div>
                    </div>
                    <div className="yoo-card-body">
                        <form onSubmit={handleUpdateProfile} className="yoo-padd-lr-20">
                            <div className="yoo-height-b20 yoo-height-lg-b20" />
                            <TextInput
                                title="Name *"
                                type="text"
                                id="name"
                                error={errors?.name}
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            <TextInput
                                title="Email *"
                                type="email"
                                id="email"
                                disabled
                                error={errors?.email}
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            <TextInput
                                title="About *"
                                type="text"
                                id="about"
                                error={errors?.about}
                                value={data.about}
                                onChange={(e) => setData("about", e.target.value)}
                            />
                            <div className="mb-3">
                                <span>
                                    {translate("You can change your profile from")}{" "}
                                    <a style={{ color: "blue" }} href="https://gravatar.com/" target="_blank">
                                        here.
                                    </a>
                                </span>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-success">
                                    {translate("Update")}
                                </button>
                            </div>
                            <div className="yoo-height-b20 yoo-height-lg-b20" />
                        </form>
                    </div>
                </div>
                <div className="yoo-card yoo-style1">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-blue-bg">
                                    <IonIcon
                                        icon={key}
                                        style={{
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                {translate("Update password")}
                            </h2>
                        </div>
                    </div>
                    <div className="yoo-card-body">
                        <form onSubmit={handleUpdatePassword} className="yoo-padd-lr-20">
                            <div className="yoo-height-b20 yoo-height-lg-b20" />
                            <TextInput
                                title="Old Password *"
                                type="password"
                                id="old_pass"
                                value={password.old_password}
                                error={passwordError?.old_password}
                                onChange={(e) => setPassword("old_password", e.target.value)}
                            />
                            <TextInput
                                title="New Password *"
                                type="password"
                                id="new_pass"
                                value={password.password}
                                error={passwordError?.password}
                                onChange={(e) => setPassword("password", e.target.value)}
                            />
                            <TextInput
                                title="Confirm New Password *"
                                type="password"
                                id="confirm_new"
                                value={password.password_confirmation}
                                error={passwordError?.password_confirmation}
                                onChange={(e) => setPassword("password_confirmation", e.target.value)}
                            />
                            <div>
                                <button type="submit" className="btn btn-success">
                                    {translate("Update")}
                                </button>
                            </div>
                            <div className="yoo-height-b20 yoo-height-lg-b20" />
                        </form>
                    </div>
                </div>
                {/* .yoo-card */}
                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
