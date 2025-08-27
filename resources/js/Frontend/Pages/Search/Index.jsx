import PageHeading from "@/Frontend/Components/PageHeading"
import FrontendLayout from "@/Frontend/Layouts/FrontendLayout"
import React from "react"
import { Link, usePage } from "@inertiajs/react"
import BioneMeta from "@/utils/BioneMeta"
import translate from "@/utils/translate"
import { useState } from "react"
import { useEffect } from "react"
import { Icon } from "@iconify/react"

export default function Index({ search, search_results, meta_tags, tagline, site_name }) {
    const { isEnabledEcommerce, isEnabledCaseStudy, isEnabledPortfolio, isEnabledService, isEnabledTeam } = usePage().props
    const { breadcrumb_image, is_show_breadcrumb } = JSON.parse(localStorage.getItem("page_settings")) || {}

    BioneMeta(tagline, "", meta_tags, "", "", site_name)

    let pageHeaderData = {
        title: `${search === null ? translate("No results found") : `${translate("Search Results For")}: "${search}"`}`,
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("Search"), url: null }
        ]
    }

    const [posts, setPosts] = useState([])
    const [pages, setPages] = useState([])
    const [portfolios, setPortfolios] = useState([])
    const [caseStudies, setCaseStudies] = useState([])
    const [teams, setTeams] = useState([])
    const [products, setProduct] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {
        setPosts(search_results.filter((item) => item.type === "post"))
        setPages(search_results.filter((item) => item.type === "page"))
        setPortfolios(search_results.filter((item) => item.type === "portfolio"))
        setCaseStudies(search_results.filter((item) => item.type === "caseStudy"))
        setTeams(search_results.filter((item) => item.type === "team"))
        setProduct(search_results.filter((item) => item.type === "product"))
        setServices(search_results.filter((item) => item.type === "service"))
    }, [search])

    // Helper function to get the correct route for each content type
    const getItemUrl = (item) => {
        switch (item?.type) {
            case "post":
                return `/blog/${item.slug}`
            case "caseStudy":
                return `/case-study/${item.slug}`
            case "service":
                return `/service/${item.slug}`
            case "team":
                return `/team/${item.slug}`
            case "portfolio":
                return `/portfolio/${item.slug}`
            case "product":
                return `/product/${item.slug}`
            case "page":
                return `/${item.slug}`
            default:
                return `/${item.type}/${item.slug}`
        }
    }

    // Calculate visible results count based on enabled content types
    const getEnabledResultsCount = () => {
        let count = 0
        count += posts.length // Posts are always enabled
        count += pages.length // Pages are always enabled
        count += isEnabledPortfolio !== "0" ? portfolios.length : 0
        count += isEnabledCaseStudy !== "0" ? caseStudies.length : 0
        count += isEnabledTeam !== "0" ? teams.length : 0
        count += isEnabledEcommerce !== "0" ? products.length : 0
        count += isEnabledService !== "0" ? services.length : 0
        return count
    }

    // Check if there are no results or if all content types are disabled/empty
    const hasNoResults = () => {
        return getEnabledResultsCount() === 0
    }

    return (
        <FrontendLayout headerLayout={"1"} footerLayout={"1"}>
            <div className="cs_height_100 cs_height_lg_80"></div>
            {is_show_breadcrumb === "1" && (
                <PageHeading
                    data={pageHeaderData}
                    is_show_breadcrumb={true}
                    bgSrc={breadcrumb_image ? breadcrumb_image : "/static/page_heading.jpeg"}
                    variant="cs_type_1"
                />
            )}

            <div className="cs_search_section">
                <div className="container">
                    <div className="cs_search_info cs_mb_30">
                        <p className="cs_search_title">
                            {getEnabledResultsCount()} {translate("Results Found")}
                        </p>
                    </div>

                    {hasNoResults() ? (
                        <div className="cs_no_results cs_text_center cs_mt_40 cs_mb_40">
                            <h3 className="cs_mb_15">{translate("No results found")}</h3>
                            <p>{translate("Try searching with different keywords")}</p>
                        </div>
                    ) : (
                        <>
                            <div className="cs_search_result_wrap">
                                {posts.length > 0 && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Posts")} <span>({posts.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {posts.map((post, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(post)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {post.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {pages.length > 0 && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Pages")} <span>({pages.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {pages.map((page, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(page)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {page.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {portfolios.length > 0 && isEnabledPortfolio !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Portfolios")} <span>({portfolios.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {portfolios.map((portfolio, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(portfolio)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {portfolio.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {products.length > 0 && isEnabledEcommerce !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Products")} <span>({products.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {products.map((product, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(product)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {product.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {caseStudies.length > 0 && isEnabledCaseStudy !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Case Studies")} <span>({caseStudies.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {caseStudies.map((caseStudy, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(caseStudy)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {caseStudy.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {teams.length > 0 && isEnabledTeam !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Teams")} <span>({teams.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {teams.map((team, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(team)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {team.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {services.length > 0 && isEnabledService !== "0" && (
                                    <div className="cs_search_result">
                                        <h3 className="">
                                            {translate("Services")} <span>({services.length})</span>
                                        </h3>
                                        <ul className="cs_search_result_list">
                                            {services.map((service, index) => (
                                                <li key={index}>
                                                    <h4 className="cs_search_item_title cs_mb_10">
                                                        <Link href={getItemUrl(service)} className="cs_primary_color_hover">
                                                            <Icon icon="lucide:link-2" width="20" height="20" />
                                                            {service.title}
                                                        </Link>
                                                    </h4>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </FrontendLayout>
    )
}
