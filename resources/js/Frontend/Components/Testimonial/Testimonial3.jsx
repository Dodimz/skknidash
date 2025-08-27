import React from "react"
import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import Rating from "../Rating"

export default function Testimonial3({ data }) {
    const { section_title, section_subtitle, image_url, video_url, testimonial_list } = data
    const [iframeSrc, setIframeSrc] = useState("about:blank")
    const [toggle, setToggle] = useState(false)
    const handelClick = () => {
        const isYouTubeLink = video_url.includes("youtube.com")
        if (isYouTubeLink) {
            const video = video_url.split("?v=")[1].trim()
            setIframeSrc(`https://www.youtube.com/embed/${video}`)
        } else {
            setIframeSrc(`${video_url}`)
        }

        setToggle(!toggle)
    }
    const handelClose = () => {
        setIframeSrc("about:blank")
        setToggle(!toggle)
    }
    return (
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
                {(section_subtitle || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
                <div className="row align-items-center cs_gap_y_40">
                    <div className="col-lg-5">
                        <div className="cs_testimonial_2_video cs_type_1">
                            <span className="cs_testimonial_2_video_shape cs_ternary_color">
                                <svg width={77} height={84} viewBox="0 0 77 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.5">
                                        <path
                                            d="M15.0071 18.6364C17.1053 22.4928 20.17 25.7713 22.4964 29.4918C24.7743 33.1394 27.5233 36.5393 30.2334 39.8469C35.7169 46.5544 42.1571 52.6791 49.8019 56.8124C50.8169 57.3612 51.9195 56.0207 51.0549 55.1853C44.9013 49.2792 38.9127 43.2128 33.0359 37.0444C30.1671 34.0428 27.3355 30.9991 24.5412 27.9133C21.593 24.6494 19.1986 20.9046 16.2407 17.6844C15.6191 17.0142 14.5894 17.8738 15.0071 18.6364Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M43.7756 1.09195C43.7531 5.4822 44.8559 9.83247 45.0989 14.2137C45.3345 18.5077 46.1022 22.8121 46.8805 27.0168C48.4477 35.5376 51.1342 44.0094 55.8365 51.3181C56.4609 52.2886 58.0733 51.6463 57.7191 50.4974C55.1781 42.3552 52.8591 34.1524 50.6872 25.914C49.6224 21.9008 48.6105 17.8686 47.6515 13.8175C46.6437 9.53625 46.3529 5.10092 45.3155 0.853256C45.0943 -0.0337773 43.7776 0.222497 43.7756 1.09195Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M0.725625 51.1746C4.57366 53.2881 8.92326 54.3933 12.89 56.269C16.7766 58.1097 20.926 59.4875 24.9929 60.8086C33.2296 63.4943 41.9571 65.173 50.6234 64.5251C51.7742 64.439 51.9786 62.7154 50.7999 62.4789C42.4316 60.8296 34.1158 58.9562 25.8389 56.9366C21.8037 55.9587 17.7771 54.9253 13.7591 53.8364C9.51545 52.6806 5.47833 50.8211 1.25014 49.7073C0.365001 49.4787 -0.0376274 50.7583 0.725625 51.1746Z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            </span>
                            {video_url ? (
                                <div
                                    className="cs_video_block cs_style_1 cs_bg_filed"
                                    style={{
                                        backgroundImage: `url(${image_url})`
                                    }}
                                    onClick={handelClick}
                                >
                                    <span className="cs_player_btn cs_accent_color">
                                        <span />
                                    </span>
                                </div>
                            ) : (
                                <div
                                    className="cs_video_block cs_style_1 cs_bg_filed"
                                    style={{
                                        backgroundImage: `url(${image_url})`,
                                        cursor: "initial"
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                    <div className="col-xl-6 offset-xl-1 col-lg-7 position-relative">
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
                                        <div className="cs_height_45 cs_height_lg_30" />
                                        <div className="cs_testimonial_info d-flex align-items-center">
                                            {item.testimonial_image_url && <img src={item.testimonial_image_url} alt={item.avatar_name} />}
                                            <div>
                                                <h3 className="cs_fs_24 cs_normal mb-0">{item.avatar_name}</h3>
                                                <div className="cs_height_5 cs_height_lg_5"></div>
                                                <p className="mb-0">{item.avatar_designation}</p>
                                                <div className="cs_height_12 cs_height_lg_12"></div>
                                                {item.review_number && (
                                                    <Rating className="cs_rating cs_accent_color" ratingNumber={item.review_number} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {testimonial_list?.length > 1 && (
                            <>
                                <div className="cs_height_60 cs_height_lg_35" />
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
                        <div className="cs_testimonial_1_2_quote cs_ternary_color">
                            <svg width={162} height={122} viewBox="0 0 162 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M54 0H27C19.8392 0 12.9716 2.84463 7.90812 7.90812C2.84464 12.9716 0 19.8392 0 27L0 54C0 57.5804 1.42232 61.0142 3.95406 63.5459C6.4858 66.0777 9.91958 67.5 13.5 67.5H47.25C47.2393 76.4478 43.6801 85.026 37.353 91.353C31.026 97.6801 22.4478 101.239 13.5 101.25C10.8147 101.25 8.23935 102.317 6.34054 104.216C4.44174 106.114 3.375 108.69 3.375 111.375C3.375 114.06 4.44174 116.636 6.34054 118.534C8.23935 120.433 10.8147 121.5 13.5 121.5C27.8168 121.484 41.5425 115.789 51.666 105.666C61.7895 95.5425 67.4839 81.8168 67.5 67.5V13.5C67.5 9.91958 66.0777 6.4858 63.5459 3.95406C61.0142 1.42232 57.5804 0 54 0Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M148.5 0H121.5C114.339 0 107.472 2.84463 102.408 7.90812C97.3446 12.9716 94.5 19.8392 94.5 27V54C94.5 57.5804 95.9223 61.0142 98.4541 63.5459C100.986 66.0777 104.42 67.5 108 67.5H141.75C141.739 76.4478 138.18 85.026 131.853 91.353C125.526 97.6801 116.948 101.239 108 101.25C105.315 101.25 102.739 102.317 100.841 104.216C98.9417 106.114 97.875 108.69 97.875 111.375C97.875 114.06 98.9417 116.636 100.841 118.534C102.739 120.433 105.315 121.5 108 121.5C122.317 121.484 136.043 115.789 146.166 105.666C156.289 95.5425 161.984 81.8168 162 67.5V13.5C162 9.91958 160.578 6.4858 158.046 3.95406C155.514 1.42232 152.08 0 148.5 0Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div className={toggle ? "cs_video_popup active" : "cs_video_popup"}>
                <div className="cs_video_popup_overlay" />
                <div className="cs_video_popup_content">
                    <div className="cs_video_popup_layer" />
                    <div className="cs_video_popup_container">
                        <div className="cs_video_popup_align">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={iframeSrc} title="video modal" />
                            </div>
                        </div>
                        <div className="cs_video_popup_close" onClick={handelClose} />
                    </div>
                </div>
            </div>
        </>
    )
}
