import { useForm, Head } from "@inertiajs/react"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import translate from "@/utils/translate"

export default function Create() {
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        code: "",
        discount_value: "",
        discount_type: "",
        start_date: "",
        end_date: ""
    })

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        post(route("admin.coupons.store"))
    }

    return (
        <AdminLayouts>
            <Head title="Create Coupon" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Create Coupon")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Coupon Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="name">{translate("Coupon Name")}</label>
                                            <TextInput
                                                title="Enter Coupon Name"
                                                type="text"
                                                id="name"
                                                error={errors.name}
                                                value={data.name}
                                                onChange={(e) => setData("name", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="code">{translate("Coupon Code")}</label>
                                            <TextInput
                                                title="Enter Coupon Code"
                                                type="text"
                                                id="code"
                                                error={errors.code}
                                                value={data.code}
                                                onChange={(e) => setData("code", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-md">
                                                <label htmlFor="discount_type">{translate("Coupon Discount Type")}</label>
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        id="discount_type"
                                                        onChange={(e) => setData("discount_type", e.target.value)}
                                                        value={data.discount_type}
                                                    >
                                                        <option value="">{translate("Select Discount Type")}</option>
                                                        <option value="fixed">{translate("Fixed")}</option>
                                                        <option value="percentage">{translate("Percentage")}</option>
                                                    </select>
                                                    <FromValidationError message={errors?.discount_type} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="discount_value">{translate("Coupon Discount Value")}</label>
                                            <TextInput
                                                title="Enter Coupon Discount Value"
                                                type="number"
                                                id="discount_value"
                                                error={errors.discount_value}
                                                value={data.discount_value}
                                                onChange={(e) => setData("discount_value", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="start_date">{translate("Coupon Start Date")}</label>
                                            <TextInput
                                                title=""
                                                type="date"
                                                id="start_date"
                                                error={errors.start_date}
                                                value={data.start_date}
                                                onChange={(e) => setData("start_date", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="end_date">{translate("Coupon End Date")}</label>
                                            <TextInput
                                                title=""
                                                type="date"
                                                id="end_date"
                                                error={errors.end_date}
                                                value={data.end_date}
                                                onChange={(e) => setData("end_date", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <button type="submit" className="btn btn-success">
                                        {translate("Submit")}
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
