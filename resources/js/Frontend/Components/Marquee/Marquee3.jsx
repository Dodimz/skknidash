import React from "react"

export default function Marquee3({ data }) {
    const { text } = data
    return (
        <div className="cs_moving_section_wrap">
            <div className="cs_moving_section_in cs_primary_font cs_gradient_style cs_bold cs_fs_120">
                <div
                    className="cs_moving_section cs_moving_duration_40"
                    dangerouslySetInnerHTML={{
                        __html: text
                    }}
                />
                <div
                    className="cs_moving_section cs_moving_duration_40"
                    dangerouslySetInnerHTML={{
                        __html: text
                    }}
                />
            </div>
        </div>
    )
}
