import React from "react"
import { Link } from "@inertiajs/react"
import moment from "moment"

export default function RecentPost({ title, data }) {
    return (
        <>
            {data?.length === 0 ? (
                ""
            ) : (
                <div className="cs_sidebar_item widget_search">
                    <h4 className="cs_sidebar_widget_title">{title}</h4>
                    <ul className="cs_recent_posts">
                        {data?.map((item, index) => (
                            <li key={index}>
                                <div className="cs_recent_post">
                                    <h3 className="cs_recent_post_title">
                                        <Link
                                            href={route("blog.show", {
                                                slug: item?.slug
                                            })}
                                        >
                                            {item?.content?.title}
                                        </Link>
                                    </h3>
                                    <div className="cs_recent_post_date mb-0">{moment(item?.created_at).format("ll")}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
