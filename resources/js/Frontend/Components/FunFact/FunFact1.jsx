import React from "react"

export default function FunFact1({ data }) {
    const { section_title, funfact_list } = data
    return (
        <div className="container">
            {section_title && (
                <>
                    <div className="cs_section_heading cs_style_1 text-center">
                        <h2
                            className="cs_section_title cs_fs_53 cs_normal mb-0"
                            dangerouslySetInnerHTML={{
                                __html: section_title
                            }}
                        />
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}
            <div className="cs_counter_1_wrap">
                {funfact_list?.map((item, index) => (
                    <div className="cs_counter cs_style_1 position-relative text-center" key={index}>
                        {item.funfact_value && (
                            <div className="cs_fs_60 cs_primary_font cs_bold cs_primary_color d-flex justify-content-center">
                                {item.funfact_value}
                            </div>
                        )}
                        {item.funfact_title && (
                            <p
                                className="cs_fs_18 cs_medium mb-0"
                                dangerouslySetInnerHTML={{
                                    __html: item.funfact_title
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
