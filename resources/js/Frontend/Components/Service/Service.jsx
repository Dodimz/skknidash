import NavigationLink from "@/Components/NavigationLink"
import Button from "../Button"

export default function Service({ data }) {
    const { section_title, section_subtitle, section_description, section_btn_text, section_btn_url, service_list } = data
    return (
        <div className="container">
            {(section_title || section_subtitle || section_description) && (
                <>
                    <div className="cs_section_heading cs_style_2">
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
                        {section_description && (
                            <div className="cs_section_heading_right">
                                <p
                                    className="cs_section_heading_text mb-0 cs_fs_18 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}
            <ul className="cs_image_box_1_list cs_mp0">
                {service_list?.map((item, index) => (
                    <li key={index}>
                        <div className="cs_image_box cs_style_1">
                            <div
                                className="cs_image_box_number cs_primary_font cs_fs_53 cs_primary_color"
                                dangerouslySetInnerHTML={{
                                    __html: item.service_number
                                }}
                            />
                            <NavigationLink href={item.service_btn_url} className="cs_image_box_img overflow-hidden">
                                <img src={item.service_image_url} alt="Service" />
                            </NavigationLink>
                            <div className="cs_image_box_info position-relative">
                                <h2 className="cs_image_box_title cs_fs_30 cs_normal">
                                    <NavigationLink href={item.service_btn_url}>{item.service_title}</NavigationLink>
                                </h2>
                                <p
                                    className="cs_image_box_subtitle mb-0 cs_ternary_color"
                                    dangerouslySetInnerHTML={{
                                        __html: item.service_subtitle
                                    }}
                                />
                                <NavigationLink
                                    href={item.service_btn_url}
                                    className="cs_image_box_btn cs_center position-absolute rounded-circle cs_primary_color"
                                >
                                    <svg width={30} height={29} viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <svg width={30} height={29} viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M29.3803 3.05172C29.4089 1.94752 28.537 1.02921 27.4328 1.00062L9.43879 0.534749C8.33459 0.506159 7.41628 1.37811 7.38769 2.48231C7.35911 3.58651 8.23106 4.50482 9.33526 4.53341L25.3299 4.94752L24.9158 20.9422C24.8872 22.0464 25.7592 22.9647 26.8634 22.9933C27.9676 23.0218 28.8859 22.1499 28.9144 21.0457L29.3803 3.05172ZM3.37714 28.5502L28.7581 4.4503L26.0039 1.54961L0.622863 25.6495L3.37714 28.5502Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </NavigationLink>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {(section_btn_url || section_btn_text) && (
                <div className="cs_image_box_1_list_more_btn text-center">
                    <Button
                        href={section_btn_url}
                        btnText={section_btn_text}
                        btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                    />
                </div>
            )}
        </div>
    )
}
