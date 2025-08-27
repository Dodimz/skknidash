import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import React from "react"

export default function TeamDetails1({ data }) {
    const {
        member_image_url,
        member_name,
        member_designation,
        member_details,
        member_email,
        member_phone_number,
        member_social_links_title,
        social_list
    } = data
    return (
        <div className="container">
            <div className="row align-items-center cs_gap_y_45">
                <div className="col-lg-5">{member_image_url && <img src={member_image_url} alt={member_name} className="cs_radius_50_50_0_0" />}</div>
                <div className="col-lg-7">
                    <div className="cs_team_details cs_pl_70">
                        <h2
                            className="cs_fs_30 cs_normal"
                            dangerouslySetInnerHTML={{
                                __html: member_name
                            }}
                        />
                        <h3
                            className="cs_fs_18 cs_medium cs_secondary_font cs_secondary_color mb-0"
                            dangerouslySetInnerHTML={{
                                __html: member_designation
                            }}
                        />
                        <div className="cs_height_25 cs_height_lg_25" />
                        <p
                            className="mb-0"
                            dangerouslySetInnerHTML={{
                                __html: member_details
                            }}
                        />
                        <div className="cs_height_25 cs_height_lg_25" />
                        <ul className="cs_mp0">
                            {member_email && (
                                <li>
                                    <i className="d-flex">
                                        <Icon icon="fa6-solid:envelope" width="18" height="18" />
                                    </i>
                                    {member_email}
                                </li>
                            )}
                            {member_phone_number && (
                                <li>
                                    <i className="d-flex">
                                        <Icon icon="fa6-solid:phone" width="18" height="18" />
                                    </i>
                                    {member_phone_number}
                                </li>
                            )}
                        </ul>
                        <div className="cs_height_25 cs_height_lg_25" />
                        <h2
                            className="cs_fs_24 cs_normal cs_social_title"
                            dangerouslySetInnerHTML={{
                                __html: member_social_links_title
                            }}
                        />
                        <div className="cs_social_btns cs_style_1 cs_type_1">
                            {social_list?.map((socialItem, socialIndex) => (
                                <NavigationLink href={socialItem.social_action_url} key={socialIndex} className="cs_center">
                                    <i>
                                        <Icon icon={socialItem.social_icon_class} width="16" height="16" />
                                    </i>
                                </NavigationLink>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
