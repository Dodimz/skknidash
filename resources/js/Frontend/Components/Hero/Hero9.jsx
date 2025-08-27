import React from "react"
import YoutubeBackground from "react-youtube-background"
import Button from "../Button"

export default function Hero9({ data }) {
    const { background_image_url, youtube_id, title, action_text, action_url } = data
    return (
        <div className="cs_style_9_wrap position-relative">
            <YoutubeBackground videoId={youtube_id} className="cs_video_bg"></YoutubeBackground>
            <div className="cs_video_bg_placeholder cs_bg_filed cs_primary_bg" style={{ backgroundImage: `url(${background_image_url})` }}></div>
            <section className="cs_hero cs_style_9 cs_center position-relative">
                <div className="container">
                    <div className="cs_hero_text">
                        {title && (
                            <h1
                                className="cs_hero_title cs_fs_120 cs_white_color"
                                dangerouslySetInnerHTML={{
                                    __html: title
                                }}
                            />
                        )}

                        {(action_url || action_text) && (
                            <Button href={action_url} btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_accent_bg" btnText={action_text} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
