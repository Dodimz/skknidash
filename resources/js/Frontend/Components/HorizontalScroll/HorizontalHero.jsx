import React from "react"
import SocialWidget from "../Widget/SocialWidget"
import Button from "../Button"

export default function HorizontalHero({ item }) {
    return (
        <div className="cs_hero cs_style_11 w-100">
            <div className="container">
                <div className="cs_hero_text">
                    <h1
                        className="cs_hero_title cs_white_color cs_fs_60 cs_bold"
                        dangerouslySetInnerHTML={{
                            __html: item.section_title
                        }}
                    />
                    <p
                        className="cs_hero_subtitle cs_ternary_color"
                        dangerouslySetInnerHTML={{
                            __html: item.section_subtitle
                        }}
                    />
                    <div className="cs_hero_btns">
                        {(item.action_text || item.action_url) && (
                            <Button
                                href={item.action_url}
                                btnText={item.action_text}
                                btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_color cs_white_bg"
                            />
                        )}
                        {(item.action_url_2 || item.action_text_2) && (
                            <Button
                                href={item.action_url_2}
                                btnText={item.action_text_2}
                                btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_primary_bg"
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="cs_hero_info container-fluid cs_padding_120_120">
                <div>
                    {item.phone_number && <h4 className="cs_hero_contact_number cs_fs_24 cs_normal cs_white_color mb-0">{item.phone_number}</h4>}
                    <SocialWidget />
                </div>
            </div>
        </div>
    )
}
