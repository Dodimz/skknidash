import React from "react"
import Button from "../Button"
import { Link } from "@inertiajs/react"
import translate from "@/utils/translate"
import Amount from "@/Components/Amount"
import { useDispatch } from "react-redux"
import { addCart } from "@/Redux/features/Cart/cart"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"

export default function TrendingProduct1({ data }) {
    const { section_title, section_subtitle, action_text, pagination_style, navigation_style, is_auto_play } = data
    const dispatch = useDispatch()
    const trendingProducts = localStorage.getItem("trending_products") ? JSON.parse(localStorage.getItem("trending_products")) : []

    // Get shop page URL with trending filter
    const shopUrl = "/shop?filter[type]=trending"

    return (
        <>
            <div className="container">
                <div className="cs_section_heading cs_style_3">
                    <div className="cs_section_heading_left">
                        {section_subtitle && (
                            <p
                                className="cs_section_subtitle cs_fs_18 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}
                        {section_title && (
                            <h2
                                className="cs_section_title cs_fs_53 cs_normal mb-0 cs_normal"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_section_heading_right">
                        {action_text && (
                            <Button
                                href={shopUrl}
                                btnText={action_text}
                                btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                            />
                        )}
                    </div>
                </div>
                {(action_text || section_title) && <div className="cs_height_80 cs_height_lg_50" />}
            </div>
            <div className="position-relative cs_hover_show_arrow">
                <div className="container">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        pagination={{
                            clickable: true
                        }}
                        autoplay={
                            is_auto_play
                                ? {
                                      delay: 5000,
                                      disableOnInteraction: false
                                  }
                                : false
                        }
                        navigation={{
                            nextEl: ".cs_right_arrow",
                            prevEl: ".cs_left_arrow",
                            disabledClass: "swiper-button-disabled"
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        speed={800}
                        loop={true}
                        className={`mySwiper${pagination_style === "pagination_0" ? " cs_swiper_pagination_wrap_0" : ""}${
                            pagination_style === "pagination_1" ? " cs_swiper_pagination_wrap_1" : ""
                        }${pagination_style === "pagination_2" ? " cs_swiper_pagination_wrap_2" : ""}${
                            pagination_style === "pagination_3" ? " cs_swiper_pagination_wrap_3" : ""
                        }`}
                        breakpoints={{
                            575: {
                                slidesPerView: 1,
                                slidesPerView: 2
                            },
                            991: {
                                slidesPerView: 3,
                                spaceBetween: 24
                            },
                            1400: {
                                slidesPerView: 4,
                                spaceBetween: 24
                            }
                        }}
                    >
                        {trendingProducts?.map((product, index) => (
                            <SwiperSlide key={index}>
                                <div className="cs_product_card cs_style_1">
                                    <div className="cs_product_thumb">
                                        <img src={product.thumbnail_image} alt={product.seo_title || "Product Image"} />
                                        <div className="cs_product_overlay" />
                                        {product.quantity === 0 ? (
                                            <div className="cs_out_of_stock_message">{translate("Out of Stock")}</div>
                                        ) : (
                                            <div className="cs_card_btns">
                                                <a
                                                    href="javascript:void(0)"
                                                    onClick={() => {
                                                        dispatch(addCart(product))
                                                    }}
                                                >
                                                    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#a1)">
                                                            <path
                                                                d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z"
                                                                fill="currentColor"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="a1">
                                                                <rect width={24} height={24} fill="currentColor" />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </a>
                                                <Link href={`/product/${product.slug}`}>
                                                    <svg width={22} height={16} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M11 0.5C6 0.5 1.73 3.61 0 8C1.73 12.39 6 15.5 11 15.5C16 15.5 20.27 12.39 22 8C20.27 3.61 16 0.5 11 0.5ZM11 13C8.24 13 6 10.76 6 8C6 5.24 8.24 3 11 3C13.76 3 16 5.24 16 8C16 10.76 13.76 13 11 13ZM11 5C9.34 5 8 6.34 8 8C8 9.66 9.34 11 11 11C12.66 11 14 9.66 14 8C14 6.34 12.66 5 11 5Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <div className="cs_product_info">
                                        <h2 className="cs_product_title">
                                            <Link href={`/product/${product.slug}`}>{product?.content?.title}</Link>
                                        </h2>
                                        <p className="cs_product_price">
                                            {translate("Price")}:{" "}
                                            <span className="cs_present_price">
                                                <Amount amount={product.discount_price ?? product.price} />
                                            </span>
                                            {product.discount_price && (
                                                <span className="cs_discunt_price">
                                                    <Amount amount={product.price} />
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {navigation_style === "navigation_0" && ""}
                    {trendingProducts?.length > 4 && (
                        <>
                            {navigation_style === "navigation_1" && (
                                <div className="cs_slider_arrows cs_style2 cs_mobile_hide">
                                    <div className="cs_left_arrow cs_accent_color">
                                        <svg width={52} height={24} viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.939339 10.9393C0.353554 11.5251 0.353554 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807611 11.0711 0.807611 10.4853 1.3934L0.939339 10.9393ZM52 10.5L2 10.5V13.5L52 13.5V10.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="cs_right_arrow cs_accent_color">
                                        <svg width={52} height={24} viewBox="0 0 52 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M51.0607 13.0607C51.6464 12.4749 51.6464 11.5251 51.0607 10.9393L41.5147 1.3934C40.9289 0.807611 39.9792 0.807611 39.3934 1.3934C38.8076 1.97919 38.8076 2.92893 39.3934 3.51472L47.8787 12L39.3934 20.4853C38.8076 21.0711 38.8076 22.0208 39.3934 22.6066C39.9792 23.1924 40.9289 23.1924 41.5147 22.6066L51.0607 13.0607ZM0 13.5H50V10.5H0V13.5Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
