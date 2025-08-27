import React from "react"
import { Link } from "@inertiajs/react"

export default function TagWidget({ title, data }) {
    return (
        <>
            {data?.length === 0 ? (
                ""
            ) : (
                <div className="cs_sidebar_item widget_search">
                    {title && <h4 className="cs_sidebar_widget_title">{title}</h4>}
                    <div className="tagcloud">
                        {data?.map((tag, index) => (
                            <Link href={tag.url} className="tag-cloud-link" key={index}>
                                {tag.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
