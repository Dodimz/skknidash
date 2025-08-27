import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import translate from "@/utils/translate"
import { produce } from "immer"

export default function GoogleCaptcha({ get_captcha_config }) {
    const { data, setData, errors, put, processing } = useForm(get_captcha_config)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.google.captcha.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Google Captcha Setting" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Google Captcha Setting")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Google Captcha Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="Google Captcha Site Key"
                                        type="text"
                                        id="google_captcha_site_key"
                                        error={errors?.google_captcha_site_key}
                                        value={data.google_captcha_site_key}
                                        onChange={(e) => setData("google_captcha_site_key", e.target.value)}
                                    />
                                    <div className="form-group">
                                        <label
                                            htmlFor=""
                                            style={{
                                                display: "flex",
                                                gap: "10px",
                                                marginBottom: "0"
                                            }}
                                        >
                                            {translate("Is active google captcha")}:{" "}
                                            <div
                                                className={`yoo-switch ${data.is_active_google_captcha === "1" ? "active" : ""}`}
                                                onClick={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.is_active_google_captcha = draft.is_active_google_captcha === "0" ? "1" : "0"
                                                        })
                                                    )
                                                }
                                            >
                                                <div className="yoo-switch-in" />
                                            </div>
                                        </label>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-success" disabled={processing}>
                                            {translate("Update")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
