export default function Hero6({ data }) {
    const { background_image_url, title, funfact_list } = data
    return (
        <section className="cs_hero cs_style_6">
            <div className="container">
                {title && (
                    <h1
                        className="cs_hero_title cs_bold cs_fs_120"
                        dangerouslySetInnerHTML={{
                            __html: title
                        }}
                    />
                )}
            </div>
            <div className="cs_hero_counter_wrap cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                <div className="container">
                    <div className="cs_hero_counter_in">
                        <div className="cs_hero_counter_list cs_accent_bg text-center">
                            {funfact_list.map((item, index) => (
                                <div className="cs_hero_counter" key={index}>
                                    <div className="cs_fs_60 cs_bold cs_white_color mb-0 cs_primary_font">{item.funfact_value}</div>
                                    <p className="mb-0 cs_fs_18 cs_medium">{item.funfact_title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
