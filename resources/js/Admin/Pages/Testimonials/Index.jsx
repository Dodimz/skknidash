import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { search, starOutline } from "ionicons/icons"
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

export default function Index({ testimonials, sort, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.testimonials.index", {
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
            const items = testimonials.data.map((testimonial) => testimonial.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (testimonialId) => {
        const existsMark = markItems.some((item) => item === testimonialId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== testimonialId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, testimonialId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        setIsMarkAll([])
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to delete selected testimonials")}?`, `${translate("Delete")}!`, () => {
            router.delete(
                route("admin.testimonials.bulk.delete", {
                    ids: markItems.join(",")
                })
            )
        })
    }

    useEffect(() => {
        setSelectedLang(filtered_lang)
    }, [filtered_lang])

    return (
        <>
            <Head title="All testimonials" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All testimonials")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={starOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Testimonials")}
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
                                            {hasPermission("testimonials.create") && (
                                                <Link href={route("admin.testimonials.create")} className="btn btn-success btn-sm yoo-table-btn1">
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
                                                    <ThSortable
                                                        width="30%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="client_image"
                                                    >
                                                        {translate("Image")}
                                                    </ThSortable>
                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                        {translate("Name")}
                                                    </ThSortable>

                                                    <ThSortable sort={sort} onSorted={() => getResults(searchQuery)} column="designation">
                                                        {translate("Designation")}
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
                                                {testimonials.data.map((testimonial, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(testimonial.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some((item) => item === testimonial.id) && "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>
                                                            <img
                                                                style={{
                                                                    width: "50px"
                                                                }}
                                                                src={testimonial?.client_image}
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td>{testimonial?.content?.name}</td>
                                                        <td>
                                                            <span className="yoo-base-color1">{testimonial?.content?.designation}</span>
                                                        </td>
                                                        <td>{moment(testimonial.created_at).format("ll")}</td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px"
                                                                }}
                                                            >
                                                                {hasPermission("testimonials.edit") && (
                                                                    <Link
                                                                        href={route("admin.testimonials.edit", testimonial)}
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
                                                                {/*<a href="" className='badge badge-secondary'><IonIcon icon={eyeOutline} style={{height: "16px", width: "16px",}}/></a>*/}

                                                                {hasPermission("testimonials.delete") && (
                                                                    <DeleteButton href={route("admin.testimonials.destroy", testimonial)} />
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!testimonials.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No History Found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {testimonials.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {testimonials.links.map((link, index) => (
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
