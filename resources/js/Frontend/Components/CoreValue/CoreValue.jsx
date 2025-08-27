export default function CoreValue({ data }) {
    const { section_title, section_subtitle, section_description, feature_list } = data
    return (
        <div className="container">
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
            {(section_subtitle || section_description || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
            <div className="row cs_gap_y_40">
                {feature_list?.map((item, index) => (
                    <div className="col-lg-4" key={index}>
                        <div className="cs_iconbox cs_style_1">
                            {item.feature_icon_url && (
                                <div className="cs_iconbox_icon rounded-circle cs_gray_bg">
                                    <img src={item.feature_icon_url} alt={item.feature_title} />
                                </div>
                            )}
                            <h2
                                className="cs_iconbox_title cs_fs_30 cs_normal"
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
                ))}
            </div>
        </div>
    )
}
