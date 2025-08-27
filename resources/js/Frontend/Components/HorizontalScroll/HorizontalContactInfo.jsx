import React from "react"
import SocialWidget from "../Widget/SocialWidget"

export default function HorizontalContactInfo({ item }) {
    const { section_title, section_subtitle, inner_slide_list } = item
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
                <div className="col-lg-6">
                    <ul className="cs_mp0 cs_contact_info">
                        {inner_slide_list?.map((contactItem, index) => (
                            <li key={index}>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: contactItem.contact_title
                                    }}
                                />
                                <h3
                                    className="cs_fs_24 cs_normal"
                                    dangerouslySetInnerHTML={{
                                        __html: contactItem.contact_description
                                    }}
                                />
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: contactItem.contact_info
                                    }}
                                />
                                {contactItem.social_link_show && <SocialWidget />}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
