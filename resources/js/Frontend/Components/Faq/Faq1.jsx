import Accordion from "../Accordion"
import Button from "../Button"

export default function Faq1({ data }) {
    const { section_title, section_subtitle, image_url, action_text, action_url, faq_list } = data
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-5">
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
                            <h2
                                className="cs_section_title cs_fs_53 cs_normal mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: section_title
                                }}
                            />
                        )}
                    </div>
                    {(action_url || action_text) && (
                        <>
                            <div className="cs_height_40 cs_height_lg_40" />
                            <Button href={action_url} btnText={action_text} btnClass="cs_btn cs_style_1 cs_type_4 cs_primary_color cs_shining_btn" />
                        </>
                    )}
                    {image_url && (
                        <>
                            <div className="cs_height_75 cs_height_lg_30" />
                            <div className="cs_mobile_hide cs_ternary_color">
                                <img src={image_url} alt="Shape" />
                            </div>
                        </>
                    )}
                </div>
                <div className="col-lg-6 offset-lg-1">
                    <Accordion accordionData={faq_list} variant="cs_accordians cs_style_1" />
                </div>
            </div>
        </div>
    )
}
