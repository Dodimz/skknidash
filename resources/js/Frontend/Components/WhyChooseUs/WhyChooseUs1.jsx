export default function WhyChooseUs1({ data }) {
    const { section_title, section_subtitle, image_url, feature_list } = data
    return (
        <div className="cs_why_choose_us_1 cs_shape_wrap_2">
            <div className="cs_shape_1" />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="cs_why_choose_us_thumb">
                            <div className="cs_why_choose_us_thumb_in cs_bg_filed" style={{ backgroundImage: `url(${image_url})` }} />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="cs_height_75 cs_height_lg_50" />
                        {(section_title || section_subtitle) && (
                            <>
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
                                        <h2
                                            className="cs_section_title cs_fs_53 cs_normal mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: section_title
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="cs_height_55 cs_height_lg_40" />
                            </>
                        )}

                        <div className="row cs_gap_y_45">
                            {feature_list?.map((item, index) => (
                                <div className="col-md-6" key={index}>
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
                        <div className="cs_height_75 cs_height_lg_75" />
                    </div>
                </div>
            </div>
        </div>
    )
}
