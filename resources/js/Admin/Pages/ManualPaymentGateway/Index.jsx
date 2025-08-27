import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { cloudDownloadOutline, createOutline, mailOpenOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"

export default function Index({ manual_payment_gateways, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.manual.payment.gateway.index", {
                search: search ?? setSearchQuery,
                sort: sort
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
            const items = manual_payment_gateways.data.map((gateway) => gateway.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (gatewayId) => {
        const existsMark = markItems.some((item) => item === gatewayId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== gatewayId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, gatewayId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected gateways")}?`
            action = "admin.manual.payment.gateway.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    // handle gateway status toggle
    const handleGatewayStatusToggle = (gatewayId) => {
        router.post(route("admin.manual.payment.gateway.status.toggle", { id: gatewayId }))
    }

    return (
        <>
            <Head title="All Manual Payment Gateways" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Manual Payment Gateways")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-green-bg">
                                        <IonIcon
                                            icon={mailOpenOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Manual Payment Gateways")}
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
                                                    {translate("Apply")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="dataTables_heading_right">
                                            <div id="yooDataTable_filter" className="dataTables_filter">
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder={`${translate("Search")}...`}
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
                                            <Link href={route("admin.manual.payment.gateway.create")} className="btn btn-success btn-sm yoo-table-btn1">
                                                <span className="yoo-add">+</span> {translate("Create New")}
                                            </Link>
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
                                                    <ThSortable width="40%" sort={sort} onSorted={() => getResults(searchQuery)} column="gateway_name">
                                                        {translate("Gateway Name")}
                                                    </ThSortable>
                                                    <ThSortable width="40%" sort={sort} onSorted={() => getResults(searchQuery)} column="payment_type">
                                                        {translate("Payment Type")}
                                                    </ThSortable>
                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="status">
                                                        {translate("Status")}
                                                    </ThSortable>
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {manual_payment_gateways.data.map((gateway, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(gateway.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${markItems.some((item) => item === gateway.id) && "active"
                                                                    }`}
                                                            />
                                                        </td>
                                                        <td>{gateway?.content?.gateway_name}</td>
                                                        <td>{gateway.payment_type === 'custom_payment' ? `${translate(gateway.payment_type)}` : gateway.payment_type === 'bank_payment' ? `${translate(gateway.payment_type)}` : `${translate(gateway.payment_type)}`}</td>
                                                        <td>
                                                            <div
                                                                className={`yoo-switch ${gateway.status === "1" ? "active" : ""}`}
                                                                onClick={() => handleGatewayStatusToggle(gateway.id)}
                                                            >
                                                                <div className="yoo-switch-in" />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                <Link
                                                                    href={route("admin.manual.payment.gateway.edit", gateway)}
                                                                    className="badge badge-primary"
                                                                >
                                                                    <IonIcon
                                                                        icon={createOutline}
                                                                        style={{
                                                                            height: "16px",
                                                                            width: "16px"
                                                                        }}
                                                                    />
                                                                </Link>
                                                                <DeleteButton href={route("admin.manual.payment.gateway.destroy", gateway)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!manual_payment_gateways.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No gateways found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {manual_payment_gateways.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {manual_payment_gateways.links.map((link, index) => (
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
