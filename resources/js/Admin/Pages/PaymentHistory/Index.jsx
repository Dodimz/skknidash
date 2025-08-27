import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { cardOutline, eyeOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import translate from "@/utils/translate"
import hasPermission from "@/Admin/Utils/hasPermission"

export default function Index({ paymentHistories, sort }) {
    const [searchQuery, setSearchQuery] = useState("")

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.payment.history.index", {
                search: search ?? setSearchQuery,
                sort: sort
            }),
            {},
            { preserveState: true }
        )
    }

    return (
        <>
            <Head title="All Payment History" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Payment History")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-green-bg">
                                        <IonIcon
                                            icon={cardOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Payment History")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div>
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            <div className="yoo-group-btn">
                                                <div className="position-relative"></div>
                                            </div>
                                        </div>
                                        <div className="dataTables_heading_right">
                                            <div id="yooDataTable_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder={`${translate("Search")}.....`}
                                                        value={searchQuery}
                                                        onChange={(e) => {
                                                            setSearchQuery(e.target.value)
                                                            getResults(e.target.value)
                                                        }}
                                                    />
                                                </label>
                                                <button className="dataTables_filter_btn">
                                                    <IonIcon icon={search} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="yooDataTable" className="display dataTable no-footer" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="plan_id">
                                                        {translate("Plan Name")}
                                                    </ThSortable>

                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                        {translate("Name")}
                                                    </ThSortable>

                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="email">
                                                        {translate("Email")}
                                                    </ThSortable>

                                                    <ThSortable width="14%" sort={sort} onSorted={() => getResults(searchQuery)} column="amount">
                                                        {translate("Amount")}
                                                    </ThSortable>

                                                    <ThSortable width="8%" sort={sort} onSorted={() => getResults(searchQuery)} column="method">
                                                        {translate("Payment Method")}
                                                    </ThSortable>

                                                    <ThSortable width="8%" sort={sort} onSorted={() => getResults(searchQuery)} column="status">
                                                        {translate("Status")}
                                                    </ThSortable>

                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    {hasPermission("payment_history.show") && (
                                                        <th style={{ width: "5%" }} className="sorting">
                                                            {translate("Action")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {paymentHistories.data.map((paymentHistory, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="yoo-table-medias yoo-style1">
                                                            {paymentHistory.plan ? (
                                                                <a href={route("pricing.plan", paymentHistory.plan)} target="_blank">
                                                                    {paymentHistory.plan?.content?.name}
                                                                </a>
                                                            ) : (
                                                                <span style={{ color: "black" }}>Plan does not exist</span>
                                                            )}
                                                        </td>
                                                        <td>{paymentHistory?.name}</td>
                                                        <td>{paymentHistory?.email}</td>
                                                        <td>
                                                            {paymentHistory?.plan?.currency?.symbol} {paymentHistory?.amount}
                                                        </td>
                                                        <td>{paymentHistory?.method}</td>
                                                        <td>
                                                            {paymentHistory.status === "pending" && (
                                                                <span className="badge badge-warning">{translate("Pending")}</span>
                                                            )}
                                                            {paymentHistory.status === "awaiting_payment" && (
                                                                <span className="badge badge-info">{translate("Awaiting Payment")}</span>
                                                            )}
                                                            {paymentHistory.status === "success" && (
                                                                <span className="badge badge-success">{translate("Success")}</span>
                                                            )}
                                                            {paymentHistory.status === "failed" && (
                                                                <span className="badge badge-danger">{translate("Failed")}</span>
                                                            )}
                                                        </td>
                                                        <td>{moment(paymentHistory?.created_at).format("ll")}</td>
                                                        {hasPermission("payment_history.show") && (
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px"
                                                                    }}
                                                                >
                                                                    <Link
                                                                        href={route("admin.payment.history.show", paymentHistory)}
                                                                        className="badge badge-secondary"
                                                                    >
                                                                        <IonIcon
                                                                            icon={eyeOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!paymentHistories.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No History Found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {paymentHistories.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {paymentHistories.links.map((link, index) => (
                                    <li className={`page-item ${link.active ? "active" : ""}`} key={`pagination_${index}`}>
                                        <Link
                                            href={link.url}
                                            className="page-link"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="yoo-height-b30 yoo-height-lg-b30" />
                </div>
            </AdminLayouts>
        </>
    )
}
