import React from "react"
import MenuItem from "@/Frontend/Components/Widget/MenuItem"

export default function MenuWidget({ menus, title }) {
    return (
        <>
            {title && <h2 className="cs_widget_title cs_secondary_font cs_medium text-uppercase cs_fs_18 cs_white_color">{title}</h2>}
            <ul className="cs_menu_widget cs_mp0">
                {menus?.map((menu, index) => (
                    <MenuItem key={index} menu={menu} />
                ))}
            </ul>
        </>
    )
}
