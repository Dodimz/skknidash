import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import Button from "../Button"

export default function Service3({ data }) {
    const { section_title, section_subtitle, service_list, pagination_style } = data

    return (
        <>
            {(section_subtitle || section_title) && (
                <>
                    <div className="container">
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
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}

            <div className="container-fluid">
                <div
                    className={`${pagination_style === "pagination_0" ? " cs_swiper_pagination_wrap_0" : ""}${
                        pagination_style === "pagination_1" ? " cs_swiper_pagination_wrap_1" : ""
                    }${pagination_style === "pagination_2" ? " cs_swiper_pagination_wrap_2" : ""}${
                        pagination_style === "pagination_3" ? " cs_swiper_pagination_wrap_3" : ""
                    }`}
                >
                    <Swiper
                        spaceBetween={24}
                        pagination={{
                            clickable: true
                        }}
                        slidesPerView={1}
                        modules={[Pagination]}
                        className="mySwiper"
                        speed={700}
                        loop={true}
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
                        {service_list?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="cs_card cs_style_4">
                                    {item.service_image_url && (
                                        <div className="cs_card_img">
                                            <img src={item.service_image_url} alt={item.service_title} />
                                        </div>
                                    )}

                                    {item.service_title && (
                                        <h2
                                            className="cs_card_title cs_fs_30 cs_normal"
                                            dangerouslySetInnerHTML={{
                                                __html: item.service_title
                                            }}
                                        />
                                    )}
                                    {item.service_subtitle && (
                                        <p
                                            className="cs_card_subtitle"
                                            dangerouslySetInnerHTML={{
                                                __html: item.service_subtitle
                                            }}
                                        />
                                    )}
                                    {(item.service_btn_url || item.service_btn_text) && (
                                        <Button
                                            href={item.service_btn_url}
                                            btnText={item.service_btn_text}
                                            btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color"
                                        />
                                    )}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}
