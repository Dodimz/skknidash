import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import { Head, Link } from "@inertiajs/react"
import { Icon } from "@iconify/react"
import Amount from "@/Components/Amount"
import React from "react"
import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"

export default function Dashboard({ total, pending_orders, canceled_orders, completed_orders, payments, tickets, recent_orders }) {
    // page header data
    let pageHeaderData = {
        title: translate("User Dashboard"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Dashboard"), url: route("user.dashboard") }
        ]
    }
    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="User Dashboard" />
            {/* Start Products  */}
            <div className="cs_dashboard_right">
                <h2 className="cs_fs_30 cs_mb_20 cs_normal">{translate("Orders Overview")}</h2>
                <div className="row cs_gap_y_24">
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-solid:file-invoice" />{" "}
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Total")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">{total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-solid:layer-group" />
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Pending")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">{pending_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-regular:circle-check" />
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Completed")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">{completed_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-regular:circle-xmark" />
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Canceled")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">{canceled_orders}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-solid:ticket" />{" "}
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Tickets")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">{tickets}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-md-6">
                        <div className="cs_admin_iconbox cs_radius_5">
                            <div className="cs_admin_iconbox_icon cs_center">
                                <Icon icon="fa6-solid:credit-card" />
                            </div>
                            <div className="cs_admin_iconbox_right">
                                <h3 className="cs_fs_24 cs_mb_2 cs_normal">{translate("Payment")}</h3>
                                <p className="mb-0 cs_medium cs_accent_color">
                                    <Amount amount={payments} />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cs_height_50 cs_height_lg_40" />
                <h2 className="cs_fs_30 cs_mb_20 cs_normal">{translate("Recent Orders")}</h2>
                <div className="cs_table_wrap">
                    <div className="table-responsive">
                        <table className="cs_table_1 m-0">
                            <thead>
                                <tr>
                                    <th>{translate("Order ID")}</th>
                                    <th>{translate("Products")}</th>
                                    <th>{translate("Order Date")}</th>
                                    <th>{translate("Amount")}</th>
                                    <th>{translate("Payment Status")}</th>
                                    <th>{translate("Status")}</th>
                                    <th>{translate("Action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent_orders.map((order, i) => (
                                    <tr key={i}>
                                        <td>{order.order_number}</td>
                                        <td>{order.orderitems?.length ?? 0}</td> {/* Number of items */}
                                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <Amount amount={order.total_price} />
                                        </td>
                                        <td
                                            className={`cs_medium ${
                                                order.payment_status === "0"
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
                                                Download Invoice
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* End Products  */}
        </UserDashboardLayout>
    )
}
