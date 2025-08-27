import React from "react"
import Button from "../Button"

export default function Hero14({ data }) {
    const { title, sub_title, background_image_url, action_text, action_url, action_text_2, action_url_2, background_attachment } = data
    return (
        <section
            className="cs_hero cs_style_1 cs_type_1 cs_center cs_bg_filed"
            style={{
                backgroundImage: `url(${background_image_url})`,
                backgroundAttachment: background_attachment
            }}
        >
            <div className="container">
                <h1
                    className="cs_hero_title cs_fs_120"
                    dangerouslySetInnerHTML={{
                        __html: title
                    }}
                />
                <div
                    className="cs_hero_subtitle cs_fs_18 cs_medium"
                    dangerouslySetInnerHTML={{
                        __html: sub_title
                    }}
                />
                <div className="cs_hero_btns">
                    {(action_text || action_url) && (
                        <Button
                            href={action_url}
                            btnText={action_text}
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_accent_bg cs_w_100_sm"
                        />
                    )}
                    {(action_url_2 || action_text_2) && (
                        <Button
                            href={action_url_2}
                            btnText={action_text_2}
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_primary_bg cs_w_100_sm"
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
