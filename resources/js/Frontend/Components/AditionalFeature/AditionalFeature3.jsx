import React from "react"

export default function AditionalFeature3({ data }) {
    const { feature_list } = data
    return (
        <>
            {feature_list.map((item, index) => (
                <div className="cs_scroll_slide cs_top_sticky_0" key={index}>
                    <div className="cs_planing_wrap cs_center">
                        <div className="container">
                            <div className="row align-items-center cs_gap_y_50">
                                <div className="col-lg-5">
                                    <h2 className="cs_planing_title cs_fs_53 cs_normal">
                                        {item.feature_number && <span>{item.feature_number}</span>}

                                        {item.feature_title}
                                    </h2>
                                    <ul className="cs_planing_list cs_mp0">
                                        {item.inner_feature_list.map((innerItem, innerItemIndex) => (
                                            <li key={innerItemIndex}>
                                                <div className="cs_iconbox cs_style_6">
                                                    {innerItem.inner_feature_icon_url && (
                                                        <div className="cs_iconbox_icon cs_accent_bg cs_center">
                                                            <img src={innerItem.inner_feature_icon_url} alt="Icon" />
                                                        </div>
                                                    )}
                                                    <div className="cs_iconbox_right">
                                                        {innerItem.inner_feature_title && (
                                                            <h3
                                                                className="cs_iconbox_title cs_fs_30 cs_normal"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: innerItem.inner_feature_title
                                                                }}
                                                            />
                                                        )}
                                                        {innerItem.inner_feature_subtitle && (
                                                            <p
                                                                className="cs_iconbox_subtitle mb-0"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: innerItem.inner_feature_subtitle
                                                                }}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-lg-6 offset-lg-1">
                                    {item.feature_image_url && (
                                        <div className="cs_planing_thumb">
                                            <img src={item.feature_image_url} alt={item.feature_title} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
