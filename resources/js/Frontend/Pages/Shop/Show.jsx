import React from "react"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import translate from "@/utils/translate"
import gravatarUrl from "gravatar-url"
import moment from "moment"
import { addCart, decreaseCart, increaseCart } from "@/Redux/features/Cart/cart"
import { Icon } from "@iconify/react"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import Amount from "@/Components/Amount"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "@inertiajs/react"
import limitString from "@/utils/limitString"
import removeHTMLTags from "@/utils/removeHTMLTags"
import PageHeading from "@/Frontend/Components/PageHeading"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import BioneMeta from "@/utils/BioneMeta"

const Show = ({ product, categories, tags, meta_title, meta_description, meta_image, site_name, slug, shop_page_title }) => {
    const [activeTab, setActiveTab] = useState("tab_1")
    const dispatch = useDispatch()
    const { carts } = useSelector((state) => state.carts)
    const cartItem = carts?.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 1
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    let pageHeaderData = {
        title: product?.content?.title,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: shop_page_title, url: route("pages.show", slug) },
            { label: product?.content?.title, url: null }
        ]
    }

    const handleTabSwitch = (tabId, e) => {
        e.preventDefault()
        setActiveTab(tabId)
    }
    BioneMeta(
        product?.seo_title ?? product?.content?.title,
        meta_title ?? product?.content?.title,
        product?.content?.meta_tags,
        meta_description ?? limitString(removeHTMLTags(product?.content?.description), 150),
        meta_image ?? product?.thumbnail_image,
        site_name
    )
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    return (
        <FrontendLayout cart={true}>
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={true}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.svg"}
                    variant="cs_type_1"
                />
            )}

            {/* Start Products  */}
            <div className="cs_height_100 cs_height_lg_80" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <Swiper
                            spaceBetween={5}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            loop={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            speed={600}
                            className="cs_product_thumb_slider"
                        >
                            {JSON.parse(product.slider_images).map((image, index) => (
                                <SwiperSlide>
                                    <div key={index} className="cs_single_product_thumb_item">
                                        <img src={image} alt="Thumb" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {JSON.parse(product.slider_images || "[]").length > 1 && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                loop={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                speed={600}
                                className="cs_product_nav_slider"
                            >
                                {JSON.parse(product.slider_images).map((image, index) => (
                                    <SwiperSlide>
                                        <div key={index} className="cs_single_product_thumb_mini">
                                            <img src={image} alt="Thumb" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                    <div className="col-lg-6">
                        <div className="cs_single-product-details">
                            <h2>{product.content?.title}</h2>
                            <div className="cs_single_product-price_review">
                                <div className="cs_single_product_price">
                                    <span>Price: </span>
                                    <span className="cs_accent_color cs_semi_bold">
                                        <Amount amount={product.discount_price ?? product.price} />
                                    </span>
                                    {product.discount_price && (
                                        <span style={{ textDecoration: "line-through", marginLeft: "8px", color: "var(--secondary)" }}>
                                            <Amount amount={product.price} />
                                        </span>
                                    )}
                                </div>
                                {product.reviews_avg_rating === null ? (
                                    ""
                                ) : (
                                    <div className="cs_rating cs_size_sm cs_accent_color">
                                        <div className="cs_rating_stars">
                                            {[1, 2, 3, 4, 5].map((star) => {
                                                const avgRating = parseFloat(product.reviews_avg_rating)
                                                return (
                                                    <Icon
                                                        key={star}
                                                        icon={
                                                            avgRating >= star
                                                                ? "fa6-solid:star"
                                                                : avgRating >= star - 0.5
                                                                    ? "fa6-solid:star-half-stroke"
                                                                    : "fa6-regular:star"
                                                        }
                                                        className="cs_star_icon"
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="cs_height_20 cs_height_lg_20" />
                            <div className="cs_single-product-details-text">
                                <div dangerouslySetInnerHTML={{ __html: product.content.short_description }} />
                            </div>
                            <div className="cs_height_25 cs_height_lg_25" />
                            {product.quantity === 0 ? (
                                translate("Out of Stock")
                            ) : (
                                <div className="cs_quantity_and_btn">
                                    <div className="cs_quantity">
                                        <button
                                            onClick={() => (cartItem ? dispatch(increaseCart(product.id)) : dispatch(addCart(product)))}
                                            className="cs_quantity_button cs_increment"
                                        >
                                            <Icon icon="fa6-solid:angle-up" />
                                        </button>
                                        <span className="cs_quantity_input">{quantity}</span>
                                        <button
                                            onClick={() => dispatch(decreaseCart(product.id))}
                                            disabled={!cartItem || quantity === 1}
                                            className="cs_quantity_button cs_decrement"
                                        >
                                            <Icon icon="fa6-solid:angle-down" />
                                        </button>
                                    </div>
                                    <a
                                        href="javascript:void(0)"
                                        onClick={() => {
                                            dispatch(addCart(product))
                                        }}
                                        className="cs_product_btn cs_semi_bold"
                                    >
                                        {translate("Add to cart")}
                                    </a>
                                </div>
                            )}
                            <div className="cs_height_40 cs_height_lg_30" />
                            <ul className="cs_single_product_info">
                                <li>
                                    <b>{translate("SKU")}: </b>
                                    {product.sku}
                                </li>
                                <li>
                                    <b>{translate("Categories")}: </b>
                                    {product?.category?.content?.title}
                                </li>
                                <li>
                                    <b>{translate("Tags")}: </b>
                                    {product?.tags?.map((tag) => tag.name.en)?.join(", ")}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="cs_height_100 cs_height_lg_60" />
                <div className="cs_product_meta_info">
                    <div className="cs_tabs cs_style2">
                        <ul className="cs_tab_links cs_product_tab cs_semi_bold">
                            <li className={activeTab === "tab_1" ? "active" : ""}>
                                <Link href="#" onClick={(e) => handleTabSwitch("tab_1", e)}>
                                    {translate("Description")}
                                </Link>
                            </li>
                            <li className={activeTab === "tab_2" ? "active" : ""}>
                                <Link href="#" onClick={(e) => handleTabSwitch("tab_2", e)}>
                                    {translate("Review")} ({product?.reviews?.length})
                                </Link>
                            </li>
                        </ul>
                        <div className="cs_height_30 cs_height_lg_30" />
                        <div className="cs_tab_body">
                            <div className={`cs_tab ${activeTab === "tab_1" ? "active" : ""}`} id="tab_1">
                                <div dangerouslySetInnerHTML={{ __html: product.content.description }} />
                            </div>
                            {/* .cs_tab */}
                            <div className={`cs_tab ${activeTab === "tab_2" ? "active" : ""}`} id="tab_2">
                                {" "}
                                <ul className="cs_client_review_list">
                                    {product?.reviews?.map((review, index) => {
                                        const ratingValue = parseFloat(review?.rating)
                                        return (
                                            <li key={index}>
                                                <div className="cs_client_review">
                                                    <div className="cs_review_media">
                                                        <div className="cs_review_media_thumb">
                                                            <img src={gravatarUrl(review?.email)} alt="Avatar" style={{ borderRadius: "50%" }} />
                                                        </div>
                                                        <div className="cs_review_media_right">
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
                                                            <p className="m-0 cs_heading_color cs_semi_bold">{review?.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="cs_review_posted_by">{moment(review?.created_at).format("MMMM D, YYYY")}</div>
                                                    <div className="cs_review_text">{review?.review}</div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                                {product?.reviews?.length === 0 && <div>{translate("No Review Found")}</div>}
                                <div className="cs_height_85 cs_height_lg_45" />
                            </div>
                            {/* .cs_tab */}
                        </div>
                        {/* .cs_tab_body */}
                    </div>
                    {/* .cs_tabs */}
                </div>
            </div>
            <div className="cs_height_100 cs_height_lg_80" />
            {/* End Products  */}
        </FrontendLayout>
    )
}

export default Show
