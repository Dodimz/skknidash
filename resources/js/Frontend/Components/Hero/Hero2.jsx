import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import SocialWidget from "../Widget/SocialWidget"
import { Icon } from "@iconify/react"
import NavigationLink from "@/Components/NavigationLink"

export default function Hero2({ data }) {
    const { phone_number, slider_list } = data
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="cs_primary_font cs_fs_30 cs_white_color ' + className + '">' + (index + 1) + "</span>"
        }
    }
    return (
        <section className="position-relative cs_swiper_number_pagination_wtap">
            <Swiper slidesPerView={1} pagination={pagination} modules={[Pagination]} className="mySwiper" speed={800} loop={true}>
                {slider_list?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="swiper-slide">
                            <div className="cs_hero cs_style_2 cs_center">
                                <div
                                    className="cs_swiper_parallax_bg cs_primary_bg"
                                    style={{
                                        backgroundImage: `url(${item.imageUrl})`
                                    }}
                                ></div>
                                <div className="container">
                                    <div className="cs_hero_text">
                                        {item.title && (
                                            <h1
                                                className="cs_hero_title cs_fs_60 cs_white_color"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.title
                                                }}
                                            />
                                        )}

                                        <div className="cs_hero_btn_wrap">
                                            {item.action_url && (
                                                <NavigationLink
                                                    href={item.action_url}
                                                    className="cs_btn cs_style_1 cs_type_4 cs_primary_color cs_fs_18 cs_medium"
                                                >
                                                    <span>
                                                        <i>
                                                            <svg
                                                                width={61}
                                                                height={61}
                                                                viewBox="0 0 61 61"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M3 58L58 3M58 3L3 3M58 3L58 58"
                                                                    stroke="currentColor"
                                                                    strokeWidth={5}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </i>
                                                        <i>
                                                            <svg
                                                                width={61}
                                                                height={61}
                                                                viewBox="0 0 61 61"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M3 58L58 3M58 3L3 3M58 3L58 58"
                                                                    stroke="currentColor"
                                                                    strokeWidth={5}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </i>
                                                    </span>
                                                </NavigationLink>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="cs_hero_social_wrap cs_hide_lg">
                <SocialWidget />
                {phone_number && (
                    <div className="cs_hero_phone_number cs_primary_font cs_fs_24 cs_white_color">
                        <span className="cs_secondary_bg cs_white_color cs_center">
                            <i className="cs_center">
                                <Icon icon="fa6-solid:phone" />
                            </i>
                        </span>
                        {phone_number}
                    </div>
                )}
            </div>
        </section>
    )
}
