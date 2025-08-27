import React from "react"
import Button from "../Button"

export default function EventSchedule1({ data }) {
    // const [section_title, section_subtitle, event_list] = data || [];
    return (
        <>
            <div className="container">
                {(data?.section_title || data?.section_title) && (
                    <>
                        <div className="cs_section_heading cs_style_1 text-center">
                            {data?.section_subtitle && (
                                <p
                                    className="cs_section_subtitle cs_fs_18 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: data?.section_subtitle
                                    }}
                                />
                            )}
                            {data?.section_title && (
                                <h2
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: data?.section_title
                                    }}
                                />
                            )}
                        </div>
                        <div className="cs_height_85 cs_height_lg_50" />
                    </>
                )}
            </div>
            <div className="container">
                <ul className="cs_image_box_1_list cs_type_1 cs_mp0">
                    {data?.event_list?.map((item, index) => (
                        <li key={index}>
                            <div className="cs_image_box cs_style_1">
                                <div className="cs_image_box_number cs_primary_font cs_fs_53">{item.event_serial_number}</div>
                                <div className="cs_image_box_img overflow-hidden">
                                    <img src={item.event_image_url} alt={item.event_image_url} />
                                </div>
                                <div className="cs_image_box_info position-relative">
                                    {item.event_time && (
                                        <div className="cs_image_box_time cs_fs_18 cs_medium cs_ternary_color">
                                            <i className="cs_accent_color">
                                                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18ZM9.78 5H9.72C9.32 5 9 5.32 9 5.72V10.44C9 10.79 9.18 11.12 9.49 11.3L13.64 13.79C13.98 13.99 14.42 13.89 14.62 13.55C14.83 13.21 14.72 12.76 14.37 12.56L10.5 10.26V5.72C10.5 5.32 10.18 5 9.78 5Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </i>
                                            {item.event_time}
                                        </div>
                                    )}
                                    {item.event_title && (
                                        <h2
                                            className="cs_image_box_title cs_fs_30 cs_normal"
                                            dangerouslySetInnerHTML={{
                                                __html: item.event_title
                                            }}
                                        />
                                    )}
                                    {item.event_details && (
                                        <p
                                            className="cs_image_box_subtitle mb-0 cs_ternary_color"
                                            dangerouslySetInnerHTML={{
                                                __html: item.event_details
                                            }}
                                        />
                                    )}
                                    {(item.event_action_url || item.event_action_text) && (
                                        <Button
                                            href={item.event_action_url}
                                            btnText={item.event_action_text}
                                            btnClass="cs_btn cs_style_1 cs_type_4 cs_fs_18 cs_medium"
                                        />
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
