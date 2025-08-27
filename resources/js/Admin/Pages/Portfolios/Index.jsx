import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { copyOutline, idCardOutline, search } from "ionicons/icons"
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
import translate from "@/utils/translate"

export default function Index({ portfolios, sort, categories, filter, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedCategory, setSelectedCategory] = useState(filter.category)
    const [isEditModal, setEditModal] = useState(false)
    const [editedData, setEditedData] = useState({})

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.portfolios.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: {
                    category: selectedCategory,
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
            const items = portfolios.data.map((portfolio) => portfolio.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (portfolioId) => {
        const existsMark = markItems.some((item) => item === portfolioId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== portfolioId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, portfolioId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected portfolios")}?`
            action = "admin.portfolios.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All portfolios" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All portfolios")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={idCardOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Portfolios")}
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
                                                    <DropDownButton selectedOption={selectedCategory}>
                                                        <a
                                                            onClick={() => setSelectedCategory("All Categories")}
                                                            className={`dropdown-item ${selectedCategory === "All Categories" ? "active" : ""}`}
                                                            href="#"
                                                        >
                                                            All Category
                                                        </a>
                                                        {categories.map((category) => (
                                                            <a
                                                                onClick={() => setSelectedCategory(category?.content?.title)}
                                                                className={`dropdown-item ${selectedCategory === category?.content?.title ? "active" : ""
                                                                    }`}
                                                                href="#"
                                                            >
                                                                {category?.content?.title}
                                                            </a>
                                                        ))}
                                                    </DropDownButton>
                                                </div>
                                                <button onClick={() => getResults(searchQuery)} className="btn btn-success btn-sm">
                                                    {translate("Filter")}
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
                                            {hasPermission("portfolios.create") && (
                                                <Link href={route("admin.portfolios.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                    <ThSortable width="35%" sort={sort} onSorted={() => getResults(searchQuery)} column="title">
                                                        {translate("Title")}
                                                    </ThSortable>
                                                    <ThSortable sort={sort} onSorted={() => getResults(searchQuery)} column="category">
                                                        {translate("Categories")}
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
                                                {portfolios.data.map((portfolio, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(portfolio.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${markItems.some((item) => item === portfolio.id) && "active"
                                                                    }`}
                                                            />
                                                        </td>
                                                        <td>
                                                            {portfolio?.content?.title}
                                                            <a
                                                                href="#"
                                                                style={{ color: "#007aff", marginLeft: "5px" }}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setEditModal(true)
                                                                    setEditedData(portfolio)
                                                                }}
                                                            >
                                                                (Slug)
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <span className="yoo-base-color1">{portfolio?.category?.content?.title}</span>
                                                        </td>
                                                        <td>{moment(portfolio.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("portfolios.edit") && (
                                                                    <Link
                                                                        href={route("admin.portfolios.edit", portfolio)}
                                                                        className="badge badge-primary yoo-tooltip-wrap"
                                                                    >
                                                                        <IonIcon
                                                                            icon={createOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                        <span className="yoo-tooltip-body">Edit With Page Builder</span>
                                                                    </Link>
                                                                )}
                                                                {hasPermission("portfolios.show") && (
                                                                    <a
                                                                        href={route("portfolio.show", portfolio.slug)}
                                                                        target="_blank"
                                                                        className="badge badge-secondary yoo-tooltip-wrap"
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
                                                                {hasPermission("portfolios.create") && (
                                                                    <a
                                                                        href="#"
                                                                        className="badge badge-warning yoo-tooltip-wrap"
                                                                        onClick={() => {
                                                                            router.post(route("admin.portfolios.clone", portfolio))
                                                                        }}
                                                                    >
                                                                        <IonIcon icon={copyOutline} style={{ height: "16px", width: "16px" }} />
                                                                        <span className="yoo-tooltip-body">Clone</span>
                                                                    </a>
                                                                )}
                                                                {hasPermission("portfolios.delete") && (
                                                                    <DeleteButton href={route("admin.portfolios.destroy", portfolio)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!portfolios.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>No portfolios found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {portfolios.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {portfolios.links.map((link, index) => (
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
