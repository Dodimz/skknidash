import TextInput from "@/Admin/Components/Inputs/TextInput"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { useForm, Head } from "@inertiajs/react"

export default function CurrencySettings({ currency_info }) {
    const { data, setData, errors, put } = useForm(currency_info)

    // update payment gateway configure
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.settings.currency.setting.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Currency Settings" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{"Currency Settings"}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Currency Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="currency_name">{translate("Currency Name")}</label>
                                            <TextInput
                                                title="Currency Name"
                                                type="text"
                                                id="currency_name"
                                                error={errors?.currency_name}
                                                value={data.currency_name}
                                                onChange={(e) => setData("currency_name", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="currency_code">{translate("Currency Code")}</label>
                                            <TextInput
                                                title="Currency Code"
                                                type="text"
                                                id="currency_code"
                                                error={errors?.currency_code}
                                                value={data.currency_code}
                                                onChange={(e) => setData("currency_code", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="currency_symble">{translate("Currency Symbol")}</label>
                                            <TextInput
                                                title="Currency Symbol"
                                                type="text"
                                                id="currency_symble"
                                                error={errors?.currency_symbol}
                                                value={data.currency_symbol}
                                                onChange={(e) => setData("currency_symbol", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-md">
                                                <label htmlFor="currency_direction">{translate("Currency Position")}</label>
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        id="currency_direction"
                                                        onChange={(e) => setData("currency_position", e.target.value)}
                                                        value={data.currency_position}
                                                    >
                                                        <option value="">{translate("Select Position")}</option>
                                                        <option value="left">{translate("Left")}</option>
                                                        <option value="right">{translate("Right")}</option>
                                                        <option value="left_space">{translate("Left With Space")}</option>
                                                        <option value="right_space">{translate("Right With Space")}</option>
                                                    </select>
                                                    <FromValidationError message={errors?.currency_position} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group form-group-md">
                                                <label htmlFor="decimal_separator">{translate("Decimal Separator")}</label>
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        id="decimal_separator"
                                                        onChange={(e) => setData("decimal_separator", e.target.value)}
                                                        value={data.decimal_separator}
                                                    >
                                                        <option value="en-US">1,23,456.70</option>
                                                        <option value="de-DE">1.23.456,70</option>
                                                    </select>
                                                    <FromValidationError message={errors?.decimal_separator} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-md">
                                                <label htmlFor="no_of_decimal">{translate("No of decimals")}</label>
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        id="no_of_decimal"
                                                        onChange={(e) => setData("no_of_decimal", e.target.value)}
                                                        value={data.no_of_decimal}
                                                    >
                                                        <option value="0">12345</option>
                                                        <option value="1">1234.5</option>
                                                        <option value="2">123.45</option>
                                                        <option value="3">12.345</option>
                                                    </select>
                                                    <FromValidationError message={errors?.no_of_decimal} />
                                                </div>
                                            </div>
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
