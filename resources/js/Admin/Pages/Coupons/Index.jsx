import { Head, Link } from "@inertiajs/react"
import { newspaperOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { createOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"

export default function Index({ coupons, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState("Bulk Action")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    const getResults = (search) => {
        router.get(
            route("admin.coupons.index", {
                search: search ?? searchQuery,
                sort: sort
            }),
            {},
            { preserveState: true }
        )
    }

    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = coupons.data.map((coupon) => coupon.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    const handleMark = (couponId) => {
        const existsMark = markItems.some((item) => item === couponId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== couponId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, couponId]
            setMarkItems(addedItem)
        }
    }

    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected coupons?"
            action = "admin.coupons.bulk.delete"
        }
        setIsMarkAll([])
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    // Helper function to determine coupon status
    const getCouponStatus = (coupon) => {
        const currentDate = new Date()
        const startDate = new Date(coupon.start_date)
        const endDate = new Date(coupon.end_date)

        if (currentDate >= startDate && currentDate <= endDate) {
            return "Active"
        } else if (currentDate < startDate && endDate > startDate) {
            return "Pending"
        } else {
            return "Expired"
        }
    }

    return (
        <AdminLayouts>
            <Head title="All Coupons" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("All Coupons")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="yoo-card yoo-style1">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-blue-bg">
                                    <IonIcon
                                        icon={newspaperOutline}
                                        style={{
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                {translate("Coupons")}
                            </h2>
                        </div>
                    </div>
                    <div className="yoo-card-body">
                        <div className="">
                            <div className="yoo-height-b15 yoo-height-lg-b15" />
                            <div className="yooDataTableWrap">
                                <div className="dataTables_heading">
                                    <div className="dataTables_heading_left">
                                        {hasPermission("coupons.delete") && (
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton selectedOption={selectedOption} disabled={!markItems.length}>
                                                        <a
                                                            onClick={() => setSelectedOption("Delete")}
                                                            className={`dropdown-item ${selectedOption === "Delete" ? "active" : ""}`}
                                                            href="#"
                                                        >
                                                            Delete
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
                                        )}
                                    </div>
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
                                        {hasPermission("coupons.create") && (
                                            <Link href={route("admin.coupons.create")} className="btn btn-success btn-sm yoo-table-btn1">
                                                <span className="yoo-add">+</span> {translate("Create New")}
                                            </Link>
                                        )}
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
                                                <ThSortable width="30%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                    {translate("Name")}
                                                </ThSortable>
                                                <ThSortable width="30%" sort={sort} onSorted={() => getResults(searchQuery)} column="code">
                                                    {translate("Code")}
                                                </ThSortable>
                                                <ThSortable width="30%" sort={sort} onSorted={() => getResults(searchQuery)} column="start_date">
                                                    {translate("Status")}
                                                </ThSortable>
                                                {(hasPermission("coupons.edit") || hasPermission("coupons.delete")) && (
                                                    <th style={{ width: "15%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {coupons.data.map((coupon, index) => (
                                                <tr className="odd" key={index}>
                                                    <td className="sorting_1" onClick={() => handleMark(coupon.id)}>
                                                        <div
                                                            className={`yoo-check-mark ${
                                                                markItems.some((item) => item === coupon.id) ? "active" : ""
                                                            }`}
                                                        >
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </td>
                                                    <td className="">{coupon.name}</td>
                                                    <td className="">{coupon.code}</td>
                                                    <td className="">
                                                        {getCouponStatus(coupon) === "Active" && (
                                                            <span className={`badge badge-${getCouponStatus(coupon) === "Active" && "success"}`}>
                                                                {getCouponStatus(coupon)}
                                                            </span>
                                                        )}
                                                        {getCouponStatus(coupon) === "Pending" && (
                                                            <span className={`badge badge-${getCouponStatus(coupon) === "Pending" && "warning"}`}>
                                                                {getCouponStatus(coupon)}
                                                            </span>
                                                        )}
                                                        {getCouponStatus(coupon) === "Expired" && (
                                                            <span className={`badge badge-${getCouponStatus(coupon) === "Expired" && "danger"}`}>
                                                                {getCouponStatus(coupon)}
                                                            </span>
                                                        )}
                                                    </td>
                                                    {(hasPermission("coupons.edit") || hasPermission("coupons.delete")) && (
                                                        <td>
                                                            <div className="yoo-group-btn">
                                                                {hasPermission("coupons.edit") && (
                                                                    <Link href={route("admin.coupons.edit", coupon)} className="badge badge-primary">
                                                                        <IonIcon
                                                                            icon={createOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                )}
                                                                {hasPermission("coupons.delete") && (
                                                                    <DeleteButton href={route("admin.coupons.delete", coupon)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {coupons.total === 0 && (
                                        <div
                                            className="no-data-found"
                                            style={{
                                                textAlign: "center",
                                                padding: "50px"
                                            }}
                                        >
                                            <p>No data found!</p>
                                        </div>
                                    )}
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {coupons.total > 1 && (
                    <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                        <ul className="pagination">
                            {coupons.links.map((link, index) => (
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
    )
}
