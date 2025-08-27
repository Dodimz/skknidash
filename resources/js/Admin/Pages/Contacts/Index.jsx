import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { cloudDownloadOutline, eyeOutline, search, sendOutline } from "ionicons/icons"
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

export default function Index({ contacts, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.contacts.index", {
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
            const items = contacts.data.map((contact) => contact.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (contactId) => {
        const existsMark = markItems.some((item) => item === contactId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== contactId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, contactId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected contacts")}?`
            action = "admin.contacts.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All contacts" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All contacts")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-red-bg">
                                        <IonIcon
                                            icon={sendOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Contacts")}
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
                                            <a href={route("admin.contacts.export")} className="btn btn-success btn-sm" download>
                                                <IonIcon
                                                    icon={cloudDownloadOutline}
                                                    style={{
                                                        width: "16px",
                                                        height: "16px"
                                                    }}
                                                />{" "}
                                                {translate("Export As CSV")}
                                            </a>
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
                                                    <th onClick={() => markAll()} style={{ width: "1%" }}>
                                                        <div className={`yoo-check-mark-all ${isMarkAll && "active"}`}>
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </th>
                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="ticket_id">
                                                        {translate("ID")}
                                                    </ThSortable>

                                                    <ThSortable width="25%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                        {translate("Name")}
                                                    </ThSortable>

                                                    <ThSortable width="40%" sort={sort} onSorted={() => getResults(searchQuery)} column="email">
                                                        {translate("Email")}
                                                    </ThSortable>

                                                    <ThSortable width="5%" sort={sort} onSorted={() => getResults(searchQuery)} column="is_open">
                                                        {translate("Status")}
                                                    </ThSortable>

                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contacts.data.map((contact, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(contact.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === contact.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>{contact.ticket_id}</td>
                                                        <td>{contact.name}</td>
                                                        <td>{contact.email}</td>
                                                        <td>
                                                            {contact.is_open === "1" ? (
                                                                <span className="badge badge-success">{translate("Opened")}</span>
                                                            ) : (
                                                                <span className="badge badge-danger">{translate("Not Opened")}</span>
                                                            )}
                                                        </td>
                                                        <td>{moment(contact.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("contacts.show") && (
                                                                    <Link
                                                                        href={route("admin.contacts.show", contact)}
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
                                                                {hasPermission("contacts.delete") && (
                                                                    <DeleteButton href={route("admin.contacts.destroy", contact)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!contacts.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No contacts found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {contacts.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {contacts.links.map((link, index) => (
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
