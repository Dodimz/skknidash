import { Head, Link, usePage } from "@inertiajs/react"
import { eyeOutline, newspaperOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { createOutline } from "ionicons/icons"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"

export default function Index({ products = { data: [], total: 0, links: [] }, sort = {}, filtered_lang, languages = {} }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState("Bulk Action")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    const getResults = (search, lang) => {
        router.get(
            route("admin.products.index", {
                search: search ?? searchQuery,
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

    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = products.data.map((product) => product.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    const handleMark = (productId) => {
        const existsMark = markItems.some((item) => item === productId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== productId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, productId]
            setMarkItems(addedItem)
        }
    }

    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected products?"
            action = "admin.products.bulk.delete"
        }
        setIsMarkAll([])
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <AdminLayouts>
            <Head title="All Products" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("All Products")}</h2>
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
                                {translate("Products")}
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
                                        {hasPermission("products.create") && (
                                            <Link href={route("admin.products.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="title">
                                                    {translate("Title")}
                                                </ThSortable>
                                                <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="category">
                                                    {translate("Category")}
                                                </ThSortable>

                                                <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="status">
                                                    {translate("Status")}
                                                </ThSortable>
                                                {(hasPermission("products.edit") || hasPermission("products.delete")) && (
                                                    <th style={{ width: "10%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.data.map((product, index) => (
                                                <tr className="odd" key={index}>
                                                    <td className="sorting_1" onClick={() => handleMark(product.id)}>
                                                        <div
                                                            className={`yoo-check-mark ${markItems.some((item) => item === product.id) ? "active" : ""
                                                                }`}
                                                        >
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </td>
                                                    <td className="sorting_1">{product?.content?.title}</td>
                                                    <td>{product?.category?.content?.title}</td>

                                                    <td>
                                                        {product.status === 1 && <span className="badge badge-success">Active</span>}
                                                        {product.status === 0 && <span className="badge badge-warning">Inactive</span>}
                                                    </td>
                                                    {(hasPermission("products.edit") || hasPermission("products.delete")) && (
                                                        <td>
                                                            <div className="yoo-group-btn">
                                                                {hasPermission("products.edit") && (
                                                                    <Link
                                                                        href={route("admin.products.edit", product)}
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
                                                                {hasPermission("products.show") && (
                                                                    <a
                                                                        href={route("shop.show", product.slug)}
                                                                        target="_blank"
                                                                        className="badge badge-secondary"
                                                                    >
                                                                        <IonIcon
                                                                            icon={eyeOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                    </a>
                                                                )}
                                                                {hasPermission("products.delete") && (
                                                                    <DeleteButton href={route("admin.products.destroy", product)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {products.total === 0 && (
                                        <div
                                            className="no-data-found"
                                            style={{
                                                textAlign: "center",
                                                padding: "50px"
                                            }}
                                        >
                                            <p>{translate("No data found")}</p>
                                        </div>
                                    )}
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {products.total > 1 && (
                    <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                        <ul className="pagination">
                            {products.links.map((link, index) => (
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
