export default function About6({ data }) {
    const { image_url, section_title, section_subtitle, section_description, description_title } = data
    return (
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
                    <>
                        <h1
                            className="cs_section_title cs_fs_53 cs_normal mb-0"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                        <div className="cs_height_76 cs_height_lg_50" />
                    </>
                )}
            </div>
            {image_url && (
                <>
                    <div
                        className="cs_full_screen_right cs_radius_50_0_0_0 cs_about_thumb_1 cs_bg_filed"
                        style={{ backgroundImage: `url(${image_url})` }}
                    />
                    <div className="cs_height_75 cs_height_lg_40" />
                </>
            )}

            <div className="row cs_gap_y_30">
                <div className="col-lg-4">
                    <span
                        className="cs_btn cs_style_1 cs_type_5 cs_primary_color cs_fs_18 cs_medium"
                        dangerouslySetInnerHTML={{
                            __html: description_title
                        }}
                    />
                </div>
                {section_description && (
                    <div className="col-lg-8">
                        <h4
                            className="cs_fs_30 cs_normal mb-0"
                            dangerouslySetInnerHTML={{
                                __html: section_description
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
