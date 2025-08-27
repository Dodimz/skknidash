import { Icon } from "@iconify/react"
import Button from "../Button"

export default function About5({ data }) {
    const {
        image_url,
        section_title,
        section_subtitle,
        section_description,
        phone_number,
        experience_title,
        experience_year,
        feature_list,
        action_text,
        action_url
    } = data
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_40">
                <div className="col-lg-5">
                    <div className="position-relative">
                        {image_url && <img src={image_url} alt={section_title} />}
                        {(experience_year || experience_title) && (
                            <div className="cs_experience_box cs_style_1 cs_accent_bg position-absolute">
                                <h3
                                    className="cs_white_color cs_fs_60 cs_bold mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: experience_year
                                    }}
                                />
                                <h4
                                    className="cs_white_color mb-0 cs_fs_30 cs_normal"
                                    dangerouslySetInnerHTML={{
                                        __html: experience_title
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="col-lg-6 offset-lg-1">
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
                            <>
                                <h2
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                                <div className="cs_height_26 cs_height_lg_20" />
                            </>
                        )}
                        {section_description && (
                            <>
                                <p
                                    className="mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                                <div className="cs_height_30 cs_height_lg_30" />
                            </>
                        )}
                    </div>
                    <ul className="cs_list cs_style_1 cs_type_1 cs_mp0">
                        {feature_list?.map((item, index) => (
                            <li key={index}>
                                {(item.feature_title || item.feature_subtitle) && (
                                    <i className="cs_tick_icon cs_accent_color d-flex">
                                        <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clipPath="url(#clip_0)">
                                                <path
                                                    d="M30.0586 14.1797C30.0586 14.7656 30.0586 15.3516 30.0586 15.9375C30.041 16.0195 30.0176 16.1074 30.0117 16.1895C29.8652 18.2812 29.3145 20.2676 28.3008 22.1016C25.9688 26.3262 22.4238 28.9102 17.6719 29.8242C17.0977 29.9355 16.5176 29.9824 15.9375 30.0586C15.3516 30.0586 14.7656 30.0586 14.1797 30.0586C14.1035 30.041 14.0273 30.0176 13.9512 30.0117C11.8477 29.8711 9.85547 29.3145 8.01562 28.3008C3.79102 25.9629 1.20117 22.418 0.292969 17.6719C0.181641 17.0977 0.134766 16.5176 0.0585938 15.9375C0.0585938 15.3516 0.0585938 14.7656 0.0585938 14.1797C0.0761719 14.0977 0.0996094 14.0098 0.105469 13.9277C0.251953 11.8359 0.808594 9.84961 1.81641 8.01562C4.14844 3.79102 7.69336 1.20703 12.4453 0.292969C13.0195 0.181641 13.5996 0.134766 14.1797 0.0585938C14.7656 0.0585938 15.3516 0.0585938 15.9375 0.0585938C16.0137 0.0761719 16.0898 0.0996094 16.166 0.105469C18.2695 0.246094 20.2617 0.802734 22.1016 1.81641C26.3262 4.1543 28.916 7.69922 29.8242 12.4453C29.9297 13.0195 29.9824 13.5996 30.0586 14.1797ZM15.0586 27.7148C22.0371 27.7148 27.7031 22.0547 27.709 15.0703C27.7266 8.08594 22.043 2.40234 15.0586 2.40234C8.07422 2.40234 2.41406 8.0625 2.40234 15.0469C2.39062 22.0312 8.07422 27.7148 15.0586 27.7148Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M13.0598 17.3789C13.1301 17.2676 13.177 17.1504 13.259 17.0684C15.4739 14.8477 17.6887 12.6387 19.9035 10.418C20.1672 10.1543 20.4602 9.95508 20.8469 9.95508C21.3157 9.96094 21.6731 10.1719 21.8899 10.5879C22.1067 11.0039 22.0715 11.4199 21.802 11.8008C21.7258 11.9121 21.6262 12.0117 21.5325 12.1055C19.0129 14.625 16.4934 17.1445 13.9739 19.6641C13.3118 20.3262 12.6789 20.3262 12.0227 19.6641C10.8508 18.4922 9.67308 17.3203 8.5012 16.1426C8.06175 15.7031 7.96214 15.1816 8.21409 14.707C8.59495 13.9805 9.51488 13.8574 10.1418 14.4727C11.0207 15.334 11.8821 16.2129 12.7493 17.0801C12.8313 17.1621 12.9075 17.2324 13.0598 17.3789Z"
                                                    fill="currentColor"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip_0">
                                                    <rect width={30} height={30} fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </i>
                                )}

                                {item.feature_title && (
                                    <h3
                                        className="cs_fs_24 cs_normal mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_title
                                        }}
                                    />
                                )}
                                {item.feature_subtitle && (
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_subtitle
                                        }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="cs_height_50 cs_height_lg_30" />
                    <div className="cs_btn_group cs_style_1">
                        {(action_url || action_text) && (
                            <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_primary_bg" />
                        )}
                        {phone_number && (
                            <div className="cs_hero_phone_number cs_primary_font cs_fs_24 cs_primary_color">
                                <span className="cs_accent_bg cs_white_color cs_center">
                                    <i className="cs_center">
                                        <Icon icon="fa6-solid:phone" />
                                    </i>
                                </span>
                                {phone_number}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
