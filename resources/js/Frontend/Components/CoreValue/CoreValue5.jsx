export default function CoreValue5({ data }) {
    const { section_title, section_subtitle, feature_list } = data
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
            <div className="row cs_gap_y_35">
                {feature_list?.map((item, index) => (
                    <div className="col-xl-3 col-md-6" key={index}>
                        <div className="cs_iconbox cs_style_7">
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
    )
}
