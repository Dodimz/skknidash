import React from "react"
import { Icon } from "@iconify/react"
import { useSelector } from "react-redux"

export default function SocialWidget() {
    const socialLinks = useSelector((state) => state.customize.social_links)
    return (
        <div className="cs_social_btns cs_style_1">
            {socialLinks?.social_list?.map((item, index) => (
                <a key={index} href={item?.social_url} className="cs_center" target="_blank">
                    <Icon icon={item?.social_icon} />
                </a>
            ))}
        </div>
    )
}
