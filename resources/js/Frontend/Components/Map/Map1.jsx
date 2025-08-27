import React from "react"

export default function Map1({ data }) {
    const { google_map_iframe } = data
    return (
        <div
            className="cs_google_map cs_gray_bg"
            dangerouslySetInnerHTML={{
                __html: google_map_iframe
            }}
        />
    )
}
