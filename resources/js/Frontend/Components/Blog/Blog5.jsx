import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import NavigationLink from "@/Components/NavigationLink"
import Button from "../Button"

export default function Blog5({ data }) {
    const { section_title, section_subtitle, action_text, pagination_style } = data
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
                        },
                        1400: {
                            slidesPerView: 4
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
        </>
    )
}
