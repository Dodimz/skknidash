export default function CoreValue4({ data }) {
    const { section_title, section_subtitle, image_url, feature_list } = data
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_40 cs_service_details_features">
                <div className="col-xl-6">
                    {image_url && (
                        <div className="cs_pr_70">
                            <img src={image_url} alt="Thumbnail" className="w-100" />
                        </div>
                    )}
                </div>
                <div className="col-xl-6">
                    <div className="cs_section_heading cs_style_1">
                        {section_title && (
                            <>
                                <h2
                                    className="cs_section_title cs_fs_53 cs_normal mb-0"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                                <div className="cs_height_22 cs_height_lg_22" />
                            </>
                        )}
                        {section_subtitle && (
                            <p
                                className="mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_height_55 cs_height_lg_40" />
                    <div className="row cs_gap_y_45">
                        {feature_list?.map((item, index) => (
                            <div className="col-sm-6" key={index}>
                                <div className="cs_iconbox cs_style_2">
                                    {item.feature_icon_url && (
                                        <div className="cs_iconbox_icon">
                                            <img src={item.feature_icon_url} alt="Icon" />
                                        </div>
                                    )}

                                    {item.feature_title && (
                                        <h2
                                            className="cs_iconbox_title cs_fs_24 cs_normal"
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_title
                                            }}
                                        />
                                    )}
                                    {item.feature_subtitle && (
                                        <p
                                            className="cs_iconbox_subtitle mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_subtitle
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
