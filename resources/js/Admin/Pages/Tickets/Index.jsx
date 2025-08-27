import { Head, Link } from "@inertiajs/react"
import { chatbubbleOutline, eyeOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"

export default function Index({ tickets, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState("Bulk Action")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.tickets.index", {
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
            const items = tickets.data.map((ticket) => ticket.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (ticketId) => {
        const existsMark = markItems.some((item) => item === ticketId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== ticketId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, ticketId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected tickets?"
            action = "admin.tickets.bulk.delete"
        }
        setIsMarkAll([])
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    // handle status
    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "badge badge-warning"
            case "open":
                return "badge badge-primary"
            case "solved":
                return "badge badge-success"
            default:
                return "badge badge-secondary"
        }
    }

    return (
        <AdminLayouts>
            <Head title="All Support Tickets" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">All Support Tickets</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="yoo-card yoo-style1">
                    <div className="yoo-card-heading">
                        <div className="yoo-card-heading-left">
                            <h2 className="yoo-card-title">
                                <span className="yoo-card-title-icon yoo-blue-bg">
                                    <IonIcon
                                        icon={chatbubbleOutline}
                                        style={{
                                            width: "16px",
                                            height: "16px"
                                        }}
                                    />
                                </span>
                                Tickets
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
                                    </div>
                                    <div className="dataTables_heading_right">
                                        <div id="yooDataTable_filter" className="dataTables_filter">
                                            <label>
                                                <input
                                                    type="search"
                                                    className=" "
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
                                                <ThSortable width="8%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                    Ticket ID
                                                </ThSortable>

                                                <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="blog_count">
                                                    Sending Date
                                                </ThSortable>

                                                <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                    Subject
                                                </ThSortable>

                                                <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                    User
                                                </ThSortable>

                                                <ThSortable width="8%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                    Status
                                                </ThSortable>

                                                <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                    Last Reply
                                                </ThSortable>

                                                <th style={{ width: "7%" }} className="sorting">
                                                    Options
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tickets.data.map((ticket, index) => (
                                                <tr className="odd" key={index}>
                                                    <td className="sorting_1" onClick={() => handleMark(ticket.id)}>
                                                        <div
                                                            className={`yoo-check-mark ${markItems.some((item) => item === ticket.id) && "active"}`}
                                                        />
                                                    </td>

                                                    <td>#{ticket.generate_id}</td>
                                                    <td>{moment(ticket.created_at).format("LLL")}</td>
                                                    <td>
                                                        <span className="yoo-table-medias yoo-style1">{ticket.subject}</span>
                                                    </td>
                                                    <td>
                                                        <span className="yoo-table-medias yoo-style1">{ticket?.user?.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className={`badge ${getStatusClass(ticket.status)}`}>{ticket.status}</span>
                                                    </td>
                                                    <td>{moment(ticket.last_replies_date).format("LLL")}</td>
                                                    <td>
                                                        <div className="yoo-group-btn">
                                                            <Link href={route("admin.tickets.reply", ticket)} className="badge badge-primary">
                                                                <IonIcon
                                                                    icon={eyeOutline}
                                                                    style={{
                                                                        height: "20px",
                                                                        width: "20px"
                                                                    }}
                                                                />
                                                            </Link>
                                                            <DeleteButton href={route("admin.tickets.destroy", ticket)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!tickets.data.length && (
                                        <div
                                            className="no-data-found"
                                            style={{
                                                textAlign: "center",
                                                padding: "50px"
                                            }}
                                        >
                                            <p>No ticket found!</p>
                                        </div>
                                    )}
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* .yoo-card */}
                {tickets.total > 1 && (
                    <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                        <ul className="pagination">
                            {tickets.links.map((link, index) => (
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
