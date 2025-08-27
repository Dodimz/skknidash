import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import YoutubeBackground from "react-youtube-background"

export default function PortfolioDetails1({ data }) {
    const { image_url, text_editor_content, banner_type, gallery_list, youtube_id, title, product_info_list } = data
    return (
        <div className="container">
            {banner_type === "static" && (
                <>{image_url && <img src={image_url} alt="Casestudy" className="cs_radius_50_0_0_0" style={{ marginBottom: "30px" }} />}</>
            )}
            {banner_type === "slider" && (
                <div className="cs_radius_50_0_0_0 overflow-hidden cs_case_study_slider" style={{ marginBottom: "30px" }}>
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper" loop={true} speed={800}>
                        {gallery_list?.map((galleryItem, index) => (
                            <SwiperSlide key={index}>
                                <img src={galleryItem.gallery_image_url} alt="Casestudy" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
            {banner_type === "video" && (
                <div className="cs_case_study_video cs_radius_50_0_0_0" style={{ marginBottom: "30px" }}>
                    <YoutubeBackground videoId={youtube_id} className="cs_video_bg"></YoutubeBackground>
                </div>
            )}
            {title && (
                <h1
                    class="cs_post_title cs_fs_60 cs_normal"
                    style={{ marginBottom: "40px" }}
                    dangerouslySetInnerHTML={{
                        __html: title
                    }}
                />
            )}
            <div className="cs_project_details_wrap">
                <div className="cs_project_details_info">
                    <h3 className="cs_project_details_info_title cs_fs_24" style={{ marginBottom: "15px" }}>
                        Project Info
                    </h3>
                    <ul className="cs_project_details_info_list cs_mp0">
                        {product_info_list?.map((item, index) => (
                            <li key={index}>
                                <p
                                    className="cs_primary_color mb-0 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: item.product_info_title
                                    }}
                                />
                                <p
                                    className="mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: item.product_info_subtitle
                                    }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cs_project_details_right">
                    <div
                        className="cs_casestudy_details"
                        style={{ paddingLeft: "0" }}
                        dangerouslySetInnerHTML={{
                            __html: text_editor_content
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
