import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { eyeOutline, search, sendOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import translate from "@/utils/translate"
import hasPermission from "@/Admin/Utils/hasPermission"

export default function Index({ responses, form_responses, sort, filter }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [selectedResponse, setSelectedResponse] = useState(filter.response)
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.form.response.index", {
                search: search ?? searchQuery,
                filter: { response: selectedResponse },
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
            const items = responses.data.map((response) => response.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (responseId) => {
        const existsMark = markItems.some((item) => item === responseId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== responseId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, responseId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected form response")}?`
            action = "admin.form.response.bulkDelete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All form responses" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Form Response")}</h2>
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
                                    {translate("Form Response")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div>
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            {hasPermission("form_response.delete") && (
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
                                            )}
                                            {hasPermission("form_response.show") && (
                                                <div className="yoo-group-btn">
                                                    <div className="position-relative">
                                                        <DropDownButton selectedOption={selectedResponse}>
                                                            <a
                                                                onClick={() => setSelectedResponse("All Responses")}
                                                                className={`dropdown-item ${selectedResponse === "All Responses" ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {translate("All Responses")}
                                                            </a>
                                                            {form_responses?.map((name, index) => (
                                                                <a
                                                                    key={index}
                                                                    onClick={() => setSelectedResponse(name?.form_response)}
                                                                    className={`dropdown-item ${
                                                                        selectedResponse === name.form_response ? "active" : ""
                                                                    }`}
                                                                    href="#"
                                                                >
                                                                    {name.form_response}
                                                                </a>
                                                            ))}
                                                        </DropDownButton>
                                                    </div>
                                                    <button onClick={() => getResults(searchQuery)} className="btn btn-success btn-sm">
                                                        {translate("Filter")}
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
                                                    <ThSortable width="5%" sort={sort} onSorted={() => getResults(searchQuery)} column="id">
                                                        {translate("No.")}
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="40%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="response_from"
                                                    >
                                                        {translate("Response From")}
                                                    </ThSortable>

                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="is_open">
                                                        {translate("Status")}
                                                    </ThSortable>

                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Response at")}
                                                    </ThSortable>
                                                    {(hasPermission("form_response.show") || hasPermission("form_response.delete")) && (
                                                        <th style={{ width: "1%" }} className="sorting">
                                                            {translate("Action")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {responses.data.map((response, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(response.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === response.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>{index + 1}</td>
                                                        <td>{response.response_from}</td>
                                                        <td>
                                                            {response.is_open === "1" ? (
                                                                <span className="badge badge-success">{translate("Opened")}</span>
                                                            ) : (
                                                                <span className="badge badge-danger">{translate("Not Opened")}</span>
                                                            )}
                                                        </td>
                                                        <td>{moment(response.created_at).format("ll")}</td>
                                                        {(hasPermission("form_response.show") || hasPermission("form_response.delete")) && (
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px"
                                                                    }}
                                                                >
                                                                    {hasPermission("form_response.show") && (
                                                                        <Link
                                                                            href={route("admin.form.response.show", response)}
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
                                                                    {hasPermission("form_response.show") && (
                                                                        <DeleteButton href={route("admin.form.response.destroy", response)} />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!responses.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No responses found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {responses.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {responses.links.map((link, index) => (
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
