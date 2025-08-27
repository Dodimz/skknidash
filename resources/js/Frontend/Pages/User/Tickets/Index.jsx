import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import React from "react"
import { Icon } from "@iconify/react"
import { Head, Link } from "@inertiajs/react"
import DOMPurify from "dompurify"

export default function Index({ tickets }) {
    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "cs_red_color"
            case "open":
                return "cs_green_color"
            case "solved":
                return "cs_blue_color"
            default:
                return ""
        }
    }
    const getPriorityClass = (priority) => {
        switch (priority) {
            case "high":
                return "cs_accent_color"
            case "low":
                return "cs_secondary_color"
            default:
                return ""
        }
    }
    // page header data
    let pageHeaderData = {
        title: translate("Tickets"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("User"), url: null },
            { label: translate("Tickets"), url: route("user.tickets.index") }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Tickets" />
            <div className="cs_dashboard_right">
                <div className="cs_table_wrap">
                    <div className="table-responsive">
                        <table className="cs_table_1 m-0">
                            <thead>
                                <tr>
                                    <th>{translate("S.N")}</th>
                                    <th>{translate("Subject")}</th>
                                    <th>{translate("Status")}</th>
                                    <th>{translate("Priority")}</th>
                                    <th>{translate("Last Reply")}</th>
                                    <th>{translate("Action")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets?.data?.map((ticket, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            [Ticket#{ticket?.generate_id}] {ticket?.subject}
                                        </td>
                                        <td className={`${getStatusClass(ticket?.status)} cs_medium`}>
                                            {ticket?.status.charAt(0).toUpperCase() + ticket?.status.slice(1)}
                                        </td>
                                        <td className={`${getPriorityClass(ticket?.properly)} cs_medium`}>
                                            {ticket?.properly.charAt(0).toUpperCase() + ticket?.properly.slice(1)}
                                        </td>
                                        <td>1 minute ago</td>
                                        <td>
                                            <div className="cs_icon_btn_group">
                                                <Link href={route("tickets.reply", ticket)} className="cs_icon_btn">
                                                    <Icon icon="fa6-regular:message" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tickets?.total === 0 && (
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
                                {tickets?.links.map((link, index) => (
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
