import React from "react"
import Button from "../Button"

export default function Service6({ data }) {
    const { section_title, section_subtitle, service_list } = data

    return (
        <>
            {(section_subtitle || section_title) && (
                <>
                    <div className="container">
                        <div className="cs_section_heading cs_style_1 text-center">
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
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}
            <div className="container">
                <div className="row cs_gap_y_80">
                    {service_list?.map((item, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div className="cs_card cs_style_4">
                                {item.service_image_url && (
                                    <div className="cs_card_img">
                                        <img src={item.service_image_url} alt={item.service_title} />
                                    </div>
                                )}

                                {item.service_title && (
                                    <h2
                                        className="cs_card_title cs_fs_30 cs_normal"
                                        dangerouslySetInnerHTML={{
                                            __html: item.service_title
                                        }}
                                    />
                                )}
                                {item.service_subtitle && (
                                    <p
                                        className="cs_card_subtitle"
                                        dangerouslySetInnerHTML={{
                                            __html: item.service_subtitle
                                        }}
                                    />
                                )}
                                {(item.service_btn_url || item.service_btn_text) && (
                                    <Button
                                        href={item.service_btn_url}
                                        btnText={item.service_btn_text}
                                        btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
