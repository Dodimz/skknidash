import React from "react"
import NavigationLink from "@/Components/NavigationLink"

export default function MenuItem({ menu }) {
    const hasChildren = menu.children.length > 0
    return (
        <li>
            {menu.url ? <NavigationLink href={menu.url}>{menu.name}</NavigationLink> : menu.name}
            {hasChildren && (
                <ul className="sub-menu">
                    {menu.children.map((childItem) => (
                        <MenuItem key={childItem.id} menu={childItem} />
                    ))}
                </ul>
            )}
        </li>
    )
}
