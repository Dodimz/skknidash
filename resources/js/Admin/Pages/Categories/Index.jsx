import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { newspaperOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { createOutline } from "ionicons/icons"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import { useEffect } from "react"
import translate from "@/utils/translate"

export default function Index({ categories, sort, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.categories.index", {
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

    useEffect(() => {
        setSelectedLang(filtered_lang)
    }, [filtered_lang])

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = categories.data.map((category) => category.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark un-mark
    const handleMark = (categoryId) => {
        const existsMark = markItems.some((item) => item === categoryId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== categoryId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, categoryId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected categories")}?`
            action = "admin.categories.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All categories" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Categories")}</h2>
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
                                    {translate("Categories")}
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
                                                        {Object.entries(languages).map(([code, language]) => (
                                                            <a
                                                                onClick={() => {
                                                                    setSelectedLang(code)
                                                                }}
                                                                className={`dropdown-item ${selectedLang === code ? "active" : ""}`}
                                                                href="#"
                                                                key={code}
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
                                            {hasPermission("post_category.index") && (
                                                <Link href={route("admin.categories.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="post_count">
                                                        {translate("Parent Category")}
                                                    </ThSortable>

                                                    <ThSortable width="1%" sort={sort} onSorted={() => getResults(searchQuery)} column="post_count">
                                                        {translate("Posts")}
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
                                                {categories.data.map((category, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(category.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === category.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>{category?.content?.title}</td>
                                                        <td>
                                                            <div className="yoo-table-medias yoo-style1">
                                                                {category.parent_category_name ?? "-----"}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="yoo-table-medias yoo-style1">
                                                                <Link
                                                                    href={route("admin.posts.index", {
                                                                        filter: {
                                                                            category: category?.content?.title
                                                                        }
                                                                    })}
                                                                >
                                                                    #{category.post_count}
                                                                </Link>
                                                            </span>
                                                        </td>
                                                        <td>{moment(category.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("post_category.edit") && (
                                                                    <Link
                                                                        href={route("admin.categories.edit", category)}
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
                                                                )}
                                                                {hasPermission("post_category.delete") && (
                                                                    <DeleteButton href={route("admin.categories.destroy", category)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!categories.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No categories found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {categories.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {categories.links.map((link, index) => (
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
