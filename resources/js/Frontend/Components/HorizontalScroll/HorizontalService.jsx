import NavigationLink from "@/Components/NavigationLink"
import React from "react"

export default function HorizontalService({ item }) {
    const { section_subtitle, section_title, inner_slide_list } = item
    return (
        <div className="container">
            <div className="row cs_gap_y_40">
                <div className="col-lg-7">
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
                <div className="col-lg-5">
                    <ul className="cs_list cs_style_2 cs_mp0">
                        {inner_slide_list?.map((featureItem, index) => (
                            <li key={index}>
                                {(featureItem.inner_feature_title || featureItem.inner_feature_action_url) && (
                                    <NavigationLink href={featureItem.inner_feature_action_url} className="cs_btn cs_style_1 cs_type_2">
                                        <h2
                                            className="mb-0 cs_fs_30 cs_normal"
                                            dangerouslySetInnerHTML={{
                                                __html: featureItem.inner_feature_title
                                            }}
                                        />
                                        <span>
                                            <i>
                                                <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </i>
                                            <i>
                                                <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </i>
                                        </span>
                                    </NavigationLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
