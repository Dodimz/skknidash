import React from "react"
import Button from "../Button"

export default function Cta2({ data }) {
    const { image_url, title, sub_title, action_text, action_url } = data
    return (
        <div className="cs_cta cs_style_1 text-center position-relative">
            <div className="cs_cta_shape_1 cs_accent_color position-absolute">
                <svg width={219} height={475} viewBox="0 0 219 475" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="186.468" y="187.382" width={451} height={42} transform="rotate(140.444 186.468 187.382)" fill="currentColor" />
                    <rect x="203.468" y="109.382" width={451} height={42} transform="rotate(140.444 203.468 109.382)" fill="currentColor" />
                    <rect x="218.468" y="32.3823" width={451} height={42} transform="rotate(140.444 218.468 32.3823)" fill="currentColor" />
                </svg>
            </div>
            <div className="cs_cta_shape_2 cs_accent_color position-absolute">
                <svg width={219} height={475} viewBox="0 0 219 475" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x={32} y="287.213" width={451} height={42} transform="rotate(-39.5563 32 287.213)" fill="currentColor" />
                    <rect x={15} y="365.213" width={451} height={42} transform="rotate(-39.5563 15 365.213)" fill="currentColor" />
                    <rect y="442.213" width={451} height={42} transform="rotate(-39.5563 0 442.213)" fill="currentColor" />
                </svg>
            </div>
            <div className="cs_cta_shape_1" />
            <div className="container">
                {title && (
                    <h2
                        className="cs_cta_title cs_fs_120 cs_bold"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
                {sub_title && (
                    <p
                        className="cs_cta_subtitle"
                        dangerouslySetInnerHTML={{
                            __html: sub_title
                        }}
                    />
                )}
                {(action_url || action_text) && (
                    <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm" />
                )}
                {image_url && (
                    <div className="cs_cta_thumb">
                        <img src={image_url} alt="Thumb" />
                    </div>
                )}
            </div>
        </div>
    )
}
