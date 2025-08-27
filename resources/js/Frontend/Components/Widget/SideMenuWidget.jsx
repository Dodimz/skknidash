import React from "react"
import { Link } from "@inertiajs/react"

export default function SideMenuWidget({ title, data }) {
    return (
        <>
            {data?.length === 0 ? (
                ""
            ) : (
                <div className="cs_sidebar_item widget_search widget_categories">
                    <h4 className="cs_sidebar_widget_title">{title}</h4>
                    <ul className="cs-side_menu_widget">
                        {data?.map((item, index) => (
                            <li key={index}>
                                <Link href={item.url} key={index}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
