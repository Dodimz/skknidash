import { Head, Link } from "@inertiajs/react"
import { search, createOutline, businessOutline, arrowForwardOutline, eyeOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import Amount from "@/Components/Amount"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"

export default function Index({ orders, sort, filter }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState("Bulk Action")
    const [selectedStatus, setSelectedStatus] = useState(filter?.status || "All Order Status")
    const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(filter?.payment_status || "All Payment Status")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    const paymentStatusOptions = {
        0: "Initialize",
        1: "Awaiting Payment",
        2: "Success",
        3: "Canceled",
        "All Payment Status": "All Payment Status"
    }

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.orders.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: {
                    status: selectedStatus,
                    payment_status: selectedPaymentStatus
                }
            }),
            {},
            { preserveState: true }
        )
    }

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = orders.data.map((order) => order.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (orderId) => {
        const existsMark = markItems.some((item) => item === orderId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== orderId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, orderId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected orders?"
            action = "admin.orders.bulk.delete"
        }
        setIsMarkAll([])
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All Orders" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Orders")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={businessOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Orders")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div className="">
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        {hasPermission("orders.delete") && (
                                            <div className="dataTables_heading_left">
                                                <div className="yoo-group-btn">
                                                    <div className="position-relative">
                                                        <DropDownButton selectedOption={selectedOption} disabled={!markItems.length}>
                                                            <a
                                                                onClick={() => setSelectedOption("Delete")}
                                                                className={`dropdown-item ${selectedOption === "Delete" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Delete")}
                                                            </a>
                                                        </DropDownButton>
                                                    </div>
                                                    <button
                                                        disabled={!markItems.length}
                                                        onClick={() => handleBulkAction()}
                                                        className="btn btn-success btn-sm"
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                                <div className="">
                                                    <div className="position-relative">
                                                        <DropDownButton selectedOption={selectedStatus}>
                                                            <a
                                                                onClick={() => setSelectedStatus("All Order Status")}
                                                                className={`dropdown-item ${selectedStatus === "All Order Status" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("All Order Status")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedStatus("Pending")}
                                                                className={`dropdown-item ${selectedStatus === "Pending" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                Pending
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedStatus("Confirmed")}
                                                                className={`dropdown-item ${selectedStatus === "Confirmed" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Confirmed")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedStatus("Canceled")}
                                                                className={`dropdown-item ${selectedStatus === "Canceled" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Canceled")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedStatus("Completed")}
                                                                className={`dropdown-item ${selectedStatus === "Completed" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Completed")}
                                                            </a>
                                                        </DropDownButton>
                                                    </div>
                                                </div>
                                                <div className="yoo-group-btn">
                                                    <div className="position-relative">
                                                        <DropDownButton selectedOption={paymentStatusOptions[selectedPaymentStatus]}>
                                                            <a
                                                                onClick={() => setSelectedPaymentStatus("All Payment Status")}
                                                                className={`dropdown-item ${
                                                                    selectedPaymentStatus === "All Payment Status" ? "active" : ""
                                                                }`}
                                                                href="#"
                                                            >
                                                                {translate("All Payment Status")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedPaymentStatus("1")}
                                                                className={`dropdown-item ${selectedPaymentStatus === "1" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Awaiting Payment")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedPaymentStatus("2")}
                                                                className={`dropdown-item ${selectedPaymentStatus === "2" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Success")}
                                                            </a>
                                                            <a
                                                                onClick={() => setSelectedPaymentStatus("3")}
                                                                className={`dropdown-item ${selectedPaymentStatus === "3" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("Cancel")}
                                                            </a>
                                                        </DropDownButton>
                                                    </div>
                                                    <button onClick={() => getResults(searchQuery)} className="btn btn-success btn-sm">
                                                        {translate("Filter")}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                        <div className="dataTables_heading_right">
                                            <div id="yooDataTable_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder="Search..."
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
                                                    <th onClick={() => markAll()} style={{ width: "1%" }}>
                                                        <div className={`yoo-check-mark-all ${isMarkAll && "active"}`}>
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </th>
                                                    <ThSortable
                                                        width="10%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="order_number"
                                                    >
                                                        {translate("Order ID")}
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="customer_name"
                                                    >
                                                        {translate("Customer Name (email)")}
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="customer_phone"
                                                    >
                                                        {translate("Phone")}
                                                    </ThSortable>
                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="total_price">
                                                        Product
                                                    </ThSortable>
                                                    <ThSortable width="8%" sort={sort} onSorted={() => getResults(searchQuery)} column="total_price">
                                                        Amount
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="10%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="payment_method"
                                                    >
                                                        {translate("Payment Method")}
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="10%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="payment_method"
                                                    >
                                                        {translate("Payment Status")}
                                                    </ThSortable>
                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="status">
                                                        {translate("Status")}
                                                    </ThSortable>
                                                    {(hasPermission("orders.show") || hasPermission("orders.delete")) && (
                                                        <th style={{ width: "1%" }} className="sorting">
                                                            {translate("Action")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.data.map((order, index) => (
                                                    <tr key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(order.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === order.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div className="yoo-table-medias yoo-style1">
                                                                <Link href={route("admin.orders.show", order)}>#{order?.order_number}</Link>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            {order?.customer_name} (
                                                            <a
                                                                href={`mailto:${order?.customer_email}`}
                                                                style={{ color: "#007aff", textDecoration: "underline" }}
                                                            >
                                                                {order?.customer_email}
                                                            </a>
                                                            )
                                                        </td>

                                                        <td>
                                                            <a
                                                                href={`tel:${order?.customer_phone}`}
                                                                style={{ color: "#007aff", textDecoration: "underline" }}
                                                            >
                                                                {order?.customer_phone}
                                                            </a>
                                                        </td>

                                                        <td>
                                                            <div className="yoo-table-medias yoo-style1">
                                                                {order?.orderitems?.map((item) => item.product_name).join(", ")}
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <Amount amount={order?.total_price} />
                                                        </td>
                                                        <td>{order?.payment_method}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${
                                                                    order.payment_status === "0"
                                                                        ? "badge-secondary"
                                                                        : order.payment_status === "1"
                                                                        ? "badge-warning"
                                                                        : order.payment_status === "2"
                                                                        ? "badge-success"
                                                                        : "badge-danger"
                                                                }`}
                                                            >
                                                                {order.payment_status === "0"
                                                                    ? "Initialize"
                                                                    : order.payment_status === "1"
                                                                    ? "Awaiting Payment"
                                                                    : order.payment_status === "2"
                                                                    ? "Success"
                                                                    : "Canceled"}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className={`badge ${
                                                                    order.status === "initialize"
                                                                        ? "badge-secondary"
                                                                        : order.status === "pending"
                                                                        ? "badge-warning"
                                                                        : order.status === "confirmed"
                                                                        ? "badge-success"
                                                                        : order.status === "canceled"
                                                                        ? "badge-danger"
                                                                        : "badge-info"
                                                                }`}
                                                            >
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                        </td>
                                                        {(hasPermission("orders.show") || hasPermission("orders.delete")) && (
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px"
                                                                    }}
                                                                >
                                                                    {hasPermission("orders.show") && (
                                                                        <Link
                                                                            href={route("admin.orders.show", order)}
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
                                                                    )}
                                                                    {hasPermission("orders.delete") && (
                                                                        <DeleteButton href={route("admin.orders.destroy", order)} />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!orders.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>No orders found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {orders.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {orders.links.map((link, index) => (
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
