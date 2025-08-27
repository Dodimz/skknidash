import React from "react"

export default function HorizontalAditionalFeature({ item }) {
    const { inner_slide_list, section_title, section_subtitle, image_url } = item
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
                    </div>
                    <div className="d-flex cs_gap_y_30 flex-wrap">
                        {inner_slide_list?.map((featureItem, index) => (
                            <React.Fragment key={index}>
                                {(featureItem.inner_feature_icon_url || featureItem.inner_feature_title || featureItem.inner_feature_subtitle) && (
                                    <div className="cs_iconbox cs_style_3 w-100">
                                        {featureItem.inner_feature_icon_url && (
                                            <div className="cs_iconbox_icon">
                                                <img src={featureItem.inner_feature_icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div className="cs_iconbox_right">
                                            <h3
                                                className="cs_iconbox_title cs_normal cs_fs_24"
                                                dangerouslySetInnerHTML={{
                                                    __html: featureItem.inner_feature_title
                                                }}
                                            />
                                            <p
                                                className="cs_iconbox_subtitle mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: featureItem.inner_feature_subtitle
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
                    {image_url && (
                        <div className="cs_right_full_width cs_space_120">
                            <img src={image_url} alt="Thumb" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
