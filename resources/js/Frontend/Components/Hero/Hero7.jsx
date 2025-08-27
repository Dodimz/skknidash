import React from "react"
import WaterWave from "react-water-wave"
export default function Hero7({ data }) {
    const { background_image_url, title, feature_list } = data
    return (
        <div className="cs_bg_filed cs_primary_bg" style={{ backgroundImage: `url(${background_image_url})` }}>
            <WaterWave imageUrl={background_image_url} className="cs_hero cs_style_7 cs_bg_filed">
                {() => (
                    <>
                        <div className="cs_hero_up">
                            <div className="container">
                                {title && (
                                    <h1
                                        className="cs_hero_title text-center cs_fs_60 cs_white_color mb-0"
                                        dangerouslySetInnerHTML={{
                                            __html: title
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <ul className="cs_hero_info_list cs_mp0">
                            {feature_list?.map((item, index) => (
                                <li key={index}>
                                    {item.feature_title && (
                                        <h3 className="cs_fs_24 cs_normal cs_white_color cs_normal">
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: item.feature_title
                                                }}
                                            />
                                        </h3>
                                    )}
                                    {item.feature_subtitle && (
                                        <p
                                            className="mb-0 cs_white_color"
                                            dangerouslySetInnerHTML={{
                                                __html: item.feature_subtitle
                                            }}
                                        />
                                    )}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </WaterWave>
        </div>
    )
}
