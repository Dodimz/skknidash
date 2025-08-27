import { Icon } from "@iconify/react"
import React from "react"
import { Link } from "@inertiajs/react"

export default function Pagination({ links }) {
    return (
        <ul className="cs_pagination_box cs_center cs_white_color cs_mp0">
            {links.map((link, index) => (
                <li key={index}>
                    {link.url && (
                        <Link className={`cs_pagination_item cs_center ${link.active ? "active" : ""}`} href={link.url}>
                            {link.label === `Next &raquo;` ? (
                                <Icon icon="lucide:chevron-right" width="20" height="20" />
                            ) : link.label === `&laquo; Previous` ? (
                                <Icon icon="lucide:chevron-left" width="20" height="20" />
                            ) : (
                                `${link.label}`
                            )}
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    )
}
