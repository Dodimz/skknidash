import React from "react"

export default function AditionalFeature2({ data }) {
    const { section_image_url, section_description, section_title, section_subtitle, feature_list } = data
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_40">
                <div className="col-lg-6">
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
                                <div className="cs_height_35 cs_height_lg_30" />
                            </>
                        )}
                    </div>
                    <div className="d-flex cs_gap_y_30 flex-wrap">
                        {feature_list?.map((item, index) => (
                            <React.Fragment key={index}>
                                {(item.feature_image_url || item.feature_title || item.feature_subtitle) && (
                                    <div className="cs_iconbox cs_style_3 w-100">
                                        {item.feature_image_url && (
                                            <div className="cs_iconbox_icon">
                                                <img src={item.feature_image_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_iconbox_right">
                                            <h3
                                                className="cs_iconbox_title cs_normal cs_fs_24"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.feature_title
                                                }}
                                            />
                                            <p
                                                className="cs_iconbox_subtitle mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.feature_subtitle
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="col-lg-6">
                    {section_image_url && (
                        <div className="cs_right_full_width cs_space_120">
                            <img src={section_image_url} alt="Thumb" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
