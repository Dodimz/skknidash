import React from "react"

export default function Banner6({ data }) {
    const { title, subtitle, background_image_url } = data
    return (
        <>
            <div className="container">
                {(subtitle || title) && (
                    <>
                        <div className="cs_section_heading cs_style_1">
                            {subtitle && (
                                <p
                                    className="cs_section_subtitle cs_fs_18 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: subtitle
                                    }}
                                />
                            )}
                            {title && (
                                <h1
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: title
                                    }}
                                />
                            )}
                        </div>
                        <div className="cs_height_85 cs_height_lg_50" />
                    </>
                )}
            </div>
            {background_image_url && (
                <div className="cs_half_white">
                    <div className="container">
                        <img src={background_image_url} alt="Thumbnail" className="cs_radius_50_50_0_0" />
                    </div>
                </div>
            )}
        </>
    )
}
