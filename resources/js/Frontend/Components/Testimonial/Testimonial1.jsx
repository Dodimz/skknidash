import React from "react"
import Button from "../Button"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

export default function Testimonial1({ data }) {
    const { section_title, section_subtitle, section_description, section_btn_text, section_btn_url, testimonial_list } = data
    return (
        <>
            <div className="container">
                <div className="cs_section_heading cs_style_2">
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
                    {(section_description || section_btn_url || section_btn_text) && (
                        <div className="cs_section_heading_right">
                            {section_description && (
                                <p
                                    className="cs_section_heading_text mb-0 cs_fs_18 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                            )}
                            {(section_btn_url || section_btn_text) && (
                                <Button
                                    href={section_btn_url}
                                    btnText={section_btn_text}
                                    btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color cs_fs_18 cs_medium"
                                />
                            )}
                        </div>
                    )}
                </div>
                {(section_subtitle || section_title || section_description || section_btn_url || section_btn_text) && (
                    <div className="cs_height_85 cs_height_lg_50" />
                )}
            </div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-9">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={false}
                            navigation={{
                                nextEl: ".cs_right_arrow",
                                prevEl: ".cs_left_arrow",
                                disabledClass: "swiper-button-disabled"
                            }}
                            modules={[Navigation]}
                            speed={800}
                            loop={true}
                            className="mySwiper"
                        >
                            {testimonial_list?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="cs_testimonial cs_style_1">
                                        <div
                                            className="cs_testimonial_text cs_primary_font cs_fs_30 cs_primary_color fst-italic"
                                            dangerouslySetInnerHTML={{
                                                __html: item.testimonial_text
                                            }}
                                        />
                                        <div className="cs_height_30 cs_height_lg_30" />
                                        <div className="cs_testimonial_info d-flex align-items-center">
                                            {item.testimonial_image_url && <img src={item.testimonial_image_url} alt={item.avatar_name} />}
                                            <div>
                                                <h3 className="cs_fs_24 cs_normal mb-0">{item.avatar_name}</h3>
                                                <p className="mb-0">{item.avatar_designation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {testimonial_list?.length > 1 && (
                            <>
                                <div className="cs_height_35 cs_height_lg_35" />
                                <div className="cs_slider_arrows cs_style1">
                                    <div className="cs_left_arrow cs_accent_bg rounded-circle cs_center cs_white_color">
                                        <svg width={17} height={12} viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM17 5.25L1 5.25V6.75L17 6.75V5.25Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                    <div className="cs_right_arrow cs_accent_bg rounded-circle cs_center cs_white_color">
                                        <svg width={17} height={12} viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16.5303 6.53033C16.8232 6.23744 16.8232 5.76256 16.5303 5.46967L11.7574 0.696698C11.4645 0.403805 10.9896 0.403805 10.6967 0.696698C10.4038 0.989592 10.4038 1.46447 10.6967 1.75736L14.9393 6L10.6967 10.2426C10.4038 10.5355 10.4038 11.0104 10.6967 11.3033C10.9896 11.5962 11.4645 11.5962 11.7574 11.3033L16.5303 6.53033ZM6.55671e-08 6.75L16 6.75L16 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="col-lg-3 text-end cs_ternary_color cs_mobile_hide">
                        <svg width={176} height={176} viewBox="0 0 176 176" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.3"
                                d="M147.583 88.0002H124.666V69.6668C124.666 59.5549 132.888 51.3335 143 51.3335H145.291C149.101 51.3335 152.166 48.2684 152.166 44.4585V30.7085C152.166 26.8986 149.101 23.8335 145.291 23.8335H143C117.677 23.8335 97.1665 44.3439 97.1665 69.6668V138.417C97.1665 146.008 103.325 152.167 110.916 152.167H147.583C155.174 152.167 161.333 146.008 161.333 138.417V101.75C161.333 94.159 155.174 88.0002 147.583 88.0002ZM65.0832 88.0002H42.1665V69.6668C42.1665 59.5549 50.3879 51.3335 60.4998 51.3335H62.7915C66.6014 51.3335 69.6665 48.2684 69.6665 44.4585V30.7085C69.6665 26.8986 66.6014 23.8335 62.7915 23.8335H60.4998C35.1769 23.8335 14.6665 44.3439 14.6665 69.6668V138.417C14.6665 146.008 20.8254 152.167 28.4165 152.167H65.0832C72.6743 152.167 78.8332 146.008 78.8332 138.417V101.75C78.8332 94.159 72.6743 88.0002 65.0832 88.0002Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    )
}
