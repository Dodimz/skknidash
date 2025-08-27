import Button from "../Button"

export default function About1({ data }) {
    const { section_title, section_subtitle, feature_list } = data
    return (
        <div className="cs_shape_wrap_1">
            <div className="cs_shape_1" />
            <div className="container">
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
                {(section_subtitle || section_title) && <div className="cs_height_85 cs_height_lg_50" />}
                <div className="cs_grid_style_4">
                    {feature_list?.map((item, index) => (
                        <div className="cs_grid_item" key={index}>
                            <div className="cs_card cs_style_1 cs_shining">
                                {item.feature_image_url && (
                                    <div className="cs_card_img cs_shining_item">
                                        <img src={item.feature_image_url} alt="Thumb" />
                                    </div>
                                )}
                                {item.feature_title && (
                                    <h2
                                        className="cs_card_title cs_fs_30 cs_normal"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_title
                                        }}
                                    />
                                )}
                                {item.feature_subtitle && (
                                    <p
                                        className="cs_card_subtitle"
                                        dangerouslySetInnerHTML={{
                                            __html: item.feature_subtitle
                                        }}
                                    />
                                )}
                                {(item.feature_btn_url || item.feature_btn_text) && (
                                    <Button
                                        href={item.feature_btn_url}
                                        btnText={item.feature_btn_text}
                                        btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color cs_shining_btn"
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
