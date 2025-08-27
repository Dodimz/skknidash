import React, { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Mousewheel, Navigation, Autoplay } from "swiper/modules"
import { Icon } from "@iconify/react"

export default function LightGallery({ modalToggle, setModalToggle, galleryList, initialSlideIndex }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [swiperRef, setSwiperRef] = useState(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const handleZoomIn = () => {
        setZoomLevel((prevZoom) => prevZoom * 1.1)
    }

    const handleZoomOut = () => {
        if (zoomLevel > 1) {
            setZoomLevel((prevZoom) => prevZoom / 1.1)
        }
    }

    const handleDownload = (imageUrl) => {
        const link = document.createElement("a")
        link.href = imageUrl
        link.download = imageUrl.substring(imageUrl.lastIndexOf("/") + 1)
        link.click()
    }

    const toggleAutoplay = () => {
        if (swiperRef && swiperRef.autoplay) {
            if (isPlaying) {
                swiperRef.autoplay.stop()
            } else {
                swiperRef.autoplay.start()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    const handleFullscreenChange = () => {
        setIsFullscreen(!!document.fullscreenElement)
    }

    useEffect(() => {
        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    const handleCloseModal = () => {
        setModalToggle(false)
        setZoomLevel(1)
    }

    return (
        modalToggle && (
            <div className="cs_gallery_modal">
                <div className="cs_gallery_modal_overlay"></div>
                <div className="cs_gallery_modal_slider_wrap">
                    <Swiper
                        onSwiper={setSwiperRef}
                        pagination={{ type: "fraction" }}
                        navigation={true}
                        modules={[Pagination, Mousewheel, Navigation, Autoplay]}
                        loop={true}
                        mousewheel={true}
                        className="mySwiper"
                        speed={1000}
                        initialSlide={initialSlideIndex}
                        autoplay={
                            isPlaying
                                ? {
                                      delay: 3000,
                                      disableOnInteraction: false
                                  }
                                : false
                        }
                    >
                        {galleryList?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="cs_gallery_modal_item">
                                    <img
                                        src={item.gallery_image_url}
                                        alt=""
                                        style={{
                                            transform: `scale(${zoomLevel})`,
                                            transition: "transform 0.3s ease"
                                        }}
                                    />
                                </div>
                                <h4 className="cs_gallery_modal_title">{item.gallery_title}</h4>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="cs_gallery_controler">
                    <button onClick={handleZoomIn} className="cs_gallery_controler_btn">
                        <Icon icon="lucide:zoom-in" width="22" height="22" />
                    </button>
                    <button onClick={handleZoomOut} className="cs_gallery_controler_btn">
                        <Icon icon="lucide:zoom-out" width="22" height="22" />
                    </button>
                    <button onClick={() => handleDownload(galleryList[initialSlideIndex]?.gallery_image_url)} className="cs_gallery_controler_btn">
                        <Icon icon="lucide:download" width="22" height="22" />
                    </button>
                    <button onClick={toggleAutoplay} className={`cs_gallery_controler_btn ${isPlaying ? "active" : ""}`}>
                        {isPlaying ? (
                            <Icon icon="lucide:circle-pause" width="22" height="22" />
                        ) : (
                            <Icon icon="lucide:circle-play" width="22" height="22" />
                        )}
                    </button>
                    <button onClick={toggleFullScreen} className="cs_gallery_controler_btn">
                        {isFullscreen ? <Icon icon="lucide:scan-line" width="22" height="22" /> : <Icon icon="lucide:scan" width="22" height="22" />}
                    </button>
                    <button onClick={handleCloseModal} className="cs_gallery_controler_btn">
                        <Icon icon="lucide:x" width="22" height="22" />
                    </button>
                </div>
            </div>
        )
    )
}
