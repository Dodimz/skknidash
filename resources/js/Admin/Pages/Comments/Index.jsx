import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { search, stopCircleOutline, checkmarkCircleOutline, chatboxOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import gravatarUrl from "gravatar-url"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"

export default function Index({ comments, sort }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.comments.index", {
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
            const items = comments.data.map((comment) => comment.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (commentId) => {
        const existsMark = markItems.some((item) => item === commentId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== commentId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, commentId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("You want to delete selected comments")}?`
            action = "admin.comments.bulk.delete"
        }
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }))
        })
    }

    return (
        <>
            <Head title="All comments" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All comments")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={chatboxOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Comments")}
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
                                                    <ThSortable
                                                        width="20%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="comment_author_name"
                                                    >
                                                        {translate("Author")}
                                                    </ThSortable>
                                                    <ThSortable
                                                        width="30%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="comment_content"
                                                    >
                                                        {translate("Comments")}
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="comment_content"
                                                    >
                                                        {translate("In response to")}
                                                    </ThSortable>

                                                    <ThSortable width="10%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Submitted on")}
                                                    </ThSortable>
                                                    <th style={{ width: "1%" }} className="sorting">
                                                        {translate("Action")}
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {comments.data.map((comment, index) => (
                                                    <tr className={`odd ${comment.is_approved === "0" ? "un-approved-comment" : ""}`} key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(comment.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === comment.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "10px"
                                                                }}
                                                            >
                                                                <div className="author-img">
                                                                    <img
                                                                        src={gravatarUrl(comment.comment_author_email, {
                                                                            size: 40
                                                                        })}
                                                                        loading="lazy"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="author-details">
                                                                    <strong>{comment.comment_author_name}</strong> <br />
                                                                    <a href="">{comment.comment_author_email}</a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="yoo-table-medias yoo-style1">{comment.comment_content}</div>
                                                        </td>
                                                        <td>
                                                            <span className="yoo-table-medias yoo-style1">
                                                                <strong>
                                                                    <Link href={route("admin.posts.edit", comment.post.id)}>
                                                                        {comment.post.title}
                                                                    </Link>
                                                                </strong>
                                                            </span>
                                                            <span className="yoo-table-medias yoo-style1">
                                                                <a href={route("blog.show", comment.post.slug)} target="_blank">
                                                                    {translate("View Post")}
                                                                </a>
                                                            </span>
                                                        </td>
                                                        <td>{moment(comment.created_at).format("lll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {comment.is_approved === "1" ? (
                                                                    <>
                                                                        {hasPermission("comments.unApprove") && (
                                                                            <Link
                                                                                href={route("admin.comments.unApproved", comment)}
                                                                                className="badge badge-warning"
                                                                                title="UnApproved"
                                                                            >
                                                                                <IonIcon
                                                                                    icon={stopCircleOutline}
                                                                                    style={{
                                                                                        height: "16px",
                                                                                        width: "16px"
                                                                                    }}
                                                                                />
                                                                            </Link>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {hasPermission("comments.approve") && (
                                                                            <Link
                                                                                href={route("admin.comments.approved", comment)}
                                                                                className="badge badge-success"
                                                                                title="Approved"
                                                                            >
                                                                                <IonIcon
                                                                                    icon={checkmarkCircleOutline}
                                                                                    style={{
                                                                                        height: "16px",
                                                                                        width: "16px"
                                                                                    }}
                                                                                />
                                                                            </Link>
                                                                        )}
                                                                    </>
                                                                )}
                                                                {hasPermission("comments.delete") && (
                                                                    <DeleteButton href={route("admin.comments.destroy", comment)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!comments.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No comments found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {comments.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {comments.links.map((link, index) => (
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
