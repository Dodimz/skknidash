import React from "react"
import Button from "../Button"
import NavigationLink from "@/Components/NavigationLink"

export default function Category1({ data }) {
    const { section_title, section_subtitle, category_list } = data
    return (
        <div className="container">
            <div className="cs_section_heading cs_style_1">
                {section_subtitle && (
                    <p
                        className="cs_section_subtitle cs_fs_18 cs_medium"
                        dangerouslySetInnerHTML={{
                            __html: section_subtitle
                        }}
                    />
                )}

                {section_title && (
                    <h2
                        className="cs_section_title cs_fs_53 cs_normal mb-0"
                        dangerouslySetInnerHTML={{
                            __html: section_title
                        }}
                    />
                )}
            </div>
            {(section_subtitle || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
            <div className="cs_category_1_wrap">
                {category_list?.map((item, index) => (
                    <div className="cs_category_item" key={index}>
                        <div className="cs_category_1">
                            <img src={item.category_image_url} alt="" className="cs_category_thumb" />
                            <div className="cs_category_info">
                                <h3 className="cs_category_title cs_fs_30 cs_white_color cs_normal">
                                    <NavigationLink href={item.category_btn_url}>{item.category_title}</NavigationLink>
                                </h3>
                                {(item.category_btn_url || item.category_btn_text) && (
                                    <Button
                                        href={item.category_btn_url}
                                        btnText={item.category_btn_text}
                                        btnClass="cs_btn cs_style_1 cs_type_1 cs_white_color"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
