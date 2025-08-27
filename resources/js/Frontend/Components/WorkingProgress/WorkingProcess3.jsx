import React from "react"

export default function WorkingProcess3({ data }) {
    const { section_title, section_subtitle, feature_list } = data || {}
    return (
        <div className="container">
            {(section_subtitle || section_title) && (
                <>
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
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}
            <div className="position-relative">
                {feature_list?.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className="cs_card cs_style_5 cs_primary_bg">
                            <div className="cs_card_content">
                                <h3
                                    className="cs_card_number cs_fs_120 cs_bold cs_ternary_color"
                                    dangerouslySetInnerHTML={{
                                        __html: item.feature_number
                                    }}
                                />
                                <h2
                                    className="cs_card_title cs_fs_30 cs_white_color cs_normal"
                                    dangerouslySetInnerHTML={{
                                        __html: item.feature_title
                                    }}
                                />
                                <p
                                    className="cs_card_subtitle mb-0 cs_ternary_color"
                                    dangerouslySetInnerHTML={{
                                        __html: item.feature_subtitle
                                    }}
                                />
                            </div>
                            <div className="cs_card_thumb">{item.feature_image_url && <img src={item.feature_image_url} alt="Thumb" />}</div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
