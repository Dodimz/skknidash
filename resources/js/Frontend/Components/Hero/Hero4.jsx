import React from "react"
import Button from "../Button"

export default function Hero4({ data }) {
    const { background_image_url, title, sub_title, action_text, action_url, action_text_2, action_url_2 } = data
    return (
        <>
            <div
                className="cs_hero cs_style_4 text-center cs_center cs_bg_filed cs_bg_fixed cs_primary_bg"
                style={{ backgroundImage: `url(${background_image_url})` }}
            >
                <div className="container">
                    <div className="cs_hero_text">
                        {sub_title && (
                            <p
                                className="cs_hero_subtitle cs_ternary_color cs_fs_18 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: sub_title
                                }}
                            />
                        )}
                        {title && (
                            <h1
                                className="cs_hero_title cs_white_color cs_fs_120 cs_bold"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        )}

                        <div className="cs_hero_btns">
                            {(action_url || action_text) && (
                                <Button
                                    href={action_url}
                                    btnText={action_text}
                                    btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_color cs_white_bg cs_w_100_sm"
                                />
                            )}
                            {(action_url_2 || action_text_2) && (
                                <Button
                                    href={action_url_2}
                                    btnText={action_text_2}
                                    btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_accent_bg cs_w_100_sm"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
