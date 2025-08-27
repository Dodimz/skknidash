import React from "react"
import Button from "../Button"
import { useState } from "react"

export default function Pricing1({ data }) {
    const [active, setActive] = useState(0)
    const { section_title, section_subtitle, section_description, pricing_list } = data
    return (
        <div className="container">
            {(section_subtitle || section_title || section_description) && (
                <>
                    <div className="cs_section_heading cs_style_2">
                        <div className="cs_section_heading_left">
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
                                    className="cs_section_title cs_fs_53 cs_normal mb-0 cs_normal"
                                    dangerouslySetInnerHTML={{
                                        __html: section_title
                                    }}
                                />
                            )}
                        </div>
                        {section_description && (
                            <div className="cs_section_heading_right">
                                <p
                                    className="cs_section_heading_text mb-0 cs_fs_18 cs_medium"
                                    dangerouslySetInnerHTML={{
                                        __html: section_description
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="cs_height_85 cs_height_lg_50" />
                </>
            )}

            {pricing_list?.length > 1 && (
                <div className="cs_price_tab_btns">
                    {pricing_list?.map((item, index) => (
                        <span className={`cs_price_tab_btn${index === active ? " active" : ""}`} key={index} onClick={() => setActive(index)}>
                            {item.package_type}
                        </span>
                    ))}
                </div>
            )}

            {pricing_list?.map((pricingItem, pricingIndex) => {
                if (pricingIndex === active) {
                    return (
                        <div className="row cs_row_gap_60 cs_gap_y_40" key={pricingIndex}>
                            {pricingItem.package_list?.map((item, index) => (
                                <div className="col-lg-6" key={index}>
                                    <div className="cs_pricing_table cs_style_1">
                                        <h2 className="cs_pricing_title cs_fs_53 cs_normal">
                                            {item.package_name}
                                            {item.package_icon_url && (
                                                <i className="cs_center">
                                                    <img src={item.package_icon_url} alt="" />
                                                </i>
                                            )}
                                        </h2>
                                        <ul className="cs_pricing_feature cs_mp0 cs_fs_18 cs_medium">
                                            {item.package_feature?.map((featureItem, featureIndex) => (
                                                <li key={featureIndex} className={featureItem.package_feature_icon_url ? "" : "p-0"}>
                                                    {featureItem.package_feature_icon_url && (
                                                        <i className="cs_feature_icon cs_accent_color">
                                                            <img src={featureItem.package_feature_icon_url} alt="" />
                                                        </i>
                                                    )}

                                                    <span>{featureItem.package_feature_text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="cs_pricing_info">
                                            <div className="cs_price">
                                                <h3 className="cs_fs_53 cs_normal mb-0">{item.package_price}</h3>
                                                <span>{item.package_per}</span>
                                            </div>
                                            {(item.package_btn_url || item.package_btn_text) && (
                                                <Button
                                                    href={item.package_btn_url}
                                                    btnText={item.package_btn_text}
                                                    btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
                return null // Skip rendering for other indices
            })}
        </div>
    )
}
