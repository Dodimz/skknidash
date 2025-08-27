import React from "react"

export default function Banner5({ data }) {
    const { title, subtitle, background_image_url } = data
    return (
        <div
            className="cs_page_heading cs_style_1 cs_bg_filed cs_primary_bg"
            style={{
                backgroundImage: `url(${background_image_url})`
            }}
        >
            <div className="container">
                <div className="cs_section_heading cs_style_1">
                    {subtitle && (
                        <p
                            className="cs_section_subtitle cs_fs_18 cs_medium cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: subtitle
                            }}
                        />
                    )}
                    {title && (
                        <h1
                            className="cs_section_title cs_fs_53 cs_normal mb-0 cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
