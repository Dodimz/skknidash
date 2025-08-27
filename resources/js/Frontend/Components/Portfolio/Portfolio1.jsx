import NavigationLink from "@/Components/NavigationLink"

export default function Portfolio1({ data }) {
    const { section_subtitle, section_title, portfolio_list } = data
    return (
        <>
            {(section_subtitle || section_title) && (
                <div className="container">
                    <div className="cs_section_heading cs_style_1 text-center">
                        {section_subtitle && (
                            <p
                                className="cs_section_subtitle cs_fs_18 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: section_subtitle
                                }}
                            />
                        )}

                        {section_title && (
                            <h2
                                className="cs_section_title cs_fs_53 cs_normal mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </div>
            )}
            <div className="container">
                <div className="row cs_gap_y_80">
                    {portfolio_list?.map((item, index) => (
                        <div className="col-sm-4" key={index}>
                            <div className="cs_post cs_style_1">
                                {item.portfolio_image_url && (
                                    <NavigationLink href={item.action_url} className="cs_post_thumb">
                                        <img src={item.portfolio_image_url} alt={item.portfolio_title} />
                                    </NavigationLink>
                                )}
                                <div className="cs_post_info">
                                    <div className="cs_post_meta">
                                        <span className="cs_medium cs_fs_16 cs_primary_color">{item.portfolio_category}</span>
                                    </div>
                                    <h2 className="cs_post_title cs_fs_30 cs_normal mb-0">
                                        <NavigationLink href={item.action_url}>{item.portfolio_title}</NavigationLink>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
