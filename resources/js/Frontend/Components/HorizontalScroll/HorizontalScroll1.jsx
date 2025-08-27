import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Mousewheel } from "swiper/modules"
import HorizontalHero from "./HorizontalHero"
import HorizontalAditionalFeature from "./HorizontalAditionalFeature"
import HorizontalService from "./HorizontalService"
import HorizontalTestimonial from "./HorizontalTestimonial"
import HorizontalFunFact from "./HorizontalFunFact"
import HorizontalContactInfo from "./HorizontalContactInfo"

export default function HorizontalScroll1({ data }) {
    const { slide_list } = data
    const [iframeSrc, setIframeSrc] = useState("about:blank")
    const [toggle, setToggle] = useState(false)

    const handleVideoClick = (videoUrl) => {
        if (!videoUrl) {
            console.error("No video URL provided")
            return
        }

        try {
            let embedUrl = videoUrl

            // Handle YouTube URLs
            if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
                let videoId = ""

                // Different YouTube URL formats
                if (videoUrl.includes("youtube.com/watch?v=")) {
                    videoId = videoUrl.split("v=")[1].split("&")[0]
                } else if (videoUrl.includes("youtu.be/")) {
                    videoId = videoUrl.split("youtu.be/")[1].split("?")[0]
                } else if (videoUrl.includes("youtube.com/embed/")) {
                    videoId = videoUrl.split("embed/")[1].split("?")[0]
                }

                if (videoId) {
                    embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
                } else {
                    console.error("Could not extract YouTube video ID")
                    return
                }
            }
            // You can add other video providers (Vimeo, etc.) here

            setIframeSrc(embedUrl)
            setToggle(true)
        } catch (error) {
            console.error("Error processing video URL:", error)
        }
    }

    const handleClose = () => {
        setIframeSrc("about:blank")
        setToggle(false)
    }

    return (
        <>
            <div className="position-relative">
                <Swiper
                    pagination={{
                        clickable: true
                    }}
                    modules={[Pagination, Mousewheel]}
                    mousewheel={true}
                    speed={1200}
                    loop={true}
                    className="mySwiper cs_swiper_pagination_wrap_4"
                >
                    {slide_list?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="cs_fullscreen_slide cs_bg_filed cs_dark_section cs_primary_bg cs_fullscreen_section"
                                style={{
                                    backgroundImage: `url(${item.background_image_url})`
                                }}
                            >
                                <div className="cs_fullscreen_slide_in">
                                    {item.slide_type === "Hero" && <HorizontalHero item={item} />}
                                    {item.slide_type === "AditionalFeature" && <HorizontalAditionalFeature item={item} />}
                                    {item.slide_type === "Service" && <HorizontalService item={item} />}
                                    {item.slide_type === "Testimonial" && <HorizontalTestimonial item={item} onVideoClick={handleVideoClick} />}
                                    {item.slide_type === "FunFact" && <HorizontalFunFact item={item} />}
                                    {item.slide_type === "ContactInfo" && <HorizontalContactInfo item={item} />}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={toggle ? "cs_video_popup active" : "cs_video_popup"}>
                <div className="cs_video_popup_overlay" onClick={handleClose} />
                <div className="cs_video_popup_content">
                    <div className="cs_video_popup_layer" />
                    <div className="cs_video_popup_container">
                        <div className="cs_video_popup_align">
                            <div className="embed-responsive embed-responsive-16by9">
                                {iframeSrc && (
                                    <iframe
                                        className="embed-responsive-item"
                                        src={iframeSrc}
                                        title="video modal"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        frameBorder="0"
                                    />
                                )}
                            </div>
                        </div>
                        <button className="cs_video_popup_close" onClick={handleClose}>
                            ×
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
