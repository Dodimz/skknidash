import React from "react"

export default function TextEditor({ data }) {
    const { section_title, section_subtitle, section_description, text_editor_content } = data
    return (
        <section className="container">
            {(section_title || section_subtitle || section_description) && (
                <>
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
                                <h1
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
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}
            <div
                className="cs_blog_details cs_type_1"
                dangerouslySetInnerHTML={{
                    __html: text_editor_content
                }}
            />
        </section>
    )
}
