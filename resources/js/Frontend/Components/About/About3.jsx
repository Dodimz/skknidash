import Button from "../Button"

export default function About3({ data }) {
    const { image_url, section_title, section_subtitle, section_description, action_text, action_url } = data
    return (
        <div className="container">
            <div className="cs_cta cs_style_2">
                <div className="cs_cta_left">
                    {section_subtitle && (
                        <p
                            className="cs_cta_uptitle cs_fs_18 cs_medium"
                            dangerouslySetInnerHTML={{
                                __html: section_subtitle
                            }}
                        />
                    )}

                    {section_title && (
                        <h2
                            className="cs_cta_title cs_bold cs_fs_60"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    )}

                    {section_description && (
                        <p
                            className="cs_cta_subtitle cs_fs_18 cs_medium"
                            dangerouslySetInnerHTML={{
                                __html: section_description
                            }}
                        />
                    )}
                    {(action_url || action_text) && (
                        <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_4 cs_primary_color cs_fs_18 cs_medium" />
                    )}
                </div>
                <div className="cs_cta_right">
                    <img src={image_url} alt={section_title} />
                </div>
            </div>
        </div>
    )
}
