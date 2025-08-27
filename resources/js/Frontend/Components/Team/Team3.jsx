import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

export default function Team3({ data }) {
    const { section_title, section_subtitle, team_list } = data
    return (
        <>
            <div className="container">
                <div className="cs_section_heading cs_style_3">
                    <div className="cs_section_heading_left">
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
                                className="cs_section_title cs_fs_53 cs_normal mb-0 cs_normal"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_section_heading_right">
                        {team_list?.length > 3 && (
                            <div className="cs_slider_arrows cs_style1">
                                <div className="cs_left_arrow cs_accent_bg rounded-circle cs_center cs_white_color">
                                    <svg width={17} height={12} viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.469669 5.46967C0.176777 5.76256 0.176777 6.23744 0.469669 6.53033L5.24264 11.3033C5.53553 11.5962 6.01041 11.5962 6.3033 11.3033C6.59619 11.0104 6.59619 10.5355 6.3033 10.2426L2.06066 6L6.3033 1.75736C6.59619 1.46447 6.59619 0.989593 6.3033 0.696699C6.01041 0.403806 5.53553 0.403806 5.24264 0.696699L0.469669 5.46967ZM17 5.25L1 5.25V6.75L17 6.75V5.25Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div className="cs_right_arrow cs_accent_bg rounded-circle cs_center cs_white_color">
                                    <svg width={17} height={12} viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.5303 6.53033C16.8232 6.23744 16.8232 5.76256 16.5303 5.46967L11.7574 0.696698C11.4645 0.403805 10.9896 0.403805 10.6967 0.696698C10.4038 0.989592 10.4038 1.46447 10.6967 1.75736L14.9393 6L10.6967 10.2426C10.4038 10.5355 10.4038 11.0104 10.6967 11.3033C10.9896 11.5962 11.4645 11.5962 11.7574 11.3033L16.5303 6.53033ZM6.55671e-08 6.75L16 6.75L16 5.25L-6.55671e-08 5.25L6.55671e-08 6.75Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {(section_subtitle || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
            </div>
            <div className="container">
                <div className="cs_full_screen_right">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        navigation={{
                            nextEl: ".cs_right_arrow",
                            prevEl: ".cs_left_arrow",
                            disabledClass: "swiper-button-disabled"
                        }}
                        modules={[Navigation]}
                        speed={800}
                        loop={true}
                        className="mySwiper"
                        breakpoints={{
                            575: {
                                slidesPerView: 2,
                                slidesPerView: 2
                            },
                            991: {
                                slidesPerView: 3,
                                spaceBetween: 40
                            },
                            1400: {
                                slidesPerView: 3,
                                spaceBetween: 90
                            }
                        }}
                    >
                        {team_list?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="cs_team cs_style_3">
                                    {item.team_image_url && (
                                        <img className="cs_team_member_thumb" src={item.team_image_url} alt={item.team_member_name} />
                                    )}
                                    <div className="cs_team_info">
                                        <div className="cs_team_info_in">
                                            <p className="cs_team_member_designation">{item.team_member_designation}</p>
                                            <h2 className="cs_team_member_name cs_fs_24 cs_normal">
                                                <NavigationLink href={item.team_member_action_url}>{item.team_member_name}</NavigationLink>
                                            </h2>
                                            <div className="cs_team_member_social cs_ternary_color">
                                                {item?.social_btns?.map((socialItem, socialIndex) => (
                                                    <NavigationLink href={socialItem.social_action_url} key={socialIndex}>
                                                        <i>
                                                            <Icon icon={socialItem.social_icon_class} width="16" height="16" />
                                                        </i>
                                                    </NavigationLink>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}
