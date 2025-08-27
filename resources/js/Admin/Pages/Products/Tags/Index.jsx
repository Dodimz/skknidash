import { Head, Link } from "@inertiajs/react"
import { createOutline, newspaperOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import hasPermission from "@/Admin/Utils/hasPermission"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { produce } from "immer"
import translate from "@/utils/translate"

export default function Index({ tags, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState("Bulk Action")
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.product.tags.index", {
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
            const items = tags.data.map((tag) => tag.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (tagId) => {
        const existsMark = markItems.some((item) => item === tagId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== tagId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, tagId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected tags?"
            action = "admin.tags.bulk.delete"
        }
        setIsMarkAll([])
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <AdminLayouts>
            <Head title="All Tags" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("All tags")}</h2>
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
                                {translate("Tags")}
                            </h2>
                        </div>
                    </div>
                    <div className="yoo-card-body">
                        <div>
                            <div className="yoo-height-b15 yoo-height-lg-b15" />
                            <div className="yooDataTableWrap">
                                <div className="dataTables_heading">
                                    <div className="dataTables_heading_left">
                                        {hasPermission("product_tags.delete") && (
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
                                        {hasPermission("product_tags.create") && (
                                            <Link href={route("admin.product.tags.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                <ThSortable width="40%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                    {translate("Name")}
                                                </ThSortable>

                                                <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="blog_count">
                                                    {translate("Products")}
                                                </ThSortable>

                                                <ThSortable width="30%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                    {translate("Date")}
                                                </ThSortable>
                                                {(hasPermission("product_tags.edit") || hasPermission("product_tags.delete")) && (
                                                    <th style={{ width: "15%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tags.data.map((tag, index) => (
                                                <tr className="odd" key={index}>
                                                    <td className="sorting_1" onClick={() => handleMark(tag.id)}>
                                                        <div className={`yoo-check-mark ${markItems.some((item) => item === tag.id) && "active"}`} />
                                                    </td>
                                                    <td>{tag.name.en}</td>
                                                    <td>
                                                        <span className="yoo-table-medias yoo-style1">
                                                            <Link
                                                                href={route("admin.products.index", {
                                                                    filter: {
                                                                        tag: tag.title
                                                                    }
                                                                })}
                                                            >
                                                                #{tag.product_count}
                                                            </Link>
                                                        </span>
                                                    </td>
                                                    <td>{moment(tag?.created_at).format("dddd, Do MMMM YYYY [at] h:mm A z")}</td>
                                                    {(hasPermission("product_tags.edit") || hasPermission("product_tags.delete")) && (
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("product_tags.edit") && (
                                                                    <Link
                                                                        href={route("admin.product.tags.edit", tag)}
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
                                                                {hasPermission("product_tags.delete") && (
                                                                    <DeleteButton href={route("admin.tags.destroy", tag)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!tags.data.length && (
                                        <div
                                            className="no-data-found"
                                            style={{
                                                textAlign: "center",
                                                padding: "50px"
                                            }}
                                        >
                                            <p>{translate("No tags found")}!</p>
                                        </div>
                                    )}
                                    <div className="clear" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* .yoo-card */}
                {tags.total > 1 && (
                    <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                        <ul className="pagination">
                            {tags.links.map((link, index) => (
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
