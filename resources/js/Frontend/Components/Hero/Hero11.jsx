import React from "react"
import Button from "../Button"
import { Swiper, SwiperSlide } from "swiper/react"
import { Mousewheel, Pagination, Navigation } from "swiper/modules"

export default function Hero11({ data }) {
    const { slider_list } = data
    return (
        <div className="cs_fullscreen_swiper_wrap">
            <div className="cs_swiper_button_next cs_down_btn"></div>
            <Swiper
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={0}
                mousewheel={true}
                pagination={{
                    type: "custom",
                    renderCustom: (swiper, current, total) => {
                        return `
                        <div class="cs_swiper_pagination cs_number_pagination cs_primary_font">
                          <span class="swiper-pagination-current">${current}</span> / <span class="swiper-pagination-total">${total}</span>
                        </div>`
                    }
                }}
                speed={1000}
                loop={true}
                modules={[Mousewheel, Pagination, Navigation]}
                className="mySwiper"
                navigation={{
                    nextEl: ".cs_swiper_button_next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled"
                }}
            >
                {slider_list.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="cs_fullscreen_slide cs_dark_section cs_hero cs_style_10 position-relative cs_center">
                            <div className="container">
                                <div className="cs_section_heading cs_style_1">
                                    {item.sub_title && (
                                        <p
                                            className="cs_section_subtitle cs_fs_18 cs_medium cs_ternary_color"
                                            dangerouslySetInnerHTML={{
                                                __html: item.sub_title
                                            }}
                                        />
                                    )}

                                    {item.title && (
                                        <h1
                                            className="cs_section_title cs_fs_120 cs_bold cs_white_color"
                                            dangerouslySetInnerHTML={{
                                                __html: item.title
                                            }}
                                        />
                                    )}
                                    {(item.action_url || item.action_text) && (
                                        <Button
                                            href={item.action_url}
                                            btnClass="cs_btn cs_style_1 cs_type_4 cs_white_color cs_fs_18 cs_medium"
                                            btnText={item.action_text}
                                        />
                                    )}
                                </div>
                            </div>
                            <div
                                className="cs_hero_thumb cs_bg_filed"
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
