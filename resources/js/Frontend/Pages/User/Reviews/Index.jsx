import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import React from "react"
import MakeReviewModal from "./MakeReviewModal"
import { useState } from "react"
import { Icon } from "@iconify/react"
import { Head, Link } from "@inertiajs/react"
import DOMPurify from "dompurify"

export default function Index({ products }) {
    const [isCreateModal, setIsCreateModal] = useState(false)
    const [currentProductId, setCurrentProductId] = useState(null)

    // page header data
    let pageHeaderData = {
        title: translate("Reviews"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("User"), url: null },
            { label: translate("Reviews"), url: route("user.review.index") }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Product Review" />
            {/* Start Review  */}
            <div className="cs_dashboard_right">
                <h2 className="cs_fs_30 cs_mb_20 cs_normal">{translate("Products For Review")}</h2>
                <div className="cs_table_wrap">
                    <div className="table-responsive">
                        <table className="cs_table_1 m-0">
                            <thead>
                                <tr>
                                    <th>{translate("Product Title")}</th>
                                    <th>{translate("Is Reviewed")}</th>
                                    <th>{translate("Status")}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.data?.map((product, index) => {
                                    const ratingValue = parseFloat(product?.rating) || 0
                                    return (
                                        <tr key={index}>
                                            <td style={{ display: "flex", gap: "10px" }}>
                                                <img src={product?.product_image} alt="" /> <span>{product?.product_name}</span>
                                            </td>
                                            <td>
                                                {product?.already_reviewed ? (
                                                    <span className="cs_blue_color cs_medium">Reviewed</span>
                                                ) : (
                                                    <span className="cs_purple_color cs_medium">Not Reviewed</span>
                                                )}
                                            </td>
                                            <td>
                                                {product?.is_approved === "1" ? (
                                                    <span className="cs_blue_color cs_medium">Approved</span>
                                                ) : (
                                                    <span className="cs_purple_color cs_medium">Pending</span>
                                                )}
                                            </td>
                                            <td>
                                                {product?.already_reviewed ? (
                                                    <>
                                                        <div className="cs_rating cs_size_sm cs_accent_color">
                                                            <div className="cs_rating_stars">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <Icon
                                                                        key={star}
                                                                        icon={
                                                                            ratingValue >= star
                                                                                ? "fa6-solid:star"
                                                                                : ratingValue >= star - 0.5
                                                                                ? "fa6-solid:star-half-stroke"
                                                                                : "fa6-regular:star"
                                                                        }
                                                                        className="cs_star_icon"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span
                                                        onClick={() => {
                                                            setCurrentProductId(product.product_id)
                                                            setIsCreateModal(true)
                                                        }}
                                                        className="cs_link_btn"
                                                    >
                                                        Make Review
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                                {products?.total === 0 && (
                                    <tr>
                                        <td colspan="7" class="text-center">
                                            {translate("Data Not Found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="cs_table_1_footer">
                        <div className="cs_table_1_footer_left"></div>
                        <div className="cs_table_1_footer_right">
                            <ul className="pagination justify-content-center justify-content-md-start mb-0">
                                {products?.links.map((link, index) => (
                                    <li key={index} className={`page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`}>
                                        {link.url ? (
                                            <Link
                                                className="page-link"
                                                href={link.url}
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(link.label)
                                                }}
                                            />
                                        ) : (
                                            <span
                                                className="page-link"
                                                dangerouslySetInnerHTML={{
                                                    __html: DOMPurify.sanitize(link.label)
                                                }}
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Review  */}
            <MakeReviewModal isModal={isCreateModal} closeModal={(e) => setIsCreateModal(e)} productId={currentProductId} />
        </UserDashboardLayout>
    )
}
