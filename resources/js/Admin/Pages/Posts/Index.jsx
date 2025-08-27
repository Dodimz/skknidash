import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { newspaperOutline, search } from "ionicons/icons"
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

export default function AllPosts({ posts, sort, categories, filter, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedStatus, setSelectedStatus] = useState(filter.status)
    const [selectedCategory, setSelectedCategory] = useState(filter.category)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])
    const [isEditModal, setEditModal] = useState(false)
    const [editedData, setEditedData] = useState({})

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.posts.index", {
                search: search ?? setSearchQuery,
                sort: sort,
                filter: {
                    status: selectedStatus,
                    category: selectedCategory,
                    lang: lang ?? selectedLang
                }
            }),
            {},
            { preserveState: true }
        )
    }

    const filteredCategories = categories.data[selectedLang]

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([])
            setIsMarkAll(false)
        } else {
            const items = posts.data.map((post) => post.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark un-mark
    const handleMark = (postId) => {
        const existsMark = markItems.some((item) => item === postId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== postId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, postId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected posts")}?`
            action = "admin.posts.bulk.delete"
        } else if (selectedOption === "Publish") {
            confirmMessage = `${translate("You want to publish selected posts")}?`
            action = "admin.posts.bulk.publish"
        } else if (selectedOption === "UnPublish") {
            confirmMessage = `${translate("You want to unpublish selected posts")}?`
            action = "admin.posts.bulk.unpublish"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.post(route(action, { ids: markItems.join(",") }))
        })
    }

    // handle post status toggle
    const handlePostStatusToggle = (postId) => {
        router.post(route("admin.posts.status.toggle", { id: postId }))
    }

    return (
        <>
            <Head title="All posts" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Posts")}</h2>
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
                                    {translate("Posts")}
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
                                                            onClick={() => setSelectedOption("Publish")}
                                                            className={`dropdown-item ${selectedOption === "Publish" ? "active" : ""}`}
                                                            href="#"
                                                        >
                                                            {translate("Publish")}
                                                        </a>
                                                        <a
                                                            onClick={() => setSelectedOption("UnPublish")}
                                                            className={`dropdown-item ${selectedOption === "UnPublish" ? "active" : ""}`}
                                                            href="#"
                                                        >
                                                            {translate("UnPublish")}
                                                        </a>
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
                                            <div className="position-relative">
                                                <DropDownButton selectedOption={selectedStatus}>
                                                    <a
                                                        onClick={() => setSelectedStatus("All Status")}
                                                        className={`dropdown-item ${selectedStatus === "All Status" ? "active" : ""}`}
                                                        href="#"
                                                    >
                                                        {translate("All Status")}
                                                    </a>
                                                    <a
                                                        onClick={() => setSelectedStatus("Published")}
                                                        className={`dropdown-item ${selectedStatus === "Published" ? "active" : ""}`}
                                                        href="#"
                                                    >
                                                        {translate("Published")}
                                                    </a>
                                                    <a
                                                        onClick={() => setSelectedStatus("UnPublished")}
                                                        className={`dropdown-item ${selectedStatus === "UnPublished" ? "active" : ""}`}
                                                        href="#"
                                                    >
                                                        {translate("UnPublished")}
                                                    </a>
                                                </DropDownButton>
                                            </div>
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton selectedOption={selectedCategory}>
                                                        <a
                                                            onClick={() => setSelectedCategory("All Categories")}
                                                            className={`dropdown-item ${selectedCategory === "All Categories" ? "active" : ""}`}
                                                            href="#"
                                                        >
                                                            {translate("All Categories")}
                                                        </a>
                                                        {filteredCategories.map((category) => (
                                                            <a
                                                                key={category.key}
                                                                onClick={() => setSelectedCategory(category.value)}
                                                                className={`dropdown-item ${selectedCategory === category.value ? "active" : ""}`}
                                                                href="#"
                                                            >
                                                                {category.value}
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
                                            {hasPermission("posts.create") && (
                                                <Link href={route("admin.posts.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                    <ThSortable
                                                        width="10%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="published_by"
                                                    >
                                                        {translate("Published By")}
                                                    </ThSortable>

                                                    <ThSortable sort={sort} onSorted={() => getResults(searchQuery)} column="category_title">
                                                        {translate("Categories")}
                                                    </ThSortable>

                                                    <ThSortable width="1%" sort={sort} onSorted={() => getResults(searchQuery)} column="published_by">
                                                        {translate("Comments")}
                                                    </ThSortable>

                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    {hasPermission("posts.edit") && (
                                                        <ThSortable width="9%" sort={sort} onSorted={() => getResults(searchQuery)} column="status">
                                                            {translate("Status")}
                                                        </ThSortable>
                                                    )}
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {posts.data.map((post, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(post.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${markItems.some((item) => item === post.id) && "active"}`}
                                                            />
                                                        </td>
                                                        <td>
                                                            {post?.content?.title}
                                                            <a
                                                                href="#"
                                                                style={{ color: "#007aff", marginLeft: "5px" }}
                                                                onClick={(e) => {
                                                                    e.preventDefault()
                                                                    setEditModal(true)
                                                                    setEditedData(post)
                                                                }}
                                                            >
                                                                (Slug)
                                                            </a>
                                                        </td>
                                                        <td>
                                                            <div className="yoo-table-medias yoo-style1">
                                                                <a href="">{post?.user?.name}</a>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="yoo-base-color1">{post?.category?.content?.title}</span>
                                                        </td>
                                                        <td>
                                                            <div className="yoo-line-1-2 yoo-base-color1">{post.comments_count}</div>
                                                        </td>
                                                        <td>{moment(post.created_at).format("ll")}</td>
                                                        {hasPermission("posts.edit") && (
                                                            <td>
                                                                <div
                                                                    className={`yoo-switch ${post.status === "1" ? "active" : ""}`}
                                                                    onClick={() => handlePostStatusToggle(post.id)}
                                                                >
                                                                    <div className="yoo-switch-in" />
                                                                </div>
                                                            </td>
                                                        )}
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("posts.edit") && (
                                                                    <Link href={route("admin.posts.edit", post)} className="badge badge-primary">
                                                                        <IonIcon
                                                                            icon={createOutline}
                                                                            style={{
                                                                                height: "16px",
                                                                                width: "16px"
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                )}
                                                                {hasPermission("posts.show") && (
                                                                    <a
                                                                        href={route("blog.show", post.slug)}
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
                                                                {hasPermission("posts.delete") && (
                                                                    <DeleteButton href={route("admin.posts.destroy", post)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!posts.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No Posts found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {posts.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {posts.links.map((link, index) => (
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
