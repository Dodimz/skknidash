import NavigationLink from "@/Components/NavigationLink"
import React from "react"
import Button from "../Button"
import VideoModal from "../VideoModal"

export default function CaseStudy2({ data }) {
    const { section_title, section_subtitle, casestudy_list, section_btn_text, section_btn_url } = data

    return (
        <>
            <div className="container">
                {(section_subtitle || section_title) && (
                    <>
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
                    </>
                )}
            </div>
            <div className="cs_grid_style_2">
                {casestudy_list?.map((item, index) => (
                    <div
                        className={`cs_grid_item${[0, 6, 8, 12].includes(index) ? " cs_double_double" : ""}${
                            [3, 7, 11, 15].includes(index) ? " cs_double" : ""
                        }`}
                        key={index}
                    >
                        {item.link_type === "normal_link" && (
                            <div className="cs_case_study cs_style_1">
                                <NavigationLink
                                    href={item?.casestudy_btn_url}
                                    className="cs_case_study_thumb cs_bg_filed"
                                    style={{
                                        backgroundImage: `url(${item?.casestudy_image_url})`
                                    }}
                                />
                                <div className="cs_case_study_info cs_white_color">
                                    <div className="cs_case_study_info_in">
                                        <h2 className="cs_case_study_title cs_fs_30 cs_normal cs_white_color">
                                            <NavigationLink href={item?.casestudy_btn_url}>{item?.casestudy_title}</NavigationLink>
                                        </h2>
                                        <Button
                                            href={item?.casestudy_btn_url}
                                            btnText={item?.casestudy_btn_text}
                                            btnClass="cs_btn cs_style_1 cs_type_1"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {item.link_type === "youtube_link" && <VideoModal videoSrc={item.youtube_video_url} imageUrl={item.casestudy_image_url} />}
                    </div>
                ))}
            </div>
            <div className="container">
                {(section_btn_url || section_btn_text) && (
                    <div className="text-center">
                        <div className="cs_height_100 cs_height_lg_50"></div>
                        <Button
                            href={section_btn_url}
                            btnText={section_btn_text}
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm"
                        />
                    </div>
                )}
            </div>
        </>
    )
}
