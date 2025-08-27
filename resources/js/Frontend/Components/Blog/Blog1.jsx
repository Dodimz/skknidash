import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import NavigationLink from "@/Components/NavigationLink"
import moment from "moment"

export default function Blog1({ data }) {
    const { section_title, section_subtitle, pagination_style } = data
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
            <div className="container-fluid">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={24}
                    pagination={{
                        clickable: true
                    }}
                    speed={800}
                    loop={true}
                    modules={[Pagination]}
                    className={`mySwiper${pagination_style === "pagination_0" ? " cs_swiper_pagination_wrap_0" : ""}${pagination_style === "pagination_1" ? " cs_swiper_pagination_wrap_1" : ""
                        }${pagination_style === "pagination_2" ? " cs_swiper_pagination_wrap_2" : ""}${pagination_style === "pagination_3" ? " cs_swiper_pagination_wrap_3" : ""
                        }`}
                    breakpoints={{
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        991: {
                            slidesPerView: 3
                        },
                        1400: {
                            slidesPerView: 4
                        }
                    }}
                >
                    {blogs?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="cs_post cs_style_1">
                                <NavigationLink href={route("blog.show", item?.slug)} className="cs_post_thumb">
                                    <img src={item?.thumbnail_image} alt={item?.content?.title} />
                                </NavigationLink>
                                <div className="cs_post_info">
                                    <div className="cs_post_meta">
                                        <span className="cs_medium cs_fs_18 cs_primary_color">
                                            <a href="blog-details.html">{item?.category?.content?.title}</a>
                                        </span>
                                        <span>{moment(item?.created_at).format("ll")}</span>
                                    </div>
                                    <h2 className="cs_post_title cs_fs_30 cs_normal mb-0">
                                        <NavigationLink href={route("blog.show", item?.slug)}>{item?.content?.title}</NavigationLink>
                                    </h2>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}
