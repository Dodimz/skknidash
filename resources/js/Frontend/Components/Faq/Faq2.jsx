import Accordion from "../Accordion"

export default function Faq2({ data }) {
    const { section_title, section_title_2, faq_list, faq_list_2 } = data
    return (
        <div className="container">
            <div className="row cs_gap_y_100">
                <div className="col-xl-6">
                    {section_title && (
                        <h2
                            className="cs_faq_heading cs_fs_30 cs_normal cs_white_color cs_accent_bg"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    )}

                    <Accordion accordionData={faq_list} variant="cs_accordians cs_style_1" />
                </div>
                <div className="col-xl-6">
                    {section_title_2 && (
                        <h2
                            className="cs_faq_heading cs_fs_30 cs_normal cs_white_color cs_accent_bg"
                            dangerouslySetInnerHTML={{
                                __html: section_title_2
                            }}
                        />
                    )}
                    <Accordion accordionData={faq_list_2} variant="cs_accordians cs_style_1" />
                </div>
            </div>
        </div>
    )
}
