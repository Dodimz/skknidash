import PageHeading from "@/Frontend/Components/PageHeading"
import Sidebar from "@/Frontend/Components/Sidebar"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import { usePage } from "@inertiajs/react"

export default function BlogLayout({
    children,
    pageHeaderData,
    blogDetails,
    blogDetailsTitle,
    blogDetailsThumbnailImageUrl,
    blogDetailsCategory,
    blogDetailsDate,
    blogDetailsUser,
    is_show_blog_details_sidebar
}) {
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}
    const { categories, tags, recent_post, slug } = usePage().props

    // categories
    const customizedCategories = categories?.map((item) => {
        return {
            title: item?.content?.title,
            url: route("pages.show", {
                slug: slug,
                filter: { category: item?.content?.title }
            })
        }
    })

    // tags
    const customizedTags = tags?.map((tag) => {
        return {
            title: tag,

            url: route("pages.show", {
                filter: { tag: tag },
                slug: slug
            })
        }
    })
    return (
        <>
            {blogDetails ? (
                <>
                    <div
                        className="cs_page_heading cs_style_2 cs_bg_filed"
                        style={{
                            backgroundImage: `url(${blogDetailsThumbnailImageUrl})`
                        }}
                    >
                        <div className="container">
                            <span className="cs_page_heading_category">{blogDetailsCategory}</span>
                            <h1 className="cs_page_heading_title cs_fs_120 cs_white_color cs_normal">{blogDetailsTitle}</h1>
                            <div className="cs_post cs_style_1 cs_white_color">
                                <div className="cs_post_info">
                                    <div className="cs_post_meta m-0">
                                        <span className="cs_medium">{blogDetailsUser}</span>
                                        <span>{blogDetailsDate}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                is_show_breadcrumb === "1" && (
                    <PageHeading bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"} data={pageHeaderData} />
                )
            )}
            {blogDetails ? <div className="cs_height_100 cs_height_lg_80"></div> : <div className="cs_height_150 cs_height_lg_80"></div>}

            <div className={`container cs_blog_section${blogDetails ? " cs_blog_details_content_section" : ""}`}>
                <div className="row position-relative cs_gap_y_65">
                    <div className={`${is_show_blog_details_sidebar === "1" ? "col-lg-8" : "col-lg-12"}`}>{children}</div>
                    {is_show_blog_details_sidebar === "1" && (
                        <div className="col-lg-4">
                            <Sidebar recent_post={recent_post} customizedCategories={customizedCategories} customizedTags={customizedTags} />
                        </div>
                    )}
                </div>
            </div>
            <div className="cs_height_150 cs_height_lg_80"></div>
        </>
    )
}
