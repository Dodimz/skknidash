import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { Head } from "@inertiajs/react"
import moment from "moment"

export default function Show({ paymentHistory }) {
    return (
        <AdminLayouts>
            <Head title="Payment Details" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Payment Details")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <ul className="yoo-contact-info-list yoo-mp0">
                    <li>
                        <div className="yoo-contact-info-label">{translate("Pricing Plan")}</div>
                        <div className="yoo-contact-info-details yoo-table-medias yoo-style1">
                            {paymentHistory.plan ? (
                                <a href={route("pricing.plan", paymentHistory.plan)} target="_blank">
                                    {paymentHistory.plan.name}
                                </a>
                            ) : (
                                <span style={{ color: "black" }}>{translate("Plan does not exist")}</span>
                            )}
                        </div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Name")}</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.name}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Email")}</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.email}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Mobile Number")}</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.mobile}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Payed Amount")}</div>
                        <div className="yoo-contact-info-details">
                            {paymentHistory?.plan?.currency?.symbol} {paymentHistory?.amount}
                        </div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Payment Method")}</div>
                        <div className="yoo-contact-info-details">{paymentHistory.method}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Whatsapp or Skype")}</div>
                        <div className="yoo-contact-info-details">{paymentHistory.whatsapp_or_skype}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Payment Status")}</div>
                        <div className="yoo-contact-info-details">
                            {paymentHistory.status === "pending" && <span className="">{translate("Pending")}</span>}
                            {paymentHistory.status === "awaiting_payment" && <span className="">{translate("Awaiting Payment")}</span>}
                            {paymentHistory.status === "success" && <span className="">{translate("Success")}</span>}
                            {paymentHistory.status === "failed" && <span className="">{translate("Failed")}</span>}
                        </div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Date")}</div>
                        <div className="yoo-contact-info-details">{moment(paymentHistory.created_at).format("lll")}</div>
                    </li>
                </ul>
                <div className="mt-5">
                    <strong>{translate("Note")}: </strong> <br />
                    <p>{paymentHistory.note}</p>
                </div>

                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
