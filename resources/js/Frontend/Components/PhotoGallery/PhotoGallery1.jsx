import React, { useState } from "react"
import LightGallery from "./LightGallery"

export default function PhotoGallery1({ data }) {
    const { section_subtitle, section_title, gallery_list } = data
    const [modalToggle, setModalToggle] = useState(false)
    const [initialSlideIndex, setInitialSlideIndex] = useState(0)

    const slideTo = (index) => {
        setInitialSlideIndex(index)
        setModalToggle(true)
    }

    return (
        <>
            {(section_subtitle || section_title) && (
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
                    <div className="cs_height_85 cs_height_lg_50" />
                </div>
            )}
            <div className="container">
                <div className="cs_gallery cs_style_1">
                    {gallery_list?.map((item, index) => (
                        <div
                            className="cs_gallery_item cs_bg_filed"
                            style={{
                                backgroundImage: `url(${item.gallery_image_url})`
                            }}
                            key={index}
                            onClick={() => slideTo(index)}
                        >
                            <div className="cs_gallery_hover">
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <LightGallery
                modalToggle={modalToggle}
                setModalToggle={setModalToggle}
                galleryList={gallery_list}
                initialSlideIndex={initialSlideIndex}
            />
        </>
    )
}
