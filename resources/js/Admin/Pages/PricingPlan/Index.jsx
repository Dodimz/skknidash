import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { cashOutline, createOutline, eyeOutline, search } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import moment from "moment"
import { useState } from "react"
import { router } from "@inertiajs/react"
import ThSortable from "@/Admin/Components/Table/ThSortable"
import DropDownButton from "@/Admin/Components/Button/DropDownButton"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import DeleteButton from "@/Admin/Components/Button/DeleteButton"
import { useEffect } from "react"
import translate from "@/utils/translate"
import hasPermission from "@/Admin/Utils/hasPermission"

export default function Index({ pricingPlans, sort, filtered_lang, languages }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedLang, setSelectedLang] = useState(filtered_lang)
    const [selectedOption, setSelectedOption] = useState(translate("Bulk Action"))
    const [isMarkAll, setIsMarkAll] = useState(false)
    const [markItems, setMarkItems] = useState([])

    // handle search sort
    const getResults = (search, lang) => {
        router.get(
            route("admin.pricing.plans.index", {
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
            const items = pricingPlans.data.map((pricingPlan) => pricingPlan.id)
            setMarkItems(items)
            setIsMarkAll(true)
        }
    }

    // handle mark unmark
    const handleMark = (pricingPlanId) => {
        const existsMark = markItems.some((item) => item === pricingPlanId)
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== pricingPlanId)
            setMarkItems(removeItem)
        } else {
            const addedItem = [...markItems, pricingPlanId]
            setMarkItems(addedItem)
        }
    }

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = ""
        let action = ""

        if (selectedOption === "Delete") {
            confirmMessage = `${translate("Do You want to delete selected pricing plans")}?`
            action = "admin.pricing.plans.bulk.delete"
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
            <Head title="All Pricing Plans" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Pricing Plans")}</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={cashOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px"
                                            }}
                                        />
                                    </span>
                                    {translate("Pricing Plans")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div>
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            {hasPermission("pricing_plans.delete") && (
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
                                            {hasPermission("pricing_plans.create") && (
                                                <Link href={route("admin.pricing.plans.create")} className="btn btn-success btn-sm yoo-table-btn1">
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

                                                    <ThSortable width="30%" sort={sort} onSorted={() => getResults(searchQuery)} column="name">
                                                        {translate("Name")}
                                                    </ThSortable>

                                                    <ThSortable width="20%" sort={sort} onSorted={() => getResults(searchQuery)} column="price">
                                                        {translate("Price")}
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() => getResults(searchQuery)}
                                                        column="plan_duration"
                                                    >
                                                        {translate("Plan Duration")}
                                                    </ThSortable>

                                                    <ThSortable width="15%" sort={sort} onSorted={() => getResults(searchQuery)} column="created_at">
                                                        {translate("Date")}
                                                    </ThSortable>
                                                    {(hasPermission("pricing_plans.edit") || hasPermission("pricing_plans.show") || hasPermission("pricing_plans.delete")) && (
                                                        <th style={{ width: "15%" }} className="sorting">
                                                            {translate("Action")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {pricingPlans.data.map((pricingPlan, index) => (
                                                    <tr className="odd" key={index}>
                                                        <td className="sorting_1" onClick={() => handleMark(pricingPlan.id)}>
                                                            <div
                                                                className={`yoo-check-mark ${markItems.some((item) => item === pricingPlan.id) && "active"
                                                                    }`}
                                                            />
                                                        </td>
                                                        <td className="yoo-table-medias yoo-style1">
                                                            <a href={route("pricing.plan", pricingPlan)} target="_blank">
                                                                {pricingPlan?.content?.name}
                                                            </a>
                                                        </td>
                                                        <td>
                                                            {pricingPlan?.currency?.symbol} {pricingPlan?.price}
                                                        </td>
                                                        <td>{pricingPlan?.content?.plan_duration}</td>
                                                        <td>{moment(pricingPlan?.created_at).format("ll")}</td>
                                                        {(hasPermission("pricing_plans.edit") || hasPermission("pricing_plans.show") || hasPermission("pricing_plans.delete")) && (
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "5px"
                                                                    }}
                                                                >
                                                                    {hasPermission("pricing_plans.edit") && (
                                                                        <Link
                                                                            href={route("admin.pricing.plans.edit", pricingPlan)}
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
                                                                    {hasPermission("pricing_plans.show") && (
                                                                        <a
                                                                            href={route("pricing.plan", pricingPlan)}
                                                                            className="badge badge-secondary"
                                                                            target="_blank"
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
                                                                    {hasPermission("pricing_plans.delete") && (
                                                                        <DeleteButton href={route("admin.pricing.plans.destroy", pricingPlan)} />
                                                                    )}
                                                                </div>
                                                            </td>
                                                        )}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!pricingPlans.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No Pricing Plan Found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {pricingPlans.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {pricingPlans.links.map((link, index) => (
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
