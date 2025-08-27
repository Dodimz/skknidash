import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, EffectCube } from "swiper/modules"
import Button from "../Button"
import SocialWidget from "../Widget/SocialWidget"

export default function Hero12({ data }) {
    const { slider_list } = data

    return (
        <div className="cs_hero cs_style_11 position-relative">
            <Swiper
                pagination={{
                    clickable: true
                }}
                modules={[Pagination, EffectCube]}
                effect={"cube"}
                cubeEffect={{
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                }}
                speed={1500}
                className="mySwiper cs_swiper_pagination_wrap_4"
            >
                {slider_list?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="cs_hero_in cs_center">
                            <div
                                className="cs_hero_bg cs_bg_filed"
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`
                                }}
                            ></div>
                            <div className="container">
                                <div className="cs_hero_text">
                                    <h1
                                        className="cs_hero_title cs_white_color cs_fs_60 cs_bold"
                                        dangerouslySetInnerHTML={{
                                            __html: item.title
                                        }}
                                    />
                                    <p
                                        className="cs_hero_subtitle cs_ternary_color"
                                        dangerouslySetInnerHTML={{
                                            __html: item.sub_title
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
                                    {item.phone_number && (
                                        <h4 className="cs_hero_contact_number cs_fs_24 cs_normal cs_white_color mb-0">{item.phone_number}</h4>
                                    )}
                                    <SocialWidget />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
