import Amount from "@/Components/Amount"
import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import { Head, Link } from "@inertiajs/react"
import React from "react"
import DOMPurify from "dompurify"

export default function Index({ orders }) {
    // page header data
    let pageHeaderData = {
        title: translate("Orders"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Orders"), url: null }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Orders" />
            <div className="cs_dashboard_right">
                <div className="cs_table_wrap">
                    <div className="table-responsive">
                        <table className="cs_table_1 m-0">
                            <thead>
                                <tr>
                                    <th>{translate("Order ID")}</th>
                                    <th>{translate("Order Date")}</th>
                                    <th>{translate("Amount")}</th>
                                    <th>{translate("Payment Status")}</th>
                                    <th>{translate("Status")}</th>
                                    <th>{translate("Action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.data?.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Amount amount={order.total_price} />
                                        </td>
                                        <td
                                            className={`cs_medium ${order.payment_status === "0"
                                                    ? "cs_green_color"
                                                    : order.payment_status === "1"
                                                        ? "cs_blue_color"
                                                        : order.payment_status === "2"
                                                            ? "cs_purple_color"
                                                            : "cs_red_color"
                                                }`}
                                        >
                                            {order.payment_status === "0"
                                                ? "Initialize"
                                                : order.payment_status === "1"
                                                    ? "Awaiting Payment"
                                                    : order.payment_status === "2"
                                                        ? "Success"
                                                        : "Cancel"}
                                        </td>
                                        <td className="cs_purple_color cs_medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</td>
                                        <td>
                                            <a href={route("user.download.invoice", order)} type="button" download>
                                                {translate("Download Invoice")}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {orders?.total === 0 && (
                                    <tr>
                                        <td colspan="7" class="text-center">
                                            {translate("Data Not Found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="cs_table_1_footer">
                        <div className="cs_table_1_footer_left"></div>
                        <div className="cs_table_1_footer_right">
                            <ul className="pagination justify-content-center justify-content-md-start mb-0">
                                {orders?.links.map((link, index) => (
                                    <li key={index} className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}>
                                        {link.url ? (
                                            <Link
                                                className="page-link"
                                                href={link.url}
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(link.label)
                                                }}
                                            />
                                        ) : (
                                            <span
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(link.label)
                                                }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </UserDashboardLayout>
    )
}
