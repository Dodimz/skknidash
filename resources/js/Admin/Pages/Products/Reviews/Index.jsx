import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import { stopCircleOutline, checkmarkCircleOutline, chatboxOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"
import hasPermission from "@/Admin/Utils/hasPermission"

export default function Index({ reviews }) {

    return (
        <>
            <Head title="All Product Reviews" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">{translate("All Product Reviews")}</h2>
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
                                    {translate("Reviews")}
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div className="">
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                    </div>
                                    <div id="yooDataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table id="yooDataTable" className="display dataTable no-footer" style={{ width: "100%" }}>
                                            <thead>
                                                <tr role="row">
                                                    <th
                                                        width="30%"
                                                    >
                                                        {translate("Product Title")}
                                                    </th>
                                                    <th
                                                        width="20%"
                                                    >
                                                        {translate("Author")}
                                                    </th>
                                                    <th
                                                        width="10%"
                                                    >
                                                        {translate("Ratings")}
                                                    </th>
                                                    {(hasPermission("product_reviews.approve") || hasPermission("product_reviews.unApprove")) && (
                                                        <th style={{ width: "1%" }} className="sorting">
                                                            {translate("Action")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews.data.map((review, index) => {
                                                    const ratingValue = parseFloat(review?.rating);
                                                    return (
                                                        <tr className={`odd ${review?.is_approved === '0' ? "un-approved-comment" : ""}`} key={index}>
                                                            <td>
                                                                <div className="yoo-table-medias yoo-style1" style={{ display: "flex", gap: "10px" }}>
                                                                    <img src={review?.product?.thumbnail_image} alt="" style={{ width: "50px", height: "50px" }} /> <span>{review?.product?.content?.title}</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div
                                                                    className="d-flex"
                                                                    style={{
                                                                        gap: "10px"
                                                                    }}
                                                                >
                                                                    <div className="author-details">
                                                                        <span>{review?.name}</span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="">
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
                                                            </td>
                                                            {(hasPermission("product_reviews.approve") || hasPermission("product_reviews.unApprove")) && (
                                                                <td>
                                                                    <div
                                                                        className="d-flex"
                                                                        style={{
                                                                            gap: "5px"
                                                                        }}
                                                                    >
                                                                        {review?.is_approved === '1' ? (
                                                                            hasPermission("product_reviews.unApprove") && (
                                                                                <Link
                                                                                    href={route("admin.reviews.unApproved", review.id)}
                                                                                    method="get"
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
                                                                            )
                                                                        ) : (
                                                                            hasPermission("product_reviews.approve") && (
                                                                                <Link
                                                                                    href={route("admin.reviews.approved", review.id)}
                                                                                    method="get"
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
                                                                            )
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                        {!reviews.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px"
                                                }}
                                            >
                                                <p>{translate("No reviews found")}!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {reviews.total > 1 && (
                        <div className="pagination-wrapper" style={{ marginTop: "10px" }}>
                            <ul className="pagination">
                                {reviews.links.map((link, index) => (
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
