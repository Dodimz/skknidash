import React from "react"
import Button from "../Button"

export default function Hero15({ data }) {
    const { background_image_url, title, sub_title, action_text, action_url } = data
    return (
        <section className="cs_hero cs_style_8 cs_type_1">
            <div className="cs_hero_thumb cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }} />
            <div className="cs_hero_right">
                <div className="cs_section_heading cs_style_1">
                    {title && (
                        <h2
                            className="cs_section_title cs_fs_80 cs_bold"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    {sub_title && (
                        <p
                            className="cs_fs_18 cs_medium"
                            dangerouslySetInnerHTML={{
                                __html: sub_title
                            }}
                        />
                    )}

                    {(action_url || action_text) && (
                        <Button href={action_url} btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_accent_bg" btnText={action_text} />
                    )}
                </div>
            </div>
        </section>
    )
}
