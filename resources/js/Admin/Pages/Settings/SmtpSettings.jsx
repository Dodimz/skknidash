import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function SmtpSettings({ smtp_config }) {
    const { data, setData, errors, put, processing } = useForm(smtp_config)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.smtp.update"))
    }

    return (
        <AdminLayouts>
            <Head title="SMTP Settings" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("SMTP Settings")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("SMTP Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TextInput
                                        title="MAIL HOST"
                                        type="text"
                                        id="MAIL_HOST"
                                        error={errors?.MAIL_HOST}
                                        value={data.MAIL_HOST}
                                        onChange={(e) => setData("MAIL_HOST", e.target.value)}
                                    />

                                    <TextInput
                                        title="MAIL PORT"
                                        type="number"
                                        id="MAIL_PORT"
                                        error={errors?.MAIL_PORT}
                                        value={data.MAIL_PORT}
                                        onChange={(e) => setData("MAIL_PORT", e.target.value)}
                                    />
                                    <TextInput
                                        title="MAIL USERNAME"
                                        type="text"
                                        id="MAIL_USERNAME"
                                        error={errors?.MAIL_USERNAME}
                                        value={data.MAIL_USERNAME}
                                        onChange={(e) => setData("MAIL_USERNAME", e.target.value)}
                                    />
                                    <TextInput
                                        title="MAIL PASSWORD"
                                        type="text"
                                        id="MAIL_PASSWORD"
                                        error={errors?.MAIL_PASSWORD}
                                        value={data.MAIL_PASSWORD}
                                        onChange={(e) => setData("MAIL_PASSWORD", e.target.value)}
                                    />
                                    <TextInput
                                        title="MAIL ENCRYPTION"
                                        type="text"
                                        id="MAIL_ENCRYPTION"
                                        error={errors?.MAIL_ENCRYPTION}
                                        value={data.MAIL_ENCRYPTION}
                                        onChange={(e) => setData("MAIL_ENCRYPTION", e.target.value)}
                                    />
                                    <TextInput
                                        title="MAIL FROM ADDRESS"
                                        type="text"
                                        id="MAIL_FROM_ADDRESS"
                                        error={errors?.MAIL_FROM_ADDRESS}
                                        value={data.MAIL_FROM_ADDRESS}
                                        onChange={(e) => setData("MAIL_FROM_ADDRESS", e.target.value)}
                                    />
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
