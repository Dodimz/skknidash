import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import YoutubeBackground from "react-youtube-background"

export default function CaseStudyDetails2({ data }) {
    const { image_url, avatar_name, category, post_date, text_editor_content, banner_type, gallery_list, youtube_id, title } = data
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

            {(category || post_date || avatar_name) && (
                <div className="cs_post cs_style_1">
                    <div class="cs_post_info">
                        <div class="cs_post_meta">
                            {category && <span class="cs_medium cs_fs_18 cs_primary_color">{category}</span>}
                            {post_date && <span>{post_date}</span>}
                            {avatar_name && <span>{avatar_name}</span>}
                        </div>
                    </div>
                </div>
            )}
            {title && (
                <h1
                    class="cs_post_title cs_fs_60 cs_normal"
                    style={{ marginBottom: "30px" }}
                    dangerouslySetInnerHTML={{
                        __html: title
                    }}
                />
            )}
            <div
                className="cs_casestudy_details"
                style={{ paddingLeft: "0" }}
                dangerouslySetInnerHTML={{
                    __html: text_editor_content
                }}
            />
        </div>
    )
}
