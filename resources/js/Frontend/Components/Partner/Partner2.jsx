export default function Partner2({ data }) {
    const { partner_list, animation_direction } = data
    return (
        <>
            <div className="cs_moving_section_wrap">
                <div className="cs_moving_section_in">
                    <div className={`cs_moving_section cs_moving_duration_40 cs_brand_2_wrap${animation_direction ? " cs_reverse_animation" : ""}`}>
                        {partner_list?.map((item, index) => (
                            <div className="cs_brand cs_style_2" key={index}>
                                {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                            </div>
                        ))}
                    </div>
                    <div className={`cs_moving_section cs_moving_duration_40 cs_brand_2_wrap${animation_direction ? " cs_reverse_animation" : ""}`}>
                        {partner_list?.map((item, index) => (
                            <div className="cs_brand cs_style_2" key={index}>
                                {item.partner_image_url && <img src={item.partner_image_url} alt="Brand" />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
