import NavigationLink from "@/Components/NavigationLink"
import { Icon } from "@iconify/react"
import Button from "../Button"

export default function Team1({ data }) {
    const { section_title, section_subtitle, section_description, section_btn_text, section_btn_url, team_list } = data
    return (
        <div className="container">
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
                {(section_description || section_btn_url || section_btn_text) && (
                    <div className="cs_section_heading_right">
                        {section_description && (
                            <p
                                className="cs_section_heading_text mb-0 cs_fs_18 cs_medium"
                                dangerouslySetInnerHTML={{
                                    __html: section_description
                                }}
                            />
                        )}
                        {(section_btn_url || section_btn_text) && (
                            <Button
                                href={section_btn_url}
                                btnText={section_btn_text}
                                btnClass="cs_btn cs_style_1 cs_type_1 cs_primary_color cs_fs_18 cs_medium"
                            />
                        )}
                    </div>
                )}
            </div>
            {(section_subtitle || section_title || section_description || section_btn_url || section_btn_text) && (
                <div className="cs_height_85 cs_height_lg_50" />
            )}
            <div className="cs_grid_style_5">
                {team_list?.map((item, index) => (
                    <div className="cs_grid_item" key={index}>
                        <div className="cs_team cs_style_3">
                            {item.team_image_url && <img className="cs_team_member_thumb" src={item.team_image_url} alt={item.team_member_name} />}
                            <div className="cs_team_info">
                                <div className="cs_team_info_in">
                                    <p className="cs_team_member_designation">{item.team_member_designation}</p>
                                    <h2 className="cs_team_member_name cs_fs_24 cs_normal">
                                        <NavigationLink href={item.team_member_action_url}>{item.team_member_name}</NavigationLink>
                                    </h2>
                                    <div className="cs_team_member_social cs_ternary_color">
                                        {item?.social_btns?.map((socialItem, socialIndex) => (
                                            <NavigationLink href={socialItem.social_action_url} key={socialIndex}>
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
                ))}
            </div>
        </div>
    )
}
