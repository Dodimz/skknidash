import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import Rating from "../Rating"
import Button from "../Button"

export default function Testimonial2({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const { section_title, section_subtitle, section_description, section_btn_text, section_btn_url, testimonial_list } = data
    const [iframeSrc, setIframeSrc] = useState("about:blank")
    const [toggle, setToggle] = useState(false)
    const handelClick = (video_url) => {
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

                <div className="position-relative">
                    <Swiper
                        loop={true}
                        spaceBetween={10}
                        navigation={false}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                        speed={800}
                    >
                        {testimonial_list?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="row align-items-center cs_gap_y_30 cs_reverse_lg">
                                    <div className="col-lg-6">
                                        <div className="cs_testimonial cs_style_2 position-relative">
                                            <span className="cs_testimonial_quote cs_ternary_color">
                                                <svg width={72} height={72} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.5" clipPath="url(#clip0_20)">
                                                        <path
                                                            d="M24 12.0002H12C8.8174 12.0002 5.76516 13.2644 3.51472 15.5149C1.26428 17.7653 0 20.8176 0 24.0002L0 36.0002C0 37.5915 0.632141 39.1176 1.75736 40.2428C2.88258 41.368 4.4087 42.0002 6 42.0002H21C20.9952 45.9769 19.4134 49.7895 16.6013 52.6015C13.7893 55.4135 9.97679 56.9954 6 57.0002C4.80653 57.0002 3.66193 57.4743 2.81802 58.3182C1.97411 59.1621 1.5 60.3067 1.5 61.5002C1.5 62.6936 1.97411 63.8382 2.81802 64.6821C3.66193 65.526 4.80653 66.0002 6 66.0002C12.363 65.993 18.4633 63.4621 22.9627 58.9628C27.462 54.4635 29.9929 48.3632 30 42.0002V18.0002C30 16.4089 29.3679 14.8827 28.2426 13.7575C27.1174 12.6323 25.5913 12.0002 24 12.0002Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M66 12.0002H54C50.8174 12.0002 47.7652 13.2644 45.5147 15.5149C43.2643 17.7653 42 20.8176 42 24.0002V36.0002C42 37.5915 42.6321 39.1176 43.7574 40.2428C44.8826 41.368 46.4087 42.0002 48 42.0002H63C62.9952 45.9769 61.4134 49.7895 58.6013 52.6015C55.7893 55.4135 51.9768 56.9954 48 57.0002C46.8065 57.0002 45.6619 57.4743 44.818 58.3182C43.9741 59.1621 43.5 60.3067 43.5 61.5002C43.5 62.6936 43.9741 63.8382 44.818 64.6821C45.6619 65.526 46.8065 66.0002 48 66.0002C54.363 65.993 60.4633 63.4621 64.9627 58.9628C69.462 54.4635 71.9929 48.3632 72 42.0002V18.0002C72 16.4089 71.3679 14.8827 70.2426 13.7575C69.1174 12.6323 67.5913 12.0002 66 12.0002Z"
                                                            fill="currentColor"
                                                        />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_20">
                                                            <rect width={72} height={72} fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <div className="cs_testimonial_info">
                                                <h3 className="cs_fs_30 cs_normal">{item.avatar_name}</h3>
                                                <p>{item.avatar_designation}</p>
                                                {item.review_number && (
                                                    <Rating className="cs_rating cs_accent_color" ratingNumber={item.review_number} />
                                                )}
                                            </div>
                                            <div className="cs_height_85 cs_height_lg_30" />
                                            <div
                                                className="cs_testimonial_text cs_primary_font cs_fs_30 cs_primary_color fst-italic"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.testimonial_text
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-5 offset-lg-1">
                                        <div className="cs_testimonial_2_video">
                                            {item.testimonial_video_url ? (
                                                <div
                                                    className="cs_video_block cs_style_1 cs_bg_filed"
                                                    style={{
                                                        backgroundImage: `url(${item.testimonial_video_image_url})`
                                                    }}
                                                    onClick={() => handelClick(item.testimonial_video_url)}
                                                >
                                                    <span className="cs_player_btn cs_accent_color">
                                                        <span />
                                                    </span>
                                                </div>
                                            ) : (
                                                <div
                                                    className="cs_video_block cs_style_1 cs_bg_filed"
                                                    style={{
                                                        backgroundImage: `url(${item.testimonial_video_image_url})`,
                                                        cursor: "initial"
                                                    }}
                                                ></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <span className="cs_testimonial_2_video_shape cs_ternary_color">
                        <svg width={77} height={84} viewBox="0 0 77 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g opacity="0.5">
                                <path
                                    d="M61.197 18.6364C59.0987 22.4929 56.0338 25.7714 53.7072 29.4918C51.4292 33.1394 48.68 36.5393 45.9697 39.8469C40.4859 46.5544 34.0452 52.6791 26.4 56.8124C25.3848 57.3613 24.2822 56.0207 25.1468 55.1853C31.3009 49.2792 37.2898 43.2128 43.1671 37.0444C46.036 34.0428 48.8678 30.9991 51.6623 27.9133C54.6106 24.6494 57.0052 20.9046 59.9633 17.6845C60.585 17.0142 61.6147 17.8739 61.197 18.6364Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M32.4263 1.09199C32.4489 5.48223 31.3459 9.8325 31.1029 14.2138C30.8674 18.5078 30.0996 22.8121 29.3213 27.0168C27.7539 35.5376 25.0672 44.0095 20.3646 51.3181C19.7402 52.2886 18.1277 51.6463 18.482 50.4974C21.0231 42.3553 23.3422 34.1524 25.5143 25.9141C26.5792 21.9008 27.5912 17.8686 28.5502 13.8176C29.558 9.53629 29.8489 5.10096 30.8863 0.853294C31.1076 -0.0337411 32.4243 0.222532 32.4263 1.09199Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M75.4788 51.1747C71.6305 53.2882 67.2807 54.3933 63.3136 56.2691C59.4268 58.1097 55.2772 59.4875 51.21 60.8086C42.9728 63.4944 34.2447 65.173 25.5778 64.5251C24.427 64.4391 24.2226 62.7155 25.4014 62.479C33.7702 60.8297 42.0865 58.9562 50.3639 56.9367C54.3994 55.9588 58.4263 54.9254 62.4445 53.8365C66.6884 52.6806 70.7258 50.8211 74.9543 49.7074C75.8395 49.4788 76.2421 50.7583 75.4788 51.1747Z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                    </span>
                </div>
                <div className="cs_height_100 cs_height_lg_40"></div>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={0}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                    speed={800}
                >
                    {testimonial_list?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="cs_avatar_box">
                                {item.testimonial_image_url && <img src={item.testimonial_image_url} alt={item.avatar_name} />}
                                <div className="cs_avatar_box_right">
                                    <h3 className="cs_fs_24 mb-0 cs_normal">{item.avatar_name}</h3>
                                    <p className="mb-0 cs_secondary_color">{item.avatar_designation}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
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
