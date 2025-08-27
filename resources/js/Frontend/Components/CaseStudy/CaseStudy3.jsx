import React from "react"
import Button from "../Button"
import { Swiper, SwiperSlide } from "swiper/react"
import VideoModal from "../VideoModal"
import NavigationLink from "@/Components/NavigationLink"

export default function CaseStudy3({ data }) {
    const { marquee_text, section_title, section_subtitle, casestudy_list, section_btn_text, section_btn_url } = data
    return (
        <>
            {marquee_text && (
                <>
                    <div className="cs_moving_section_wrap">
                        <div className="cs_moving_section_in cs_primary_font cs_primary_color cs_fs_120 cs_text_shadow_style">
                            <div
                                className="cs_moving_section cs_moving_duration_40"
                                dangerouslySetInnerHTML={{
                                    __html: marquee_text
                                }}
                            />
                            <div
                                className="cs_moving_section cs_moving_duration_40"
                                dangerouslySetInnerHTML={{
                                    __html: marquee_text
                                }}
                            />
                        </div>
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}

            <div className="container-fluid pr-0">
                <div className=" cs_grid_style_3">
                    <div className="cs_grid_item">
                        <div className="cs_section_heading cs_style_1">
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

                            {(section_btn_url || section_btn_text) && (
                                <>
                                    <div className="cs_height_45 cs_height_lg_30" />
                                    <Button
                                        href={section_btn_url}
                                        btnText={section_btn_text}
                                        btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color"
                                    />
                                </>
                            )}
                        </div>
                        <div className="cs_height_85 cs_height_lg_50" />
                    </div>
                    <div className="cs_grid_item">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={24}
                            pagination={false}
                            className="mySwiper"
                            breakpoints={{
                                575: {
                                    slidesPerView: 2
                                },
                                1600: {
                                    slidesPerView: 3
                                }
                            }}
                        >
                            {casestudy_list?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    {item.link_type === "normal_link" && (
                                        <div className="cs_case_study cs_style_1">
                                            <NavigationLink
                                                href={item?.casestudy_btn_url}
                                                className="cs_case_study_thumb cs_bg_filed"
                                                style={{
                                                    backgroundImage: `url(${item?.casestudy_image_url})`
                                                }}
                                            />
                                            <div className="cs_case_study_info cs_white_color">
                                                <div className="cs_case_study_info_in">
                                                    <h2 className="cs_case_study_title cs_fs_30 cs_normal cs_white_color">
                                                        <NavigationLink href={item?.casestudy_btn_url}>{item?.casestudy_title}</NavigationLink>
                                                    </h2>
                                                    <Button
                                                        href={item?.casestudy_btn_url}
                                                        btnText={item?.casestudy_btn_text}
                                                        btnClass="cs_btn cs_style_1 cs_type_1"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {item.link_type === "youtube_link" && (
                                        <VideoModal videoSrc={item.youtube_video_url} imageUrl={item.casestudy_image_url} />
                                    )}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}
