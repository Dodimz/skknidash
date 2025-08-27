import React from "react"

export default function WorkingProcess1({ data }) {
    const { section_title, section_subtitle, image_url, feature_list } = data || {}
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

            <div className="row align-items-center cs_gap_y_40">
                <div className="col-xl-5 col-lg-6">{image_url && <img src={image_url} alt="Thumbnail" className="w-100" />}</div>
                <div className="col-lg-6 offset-xl-1">
                    <ul className="cs_list cs_style_3 cs_mp0">
                        {feature_list?.map((item, index) => (
                            <React.Fragment key={index}>
                                {(item.feature_title || item.feature_subtitle) && (
                                    <li>
                                        <h2
                                            className="cs_fs_24 cs_normal"
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_title
                                            }}
                                        />
                                        <p
                                            className="mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_subtitle
                                            }}
                                        />
                                    </li>
                                )}
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
