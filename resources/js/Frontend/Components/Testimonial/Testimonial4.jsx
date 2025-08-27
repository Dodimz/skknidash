import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

export default function Testimonial4({ data }) {
    const { section_title, section_subtitle, image_url, testimonial_list } = data
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_50">
                <div className="col-lg-6 position-relative">
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
                    </div>
                    {(section_subtitle || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
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
                    <div className="cs_testimonial_1_1_quote cs_ternary_color">
                        <svg width={387} height={339} viewBox="0 0 387 339" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                opacity="0.1"
                                d="M350.245 169.5H289.959V121.271C289.959 94.6695 311.587 73.0417 338.188 73.0417H344.217C354.239 73.0417 362.303 64.9784 362.303 54.9558V18.7839C362.303 8.76125 354.239 0.697937 344.217 0.697937H338.188C271.572 0.697937 217.615 54.6543 217.615 121.271V302.13C217.615 322.1 233.817 338.302 253.787 338.302H350.245C370.215 338.302 386.417 322.1 386.417 302.13V205.672C386.417 185.702 370.215 169.5 350.245 169.5ZM133.214 169.5H72.9277V121.271C72.9277 94.6695 94.5555 73.0417 121.157 73.0417H127.186C137.208 73.0417 145.271 64.9784 145.271 54.9558V18.7839C145.271 8.76125 137.208 0.697937 127.186 0.697937H121.157C54.5404 0.697937 0.583984 54.6543 0.583984 121.271V302.13C0.583984 322.1 16.786 338.302 36.7559 338.302H133.214C153.184 338.302 169.386 322.1 169.386 302.13V205.672C169.386 185.702 153.184 169.5 133.214 169.5Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </div>
                <div className="col-lg-5 offset-lg-1">{image_url && <img src={image_url} alt="Thumb" className="w-100" />}</div>
            </div>
        </div>
    )
}
