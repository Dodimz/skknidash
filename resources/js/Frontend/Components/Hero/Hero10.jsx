import React, { useState } from "react"
import NavigationLink from "@/Components/NavigationLink"
import Button from "../Button"

export default function Hero10({ data }) {
    const { casestudy_list } = data
    const [activeIndex, setActiveIndex] = useState(0)

    const handleMouseEnter = (index) => {
        setActiveIndex(index)
    }

    return (
        <section className="cs_case_study_2_wrap cs_primary_bg position-relative">
            <div className="container-fluid cs_padding_120_120">
                {casestudy_list?.map((item, index) => (
                    <div
                        className={`cs_case_study cs_style_2 cs_hover_active ${activeIndex === index ? "active" : ""}`}
                        key={index}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
                        <div className="cs_case_study_in">
                            <div className="cs_case_study_left">
                                {item.casestudy_number && (
                                    <h2 className="cs_case_study_number cs_fs_53 cs_white_color cs_normal mb-0">{item.casestudy_number}</h2>
                                )}
                                <p
                                    className="cs_case_study_category cs_fs_18 cs_ternary_color cs_medium mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: item.casestudy_category
                                    }}
                                />
                            </div>
                            <div className="cs_case_study_center">
                                <h1 className="cs_case_study_title cs_fs_53 cs_normal cs_white_color mb-0">
                                    <NavigationLink href={item.casestudy_action_url}>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: item.casestudy_title
                                            }}
                                        />
                                    </NavigationLink>
                                </h1>
                            </div>
                            <div className="cs_case_study_right">
                                {(item.casestudy_action_url || item.casestudy_action_text) && (
                                    <Button
                                        href={item.casestudy_action_url}
                                        btnClass="cs_btn cs_style_1 cs_type_4 cs_white_color cs_fs_18 cs_medium"
                                        btnText={item.casestudy_action_text}
                                    />
                                )}
                            </div>
                        </div>
                        <div
                            className="cs_case_study_bg cs_bg_filed"
                            style={{
                                backgroundImage: `url(${item.casestudy_image_url})`
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    )
}
