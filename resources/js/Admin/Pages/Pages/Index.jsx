import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { copyOutline, fileTray, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { createOutline, eyeOutline } from "ionicons/icons"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import EditSlug from "./EditSlug"
import { useEffect } from "react"
import translate from "@/utils/translate"

export default function Index({ pages, sort, filtered_lang, languages, default_home_page }) {
    const [markItems, setMarkItems] = useState([])
    const [editedData, setEditedData] = useState({})
    const [searchQuery, setSearchQuery] = useState("")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [isEditModal, setEditModal] = useState(false)
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.pages.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: {
                    lang: lang ?? selectedLang
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
            const items = pages.data.map((page) => page.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (pageId) => {
        const existsMark = markItems.some((item) => item === pageId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== pageId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, pageId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected pages")}?`
            action = "admin.pages.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    useEffect(() => {
        setSelectedLang(filtered_lang)
    }, [filtered_lang])

    return (
        <>
            <Head title="All pages" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Pages")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={fileTray}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Pages")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div className="">
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
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton selectedOption={languages[selectedLang]?.name || selectedLang}>
                                                        {Object.entries(languages).map(([code, language], index) => (
                                                            <a
                                                                onClick={() => setSelectedLang(code)}
                                                                className={`dropdown-item ${selectedLang === code ? "active" : ""}`}
                                                                href="#"
                                                                key={index}
                                                            >
                                                                {language.name}
                                                            </a>
                                                        ))}
                                                    </DropDownButton>
                                                </div>
                                                <button onClick={() => getResults(searchQuery)} className="btn btn-success btn-sm">
                                                    {translate("Change language")}
                                                </button>
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
                                            {hasPermission("pages.create") && (
                                                <Link href={route("admin.pages.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                    <ThSortable width="40%" sort={sort} onSorted={() => getResults(searchQuery)} column="title">
                                                        {translate("Title")}
                                                    </ThSortable>

                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pages.data.map((page, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(page.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${markItems.some((item) => item === page.id) && "active"}`}
                                                            />
                                                        </td>
                                                        <td>
                                                            {page?.content?.title}
                                                            <a
                                                                href="#"
                                                                style={{
                                                                    color: "#007aff",
                                                                    marginLeft: "5px"
                                                                }}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setEditModal(true)
                                                                    setEditedData(page)
                                                                }}
                                                            >
                                                                (Slug)
                                                            </a>

                                                            {default_home_page == page.id && (
                                                                <span className="badge badge-success mx-2">Home Page</span>
                                                            )}
                                                        </td>
                                                        <td>{moment(page.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("pages.edit") && (
                                                                    <Link
                                                                        href={route("admin.pages.edit", page)}
                                                                        className="badge badge-primary yoo-tooltip-wrap"
                                                                    >
                                                                        <IonIcon
                                                                            icon={createOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                        {page?.type === "custom" ? (
                                                                            <span className="yoo-tooltip-body">Edit With Page Builder</span>
                                                                        ) : (
                                                                            <span className="yoo-tooltip-body">Edit</span>
                                                                        )}
                                                                    </Link>
                                                                )}
                                                                {page.slug !== "/" && hasPermission("pages.show") && (
                                                                    <a
                                                                        href={route("pages.show", page.slug)}
                                                                        target="_blank"
                                                                        className="badge badge-secondary  yoo-tooltip-wrap"
                                                                    >
                                                                        <IonIcon
                                                                            icon={eyeOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                        <span className="yoo-tooltip-body">View</span>
                                                                    </a>
                                                                )}
                                                                {page?.type === "custom" && (
                                                                    <>
                                                                        {hasPermission("pages.create") && (
                                                                            <a
                                                                                href="#"
                                                                                className="badge badge-warning yoo-tooltip-wrap"
                                                                                onClick={() => {
                                                                                    router.post(route("admin.pages.clone", page))
                                                                                }}
                                                                            >
                                                                                <IonIcon
                                                                                    icon={copyOutline}
                                                                                    style={{
                                                                                        height: "16px",
                                                                                        width: "16px"
                                                                                    }}
                                                                                />
                                                                                <span className="yoo-tooltip-body">Clone</span>
                                                                            </a>
                                                                        )}
                                                                    </>
                                                                )}
                                                                {!(page.id == default_home_page && page.type === "custom") &&
                                                                    page?.type !== "regular" &&
                                                                    hasPermission("pages.delete") && (
                                                                        <DeleteButton href={route("admin.pages.destroy", page)} />
                                                                    )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!pages.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No pages found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {pages.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {pages.links.map((link, index) => (
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
                <EditSlug editedData={editedData} isModal={isEditModal} closeModal={(e) => setEditModal(e)} />
            </AdminLayouts>
        </>
    )
}
