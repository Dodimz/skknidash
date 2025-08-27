import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, EffectFade } from "swiper/modules"
import Button from "../Button"
import Rating from "../Rating"

export default function Hero5({ data }) {
    const { slider_list } = data

    const [transform1, setTransform1] = useState("")
    const [transform2, setTransform2] = useState("")

    const handleMouseMove = (event) => {
        const target = event.currentTarget
        const halfW = target.clientWidth / 2
        const halfH = target.clientHeight / 2
        const coorX = halfW - (event.pageX - target.offsetLeft)
        const coorY = halfH - (event.pageY - target.offsetTop)
        const degX1 = (coorY / halfH) * -10 + "px"
        const degY1 = (coorX / halfW) * 10 + "px"
        const degX2 = (coorY / halfH) * 15 + "deg"
        const degY2 = (coorX / halfW) * -15 + "deg"

        setTransform1(`perspective(800px) translateX(${degX1}) translateY(${degY1}) scale(1.02)`)
        setTransform2(`perspective(800px) translate3d(0, 0, 0) rotateX(${degX2}) rotateY(${degY2})`)
    }

    const handleMouseOut = () => {
        setTransform1("")
        setTransform2("")
    }
    return (
        <Swiper
            pagination={{
                clickable: true
            }}
            modules={[Pagination, EffectFade]}
            effect={"fade"}
            speed={700}
            className="mySwiper cs_swiper_pagination_wrap_1 cs_type_1"
        >
            {slider_list?.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className="cs_hero cs_style_5 cs_center cs_hobble" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
                        <div className="cs_hero_img">
                            {item.imageUrl && (
                                <img src={item.imageUrl} alt={item.title} className="cs_hover_layer_1" style={{ transform: transform1 }} />
                            )}
                        </div>
                        <div className="container">
                            <div className="cs_hero_text">
                                <div className="cs_section_heading cs_style_1">
                                    {item.sub_title && (
                                        <p
                                            className="cs_section_subtitle cs_fs_18 cs_medium"
                                            dangerouslySetInnerHTML={{
                                                __html: item.sub_title
                                            }}
                                        />
                                    )}
                                    {item.title && (
                                        <h1
                                            className="cs_section_title cs_fs_120 cs_bold mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: item.title
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="cs_hero_btns">
                                    {(item.action_text || item.action_url) && (
                                        <Button
                                            href={item.action_url}
                                            btnText={item.action_text}
                                            btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_color cs_white_bg cs_w_100_sm"
                                        />
                                    )}
                                    {(item.action_url_2 || item.action_text_2) && (
                                        <Button
                                            href={item.action_url_2}
                                            btnText={item.action_text_2}
                                            btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_accent_bg cs_w_100_sm"
                                        />
                                    )}
                                </div>
                                <div className="cs_hero_review_box">
                                    <div className="cs_hero_review_avatars">
                                        {item.avatar_image_url && (
                                            <div>
                                                <img src={item.avatar_image_url} alt="Avatar" />
                                            </div>
                                        )}
                                        {item.avatar_image_url_2 && (
                                            <div>
                                                <img src={item.avatar_image_url_2} alt="Avatar" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="cs_hero_review_right">
                                        {item.review_title && <p className="mb-0 cs_fs_18 cs_medium cs_primary_color">{item.review_title}</p>}
                                        {item.review_number && (
                                            <div className="cs_hero_review">
                                                {item.review_number && (
                                                    <>
                                                        {item.review_number > 5 ? 5 : item.review_number}
                                                        {` of 5`}
                                                    </>
                                                )}
                                                <Rating className="cs_rating cs_accent_color" ratingNumber={item.review_number} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
