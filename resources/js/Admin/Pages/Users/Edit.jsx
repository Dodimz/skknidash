import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function Edit({ roles, user }) {
    const { data, setData, errors, put, processing } = useForm({
        name: user.name,
        email: user.email,
        about: user.about,
        role: user.role_name,
        password: ""
    })

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.users.update", user))
    }
    return (
        <AdminLayouts>
            <Head title="Edit User" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit User")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("User Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title={`${translate("Name")} *`}
                                        type="text"
                                        id="name"
                                        error={errors?.name}
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <TextInput
                                        title={`${translate("Email")} *`}
                                        type="email"
                                        id="email"
                                        error={errors?.email}
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                    />
                                    <TextInput
                                        title={`${translate("Password")} *`}
                                        type="password"
                                        id="password"
                                        error={errors?.password}
                                        value={data.password}
                                        onChange={(e) => setData("password", e.target.value)}
                                    />
                                    <TextInput
                                        title={`${translate("About")} *`}
                                        type="text"
                                        id="about"
                                        error={errors?.about}
                                        value={data.about}
                                        onChange={(e) => setData("about", e.target.value)}
                                    />
                                    <div className="form-group form-group-md">
                                        <div className="yoo-select">
                                            <select
                                                className={`form-control ${errors.role ? "is-invalid" : ""}`}
                                                onChange={(e) => setData("role", e.target.value)}
                                                value={data.role}
                                            >
                                                <option>{translate("Select Role")}</option>
                                                {roles.map((role, index) => (
                                                    <option key={index} value={role.name}>
                                                        {role.title}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-success">
                                            {translate("Update")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
