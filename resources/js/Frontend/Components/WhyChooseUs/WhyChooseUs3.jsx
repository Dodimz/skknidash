import VideoModal from "../VideoModal"

export default function WhyChooseUs3({ data }) {
    const { section_title, section_subtitle, section_description, image_url, youtube_video_url, feature_list } = data
    return (
        <div className="cs_why_choose_us_1">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="cs_why_choose_us_thumb">
                            {!youtube_video_url && (
                                <div
                                    className="cs_why_choose_us_thumb_in cs_bg_filed"
                                    style={{
                                        backgroundImage: `url(${image_url})`
                                    }}
                                />
                            )}
                            {youtube_video_url && <VideoModal videoSrc={youtube_video_url} imageUrl={image_url} className="h-100" />}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="cs_height_145 cs_height_lg_75" />
                        {(section_title || section_subtitle || section_description) && (
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
                                        <>
                                            <h2
                                                className="cs_section_title cs_fs_53 cs_normal mb-0"
                                                dangerouslySetInnerHTML={{
                                                    __html: section_title
                                                }}
                                            />
                                            <div className="cs_height_26 cs_height_lg_20"></div>
                                        </>
                                    )}
                                    {section_description && (
                                        <p
                                            className="mb-0"
                                            dangerouslySetInnerHTML={{
                                                __html: section_description
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="cs_height_55 cs_height_lg_40" />
                            </>
                        )}
                        <div className="row cs_gap_y_45">
                            {feature_list?.map((item, index) => (
                                <div className="col-sm-6" key={index}>
                                    <div className="cs_iconbox cs_style_5">
                                        {item.feature_icon_url && (
                                            <div className="cs_iconbox_icon cs_center cs_accent_bg">
                                                <img src={item.feature_icon_url} alt="Icon" />
                                            </div>
                                        )}
                                        <div>
                                            {item.feature_title && (
                                                <h2
                                                    className="cs_iconbox_title cs_fs_24 cs_normal mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.feature_title
                                                    }}
                                                />
                                            )}
                                            {item.feature_subtitle && (
                                                <p
                                                    className="cs_iconbox_subtitle mb-0"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.feature_subtitle
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cs_height_150 cs_height_lg_80" />
                    </div>
                </div>
            </div>
        </div>
    )
}
