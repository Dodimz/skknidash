import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import React from "react"

export default function Hero({ data }) {
    const { title, phone_number, sub_title, background_image_url } = data
    return (
        <section className="cs_hero cs_style_1 cs_center">
            <div className="cs_hero_title_box_wrap">
                <div className="cs_hero_title_box">
                    <div className="cs_hero_title_box_in">
                        <div className="container">
                            <h1
                                className="cs_hero_title cs_fs_120 mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="cs_hero_title_box cs_title_cloned">
                    <div className="cs_hero_title_box_in">
                        <div className="container">
                            <h1
                                className="cs_hero_title cs_fs_120 mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="cs_hero_text">
                    <div className="cs_hero_bottom">
                        <div className="cs_hero_phone_number cs_primary_font cs_fs_24 cs_primary_color">
                            {phone_number && (
                                <>
                                    <span className="cs_accent_bg cs_white_color cs_center">
                                        <i className="cs_center">
                                            <Icon icon="fa6-solid:phone" />
                                        </i>
                                    </span>
                                    <NavigationLink href={`tel:${phone_number}`}>{data.phone_number}</NavigationLink>
                                </>
                            )}
                        </div>
                        <div
                            className="cs_hero_subtitle cs_white_color cs_fs_18 cs_medium"
                            dangerouslySetInnerHTML={{
                                __html: sub_title
                            }}
                        />
                    </div>
                </div>
            </div>
            <div
                className="cs_hero_thumb cs_bg_filed cs_primary_bg"
                style={{
                    backgroundImage: `url(${background_image_url})`
                }}
            />
        </section>
    )
}
