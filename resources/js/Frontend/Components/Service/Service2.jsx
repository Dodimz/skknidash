import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import Button from "../Button"

export default function Service2({ data }) {
    const { section_title, section_subtitle, section_btn_text, section_btn_url, service_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title || section_btn_url || section_btn_text) && (
                <>
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
                        {(section_btn_url || section_btn_text) && (
                            <div className="cs_section_heading_right">
                                <Button
                                    href={section_btn_url}
                                    btnText={section_btn_text}
                                    btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                                />
                            </div>
                        )}
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}

            <div className="cs_auto_per_view_1 cs_full_screen_right">
                <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={24}
                    pagination={false}
                    modules={[Pagination]}
                    className="mySwiper"
                    speed={700}
                    loop={true}
                    breakpoints={{
                        992: {
                            spaceBetween: 40
                        },
                        1400: {
                            spaceBetween: 70
                        }
                    }}
                >
                    {service_list?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="cs_card cs_style_1 cs_shining">
                                {item.service_image_url && (
                                    <div className="cs_card_img cs_shining_item">
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
                                        btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color cs_shining_btn"
                                    />
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
