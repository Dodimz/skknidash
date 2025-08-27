import React from "react"

export default function Banner4({ data }) {
    const { title, subtitle, image_url, background_image_url } = data
    return (
        <>
            <div className="container">
                <div className="cs_section_heading cs_style_1">
                    {image_url && (
                        <div className="cs_shape_1">
                            <img src={image_url} alt="Icon" />
                        </div>
                    )}
                    <p
                        className="cs_section_subtitle cs_fs_18 cs_medium"
                        dangerouslySetInnerHTML={{
                            __html: subtitle
                        }}
                    />
                    <h2
                        className="cs_section_title cs_fs_53 cs_normal mb-0"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                </div>
            </div>
            {background_image_url && (
                <>
                    <div className="cs_height_90 cs_height_lg_70" />
                    <div
                        className="cs_about_thumb_1 cs_bg_filed"
                        style={{
                            backgroundImage: `url(${background_image_url})`
                        }}
                    />
                </>
            )}
        </>
    )
}
