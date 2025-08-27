import Pagination from "@/Frontend/Components/Pagination"
import moment from "moment"
import BlogLayout from "@/Frontend/Layouts/BlogLayout"
import BioneMeta from "@/utils/BioneMeta"
import translate from "@/utils/translate"
import { Link } from "@inertiajs/react"
import SearchWidget from "@/Frontend/Components/Widget/SearchWidget"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"

export default function Index({
    posts,
    search,
    filter,
    meta_tags,
    meta_title,
    title,
    meta_description,
    meta_image,
    site_name,
    is_show_blog_details_sidebar,
    slug
}) {
    BioneMeta(meta_title ?? title, meta_title, meta_tags, meta_description, meta_image, site_name)

    // page header data
    let pageHeaderData = {
        title,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: title, url: null }
        ]
    }
    // dynamic assigned page header data
    if (filter.category) {
        pageHeaderData.title = `${translate("Category")}: ${filter.category}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            { label: translate("Blog"), url: route("pages.show", slug) },
            { label: filter.category, url: null }
        ]
    } else if (filter.tag) {
        pageHeaderData.title = `Tag: ${filter.tag}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            { label: translate("Blog"), url: route("pages.show", slug) },
            { label: filter.tag, url: null }
        ]
    } else if (search) {
        pageHeaderData.title = `${translate("Search Results for")}: ${search}`
        pageHeaderData.breadcrumb = [
            { label: translate("Home"), url: "/" },
            {
                label: `${translate("Search Results for")}: ${search}`,
                url: null
            }
        ]
    }
    return (
        <FrontendLayout>
            <BlogLayout pageHeaderData={pageHeaderData} is_show_blog_details_sidebar={is_show_blog_details_sidebar}>
                {(search || filter) && !posts.data.length ? (
                    <div className="postbox__wrapper">
                        <section className="no-results not-found">
                            <div className="page-header">
                                <h1 className="page-title blog-search-title">{translate("Nothing Found")}</h1>
                            </div>
                            {/* .page-header */}
                            {search && (
                                <div className="pageontent blog-search-content">
                                    <p>{translate("Sorry, but nothing matched your search terms. Please try again with some different keywords.")}</p>
                                    <SearchWidget />
                                </div>
                            )}
                        </section>
                    </div>
                ) : (
                    <>
                        <div className="row cs_gap_y_80">
                            {posts.data.map((item, index) => (
                                <div className="col-sm-6" key={index}>
                                    <div className="cs_post cs_style_1">
                                        {item?.thumbnail_image && (
                                            <Link
                                                href={route("blog.show", {
                                                    slug: item.slug
                                                })}
                                                className="cs_post_thumb"
                                            >
                                                <img src={item?.thumbnail_image} alt="Post" />
                                            </Link>
                                        )}
                                        <div className="cs_post_info">
                                            <div className="cs_post_meta">
                                                <span className="cs_medium cs_fs_18 cs_primary_color">{item?.category.content.title}</span>
                                                <span>{moment(item?.created_at).format("ll")}</span>
                                            </div>
                                            <h2 className="cs_post_title cs_fs_30 cs_normal mb-0">
                                                <Link
                                                    href={route("blog.show", {
                                                        slug: item.slug
                                                    })}
                                                >
                                                    {item?.content?.title}
                                                </Link>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {posts.links.length > 3 ? (
                            <>
                                <div className="cs_height_60 cs_height_lg_40"></div>
                                <Pagination links={posts.links} />
                            </>
                        ) : (
                            ""
                        )}
                    </>
                )}
            </BlogLayout>
        </FrontendLayout>
    )
}
