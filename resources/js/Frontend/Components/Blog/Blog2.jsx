import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import NavigationLink from "@/Components/NavigationLink"
import Button from "../Button"

export default function Blog2({ data }) {
    const { section_title, section_subtitle, action_text, pagination_style, navigation_style } = data
    const blogs = localStorage.getItem("blogs") ? JSON.parse(localStorage.getItem("blogs")) : []
    return (
        <>
            <div className="container">
                {(section_subtitle || section_title) && (
                    <>
                        <div className="cs_section_heading cs_style_1 text-center">
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
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                            )}
                        </div>
                        <div className="cs_height_85 cs_height_lg_50" />
                    </>
                )}
            </div>
            <div className="position-relative">
                <div className="container">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        pagination={{
                            clickable: true
                        }}
                        speed={800}
                        loop={true}
                        modules={[Pagination, Navigation]}
                        navigation={{
                            nextEl: ".cs_right_arrow",
                            prevEl: ".cs_left_arrow",
                            disabledClass: "swiper-button-disabled"
                        }}
                        className={`mySwiper${pagination_style === "pagination_0" ? " cs_swiper_pagination_wrap_0" : ""}${
                            pagination_style === "pagination_1" ? " cs_swiper_pagination_wrap_1" : ""
                        }${pagination_style === "pagination_2" ? " cs_swiper_pagination_wrap_2" : ""}${
                            pagination_style === "pagination_3" ? " cs_swiper_pagination_wrap_3" : ""
                        }`}
                        breakpoints={{
                            767: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            991: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        {blogs?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="cs_post cs_style_2">
                                    <NavigationLink href={route("blog.show", item?.slug)} className="cs_post_thumb">
                                        <img src={item?.thumbnail_image} alt={item?.content?.title} />
                                    </NavigationLink>
                                    <div className="cs_post_info">
                                        <h2 className="cs_post_title cs_fs_30 cs_normal">
                                            <NavigationLink href={route("blog.show", item?.slug)}>{item?.content?.title}</NavigationLink>
                                        </h2>
                                        <p className="cs_post_subtitle">{item?.content?.content.replace(/<[^>]*>/g, "").substring(0, 200)}</p>
                                        {action_text && (
                                            <Button
                                                href={route("blog.show", item?.slug)}
                                                btnText={action_text}
                                                btnClass="cs_btn cs_style_1 cs_type_4 cs_primary_color cs_fs_18 cs_medium"
                                            />
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {navigation_style === "navigation_0" && ""}
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
            </div>
        </>
    )
}
