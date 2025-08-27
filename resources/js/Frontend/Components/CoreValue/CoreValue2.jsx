export default function CoreValue2({ data }) {
    const { feature_list } = data

    return (
        <div className="container">
            <div className="row cs_gap_y_30">
                {feature_list?.map((item, index) => (
                    <div className="col-lg-4" key={index}>
                        <div className="cs_card cs_style_3">
                            {item.feature_title && (
                                <p
                                    className="cs_card_title cs_fs_18 cs_medium position-relative"
                                    dangerouslySetInnerHTML={{
                                        __html: item.feature_title
                                    }}
                                />
                            )}
                            {item.feature_subtitle && (
                                <div
                                    className="cs_card_description cs_primary_font cs_fs_24 cs_primary_color"
                                    dangerouslySetInnerHTML={{
                                        __html: item.feature_subtitle
                                    }}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
