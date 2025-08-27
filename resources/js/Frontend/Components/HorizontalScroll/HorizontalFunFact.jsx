import React from "react"

export default function HorizontalFunFact({ item }) {
    const { section_subtitle, section_title, inner_slide_list } = item
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_50">
                <div className="col-lg-6">
                    {(section_subtitle || section_title) && (
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
                        </>
                    )}
                </div>
                <div className="col-lg-6 position-relative">
                    <div className="cs_counter_1_wrap cs_type_1">
                        {inner_slide_list?.map((funfactItem, index) => (
                            <div className="cs_counter cs_style_1 position-relative d-flex" key={index}>
                                <div>
                                    {funfactItem.funfact_number && (
                                        <div
                                            className="cs_fs_60 cs_primary_font cs_bold cs_primary_color d-flex"
                                            dangerouslySetInnerHTML={{
                                                __html: funfactItem.funfact_number
                                            }}
                                        />
                                    )}
                                    {funfactItem.inner_feature_title && (
                                        <p
                                            className="cs_fs_18 cs_medium mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: funfactItem.inner_feature_title
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
