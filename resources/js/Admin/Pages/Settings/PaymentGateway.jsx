import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function PaymentGateway({ gateway_credentials }) {
    const { data, setData, errors, put } = useForm(gateway_credentials)

    // update payment gateway configure
    const updatePaymentGatewayConfigure = () => {
        put(route("admin.settings.payment.gateway.update"))
    }

    return (
        <AdminLayouts>
            <Head title="Payment Gateways" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Payment Gateway Configure")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Paypal Credential")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.paypal_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.paypal_is_active === "1" ? setData("paypal_is_active", "0") : setData("paypal_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Is Sandbox")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.paypal_is_sandbox === "1" && "active"}`}
                                            onClick={() =>
                                                data.paypal_is_sandbox === "1" ? setData("paypal_is_sandbox", "0") : setData("paypal_is_sandbox", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title={`${translate("Paypal Client Id")} *`}
                                        type="text"
                                        id="paypal_client_id"
                                        value={data.paypal_client_id}
                                        onChange={(e) => setData("paypal_client_id", e.target.value)}
                                        error={errors.paypal_client_id}
                                    />
                                    <TextInput
                                        title={`${translate("Paypal Client Secret")} *`}
                                        type="text"
                                        id="paypal_client_secret"
                                        value={data.paypal_client_secret}
                                        onChange={(e) => setData("paypal_client_secret", e.target.value)}
                                        error={errors.paypal_client_secret}
                                    />
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Stripe Credential")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.stripe_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.stripe_is_active === "1" ? setData("stripe_is_active", "0") : setData("stripe_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title={`${translate("Stripe Key")} *`}
                                        type="text"
                                        id="stripe_key"
                                        value={data.stripe_key}
                                        onChange={(e) => setData("stripe_key", e.target.value)}
                                        error={errors.stripe_key}
                                    />
                                    <TextInput
                                        title={`${translate("Stripe Secret")} *`}
                                        type="text"
                                        id="stripe_secret"
                                        value={data.stripe_secret}
                                        onChange={(e) => setData("stripe_secret", e.target.value)}
                                        error={errors.stripe_secret}
                                    />
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Sslcommerz Credential")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.sslcz_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.sslcz_is_active === "1" ? setData("sslcz_is_active", "0") : setData("sslcz_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Is Sandbox")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.sslcz_is_sandbox === "1" && "active"}`}
                                            onClick={() =>
                                                data.sslcz_is_sandbox === "1" ? setData("sslcz_is_sandbox", "0") : setData("sslcz_is_sandbox", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title={`${translate("Sslcz Store Id")} *`}
                                        type="text"
                                        id="sslcz_store_id"
                                        value={data.sslcz_store_id}
                                        onChange={(e) => setData("sslcz_store_id", e.target.value)}
                                        error={errors.sslcz_store_id}
                                    />
                                    <TextInput
                                        title={`${translate("Sslcz store password")} *`}
                                        type="text"
                                        id="sslcz_store_password"
                                        value={data.sslcz_store_password}
                                        onChange={(e) => setData("sslcz_store_password", e.target.value)}
                                        error={errors.sslcz_store_password}
                                    />
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Flutterwave")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.flutterwave_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.flutterwave_is_active === "1"
                                                    ? setData("flutterwave_is_active", "0")
                                                    : setData("flutterwave_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title={`${translate("Secret Key")} *`}
                                        type="text"
                                        id="app_secret_key"
                                        value={data.flutterwave_secret_key}
                                        onChange={(e) => setData("flutterwave_secret_key", e.target.value)}
                                        error={errors.flutterwave_secret_key}
                                    />
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Razorpay")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.razorpay_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.razorpay_is_active === "1"
                                                    ? setData("razorpay_is_active", "0")
                                                    : setData("razorpay_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <TextInput
                                        title={`${translate("Key id")} *`}
                                        type="text"
                                        id="razorpay_key_id"
                                        value={data.razorpay_key_id}
                                        onChange={(e) => setData("razorpay_key_id", e.target.value)}
                                        error={errors.razorpay_key_id}
                                    />
                                    <TextInput
                                        title={`${translate("Key secret")} *`}
                                        type="text"
                                        id="razorpay_key_secret"
                                        value={data.razorpay_key_secret}
                                        onChange={(e) => setData("razorpay_key_secret", e.target.value)}
                                        error={errors.razorpay_key_secret}
                                    />

                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Cash On Delivery")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="input-group mb-3">
                                        <div className="labe">{translate("Active")}</div>
                                        <div
                                            className={`yoo-switch mx-2 ${data.cod_is_active === "1" && "active"}`}
                                            onClick={() =>
                                                data.cod_is_active === "1"
                                                    ? setData("cod_is_active", "0")
                                                    : setData("cod_is_active", "1")
                                            }
                                        >
                                            <div className="yoo-switch-in" />
                                        </div>
                                    </div>
                                    <div className="form-group mb-0 text-right">
                                        <button onClick={updatePaymentGatewayConfigure} type="submit" className="btn btn-sm btn-primary">
                                            {translate("Save")}
                                        </button>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    )
}
