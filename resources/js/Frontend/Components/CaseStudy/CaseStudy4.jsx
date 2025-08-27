import React from "react"
import Button from "../Button"

export default function CaseStudy4({ data }) {
    const { casestudy_list } = data
    return (
        <div className="position-relative" id="all_casestudy">
            {casestudy_list?.map((item, index) => (
                <div className="cs_top_sticky_0" key={index}>
                    <div className="cs_hero cs_style_10 position-relative cs_center">
                        <div className="container">
                            <div className="cs_section_heading cs_style_1">
                                {item.casestudy_subtitle && (
                                    <p
                                        className="cs_section_subtitle cs_fs_18 cs_medium cs_ternary_color"
                                        dangerouslySetInnerHTML={{
                                            __html: item.casestudy_subtitle
                                        }}
                                    />
                                )}
                                {item.casestudy_title && (
                                    <h2
                                        className="cs_section_title cs_fs_60 cs_bold cs_white_color"
                                        dangerouslySetInnerHTML={{
                                            __html: item.casestudy_title
                                        }}
                                    />
                                )}
                                {(item?.casestudy_btn_text || item?.casestudy_btn_url) && (
                                    <Button
                                        href={item?.casestudy_btn_url}
                                        btnText={item?.casestudy_btn_text}
                                        btnClass="cs_btn cs_style_1 cs_type_4 cs_white_color cs_fs_18 cs_medium"
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            className="cs_hero_thumb cs_bg_filed"
                            style={{
                                backgroundImage: `url(${item.casestudy_image_url})`
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
