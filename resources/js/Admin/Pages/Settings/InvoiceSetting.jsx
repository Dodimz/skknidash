import { useForm, Head } from "@inertiajs/react"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import translate from "@/utils/translate"

export default function InvoiceSetting({ invoice_setting }) {
    const { data, setData, errors, put } = useForm(invoice_setting)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.invoice.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Invoice Settings" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Invoice Settings")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Invoice Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div class="alert alert-warning" role="alert">
                                        {translate("Please upload a PNG image for the invoice logo. Thank you!")}
                                    </div>
                                    <div className="form-group">
                                        <label>{translate("Invoice Logo")}</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData("invoice_logo", e)
                                            }}
                                            handleRemoved={() => setData("invoice_logo", "")}
                                            defaultValue={data.invoice_logo}
                                        />
                                    </div>
                                    <FromValidationError message={errors?.invoice_logo} />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="footer_address">{translate("Footer Address")}</label>
                                            <TextInput
                                                title="Footer Address"
                                                type="text"
                                                id="footer_address"
                                                error={errors?.footer_address}
                                                value={data.footer_address}
                                                onChange={(e) => setData("footer_address", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="footer_contact">{translate("Footer Contact")}</label>
                                            <TextInput
                                                title="Footer Contact"
                                                type="text"
                                                id="footer_contact"
                                                error={errors?.footer_contact}
                                                value={data.footer_contact}
                                                onChange={(e) => setData("footer_contact", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <button type="submit" className="btn btn-success">
                                        {translate("Update")}
                                    </button>
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
