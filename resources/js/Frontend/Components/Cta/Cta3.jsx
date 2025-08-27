import Button from "../Button"

export default function Cta3({ data }) {
    const { image_url, background_image_url, title, action_text, action_url } = data
    return (
        <div className="container">
            <div className="cs_cta cs_style_3 position-relative cs_bg_filed" style={{ backgroundImage: `url(${background_image_url})` }}>
                {image_url && (
                    <div className="cs_cta_icon">
                        <img src={image_url} alt={title} />
                    </div>
                )}
                <div className="cs_cta_in position-relative">
                    {title && (
                        <h2
                            className="cs_cta_title cs_fs_30 cs_normal cs_white_color"
                            dangerouslySetInnerHTML={{
                                __html: title
                            }}
                        />
                    )}
                    {(action_url || action_text) && (
                        <Button
                            href={action_url}
                            btnText={action_text}
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
