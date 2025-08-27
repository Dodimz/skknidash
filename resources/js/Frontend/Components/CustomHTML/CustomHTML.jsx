import React from "react"

export default function CustomHTML({ data }) {
    return (
        <div
            className="cs_custom_html_section"
            dangerouslySetInnerHTML={{
                __html: data.html_code
            }}
        />
    )
}
