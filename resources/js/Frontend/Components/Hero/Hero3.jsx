import React, { useState } from "react"
import { Icon } from "@iconify/react"
import NavigationLink from "@/Components/NavigationLink"

export default function Hero3({ data }) {
    const {
        background_image_url,
        avatar_image_url,
        title,
        conference_date,
        location_date,
        conference_time,
        conference_place,
        avatar_name,
        avatar_designation,
        action_url
    } = data

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
        <section className="cs_hero cs_style_3 cs_bg_filed cs_primary_bg" style={{ backgroundImage: `url(${background_image_url})` }}>
            <div className="container">
                <div className="cs_hero_text">
                    <div className="cs_hero_text_left">
                        {(conference_date || location_date) && (
                            <ul className="cs_hero_info cs_mp0 cs_primary_font cs_fs_53 cs_white_color cs_normal">
                                {conference_date && <li>{conference_date}</li>}
                                {location_date && (
                                    <li>
                                        <i className="cs_center">
                                            <Icon icon="fa6-solid:location-dot" />
                                        </i>
                                        {location_date}
                                    </li>
                                )}
                            </ul>
                        )}

                        {title && (
                            <h1
                                className="cs_hero_title cs_fs_120 cs_bold cs_white_color mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_hero_text_right cs_hobble" onMouseMove={handleMouseMove} onMouseOut={handleMouseOut}>
                        <NavigationLink
                            href={action_url}
                            className="cs_hero_btn text-center cs_white_color cs_center cs_hover_layer_2"
                            style={{ transform: transform2 }}
                        >
                            <div className="cs_hover_layer_1" style={{ transform: transform1 }}>
                                {conference_time && <span className="cs_fs_30 cs_primary_font d-block">{conference_time}</span>}
                                {conference_place && <span className="d-block cs_fs_18 cs_medium">{conference_place}</span>}
                                <svg width={44} height={44} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M3 3L41 41M41 41V3M41 41H3"
                                        stroke="white"
                                        strokeWidth={5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </NavigationLink>
                    </div>
                </div>
                <div className="cs_hero_avatar_wrap">
                    <div className="cs_hero_avatar">
                        {avatar_image_url && <img src={avatar_image_url} alt={avatar_name} />}
                        <div className="cs_hero_avatar_right">
                            {avatar_name && (
                                <h3
                                    className="cs_normal cs_white_color cs_fs_53 mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: avatar_name
                                    }}
                                />
                            )}
                            {avatar_designation && (
                                <p
                                    className="mb-0 cs_fs_18 cs_medium cs_ternary_color"
                                    dangerouslySetInnerHTML={{
                                        __html: avatar_designation
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
