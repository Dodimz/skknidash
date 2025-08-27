import React from "react"

export default function CaseStudyDetails1({ data }) {
    const { title, category, banner_bg_url, image_url, text_editor_content } = data
    return (
        <>
            {(category || title || banner_bg_url) && (
                <>
                    <div
                        className="cs_page_heading cs_style_1 cs_bg_filed cs_primary_bg"
                        style={{
                            backgroundImage: `url(${banner_bg_url})`
                        }}
                    >
                        <div className="container">
                            <div className="cs_section_heading cs_style_1">
                                {category && (
                                    <p
                                        className="cs_section_subtitle cs_fs_18 cs_medium cs_white_color"
                                        dangerouslySetInnerHTML={{
                                            __html: category
                                        }}
                                    />
                                )}
                                <h1
                                    className="cs_section_title cs_fs_53 cs_normal mb-0 cs_white_color"
                                    dangerouslySetInnerHTML={{
                                        __html: title
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cs_height_100 cs_height_lg_60"></div>
                </>
            )}
            <div className="container">
                <div className="row position-relative cs_gap_y_50">
                    <div className="col-lg-5">
                        <div className="cs_top_sticky_100">
                            <div className="cs_case_study_details_thumb cs_radius_50_0_0_0">
                                <img src={image_url} alt="Casestudy" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <div
                            className="cs_casestudy_details"
                            dangerouslySetInnerHTML={{
                                __html: text_editor_content
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
