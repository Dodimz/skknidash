import React from "react"
import { useState } from "react"

export default function VideoModal({ videoSrc, imageUrl, className }) {
    const [iframeSrc, setIframeSrc] = useState("about:blank")
    const [toggle, setToggle] = useState(false)

    const handelClick = () => {
        if (videoSrc.includes("youtube.com")) {
            let videoId;
            if (videoSrc.includes("embed/")) {
                videoId = videoSrc.split("embed/")[1].split("?")[0].trim();
            } else if (videoSrc.includes("v=")) {
                videoId = videoSrc.split("v=")[1].split("&")[0].trim();
            }

            if (videoId) {
                setIframeSrc(`https://www.youtube.com/embed/${videoId}`);
            } else {
                setIframeSrc(videoSrc);
            }
        } else {
            setIframeSrc(videoSrc);
        }

        setToggle(!toggle)
    }

    const handelClose = () => {
        setIframeSrc("about:blank")
        setToggle(!toggle)
    }

    return (
        <>
            {videoSrc ? (
                <div
                    className={`cs_video_block cs_style_1 cs_bg_filed${className ? ` ${className}` : ""}`}
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                    onClick={handelClick}
                >
                    <span className="cs_player_btn cs_accent_color">
                        <span />
                    </span>
                </div>
            ) : (
                <div
                    className={`cs_video_block cs_style_1 cs_bg_filed${className ? ` ${className}` : ""}`}
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        cursor: "pointer"
                    }}
                ></div>
            )}

            <div className={toggle ? "cs_video_popup active" : "cs_video_popup"}>
                <div className="cs_video_popup_overlay" />
                <div className="cs_video_popup_content">
                    <div className="cs_video_popup_layer" />
                    <div className="cs_video_popup_container">
                        <div className="cs_video_popup_align">
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe className="embed-responsive-item" src={iframeSrc} title="video modal" />
                            </div>
                        </div>
                        <div className="cs_video_popup_close" onClick={handelClose} />
                    </div>
                </div>
            </div>
        </>
    )
}
