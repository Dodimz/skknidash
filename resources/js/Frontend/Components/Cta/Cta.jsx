import React from "react"
import Button from "../Button"

export default function Cta({ data }) {
    const { background_image_url, title, sub_title, action_text, action_url } = data
    return (
        <div className="cs_team cs_style_1 cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
            <div className="container">
                <div className="cs_section_heading cs_style_1">
                    {sub_title && (
                        <p
                            className="cs_section_subtitle cs_fs_18 cs_medium cs_ternary_color"
                            dangerouslySetInnerHTML={{
                                __html: sub_title
                            }}
                        />
                    )}
                    {title && (
                        <h2
                            className="cs_section_title cs_fs_53 cs_normal mb-0 cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}

                    <div className="cs_height_35 cs_height_lg_25" />
                    {(action_url || action_text) && (
                        <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_color cs_white_bg" />
                    )}
                </div>
            </div>
        </div>
    )
}
