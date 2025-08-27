import { Link, usePage } from "@inertiajs/react"
import { useState } from "react"
import hasPermission from "@/Admin/Utils/hasPermission"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"

export default function Sidebar() {
    const { auth, isEnabledEcommerce, isEnabledCaseStudy, isEnabledPortfolio, isEnabledService, isEnabledTeam } = usePage().props
    const [toggle, setToggle] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    // Helper function to check if a route matches any of the patterns
    const isRouteActive = (patterns) => {
        return patterns.some((pattern) => route().current(pattern))
    }

    // Determine initially active menu based on current route
    const initialActiveMenu = () => {
        if (isRouteActive(["admin.products.*", "admin.product.categories.*", "admin.brands.*", "admin.coupons.*", "admin.product.tags.*", "admin.reviews.*"]))
            return "products"
        if (isRouteActive(["admin.orders.*"])) return "orders"
        if (isRouteActive(["admin.posts.*", "admin.categories.*", "admin.tags.*"])) return "posts"
        if (isRouteActive(["admin.pages.*"])) return "pages"
        if (isRouteActive(["admin.themes.*", "admin.menus.*"])) return "appearance"
        if (isRouteActive(["admin.portfolios.*"])) return "portfolio"
        if (isRouteActive(["admin.services.*"])) return "services"
        if (isRouteActive(["admin.case.study.*"])) return "caseStudy"
        if (isRouteActive(["admin.teams.*"])) return "teams"
        if (isRouteActive(["admin.testimonials.*"])) return "testimonials"
        if (isRouteActive(["admin.users.*", "admin.roles.permissions.*"])) return "users"
        if (
            isRouteActive([
                "admin.settings.*",
                "admin.languages.*",
                "admin.translations.*",
                "admin.settings.currency.setting",
                "admin.settings.invoice",
                "admin.settings.social.login",
                "admin.manual.payment.gateway.*"
            ])
        )
            return "settings"
        return null
    }

    const [activeMenu, setActiveMenu] = useState(initialActiveMenu())

    const handleToggle = () => {
        const body = document.body
        if (toggle) {
            setToggle(false)
            body.classList.remove("yoo-sidebar-active")
        } else {
            setToggle(true)
            body.classList.add("yoo-sidebar-active")
        }
    }

    const toggleMenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu)
    }

    return (
        <>
            <div className="yoo-sidebarheader-toggle" onClick={handleToggle}>
                <div className="yoo-button-bar1" />
                <div className="yoo-button-bar2" />
                <div className="yoo-button-bar3" />
            </div>
            <div
                className={`yoo-sidebarheader yoo-with-boxed-icon${isHovered ? " yoo-hover-active" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="yoo-sidebarheader-in">
                    <div className="yoo-sidebar-nav">
                        <ul className="yoo-sidebar-nav-list yoo-mp0">
                            <li className={`${route().current("admin.dashboard") ? "active" : ""}`}>
                                <Link href={route("admin.dashboard")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <Icon icon="ion:cube-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Dashboard")}</span>
                                    </span>
                                </Link>
                            </li>
                            <li className={`yoo-sidebar-has-children ${activeMenu === "skkni" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("skkni")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                            <Icon icon="ion:document-text-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("SKKNI")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon icon={activeMenu === "skkni" ? "ion:chevron-down" : "ion:chevron-forward"} width="16" height="16" />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "skkni" ? "active" : ""}`}>
                                    <li className={route().current("admin.skkni.index") ? "active" : ""}>
                                        <Link href={route("admin.skkni.index")}>
                                            <span className="yoo-sidebar-link-title">
                                                <span className="yoo-sidebar-link-text">{translate("All SKKNI")}</span>
                                            </span>
                                        </Link>
                                    </li>
                                    <li className={route().current("admin.skkni.create") ? "active" : ""}>
                                        <Link href={route("admin.skkni.create")}>
                                            <span className="yoo-sidebar-link-title">
                                                <span className="yoo-sidebar-link-text">{translate("Add New")}</span>
                                            </span>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className={`yoo-sidebar-has-children ${activeMenu === "posts" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("posts")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                            <Icon icon="ion:newspaper-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Posts")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon icon={activeMenu === "posts" ? "ion:chevron-down" : "ion:chevron-forward"} width="16" height="16" />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "posts" ? "active" : ""}`}>
                                    {hasPermission("posts.index") && (
                                        <li className={`${route().current("admin.posts.index") && "active"}`}>
                                            <Link href={route("admin.posts.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Posts")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("posts.create") && (
                                        <li className={`${route().current("admin.posts.create") && "active"}`}>
                                            <Link href={route("admin.posts.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_category.index") && (
                                        <li className={`${route().current("admin.categories.*") && "active"}`}>
                                            <Link href={route("admin.categories.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("post_tags.index") && (
                                        <li className={`${route().current("admin.tags.index") && "active"}`}>
                                            <Link href={route("admin.tags.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Tags")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Comments */}
                            {hasPermission("comments.index") && (
                                <li className={`${route().current("admin.comments.*") ? "active" : ""}`}>
                                    <Link href={route("admin.comments.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                                <Icon icon="ion:chatbox-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Comments")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Products Menu */}
                            {isEnabledEcommerce === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "products" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("products")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-pink-bg">
                                                <Icon icon="ion:bag-handle-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Products")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "products" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "products" ? "active" : ""}`}>
                                        {hasPermission("products.index") && (
                                            <li className={`${route().current("admin.products.*") && "active"}`}>
                                                <Link href={route("admin.products.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Products")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("product_categories.index") && (
                                            <li className={`${route().current("admin.product.categories.*") && "active"}`}>
                                                <Link href={route("admin.product.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        <li className={`${route().current("admin.brands.*") && "active"}`}>
                                            <Link href={route("admin.brands.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Brands")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        {hasPermission("product_tags.index") && (
                                            <li className={`${route().current("admin.product.tags.*") && "active"}`}>
                                                <Link href={route("admin.product.tags.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Tags")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("coupons.index") && (
                                            <li className={`${route().current("admin.coupons.*") && "active"}`}>
                                                <Link href={route("admin.coupons.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Coupons")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("product_reviews.index") && (
                                            <li className={`${route().current("admin.reviews.*") && "active"}`}>
                                                <Link href={route("admin.reviews.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Reviews")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Orders Menu */}
                            {isEnabledEcommerce === "1" && (
                                <>
                                    {hasPermission("orders.index") && (
                                        <li className={`yoo-sidebar-has-children ${activeMenu === "orders" ? "active" : ""}`}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    toggleMenu("orders")
                                                }}
                                            >
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-icon yoo-salmon-bg">
                                                        <Icon icon="ion:cart-outline" width="20" height="20" />
                                                    </span>
                                                    <span className="yoo-sidebar-link-text">{translate("Orders")}</span>
                                                </span>
                                                <span className="yoo-dropdown-arrow">
                                                    <Icon
                                                        icon={activeMenu === "orders" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                        width="16"
                                                        height="16"
                                                    />
                                                </span>
                                            </a>
                                            <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "orders" ? "active" : ""}`}>
                                                <li className={`${route().current("admin.orders.index") && !route().params.filter && "active"}`}>
                                                    <Link href={route("admin.orders.index")}>
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("All Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "2"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "2"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("Completed Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "3"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "3"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("Cancelled Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li
                                                    className={`${route().current("admin.orders.index", {
                                                        filter: {
                                                            payment_status: "1"
                                                        }
                                                    }) && "active"
                                                        }`}
                                                >
                                                    <Link
                                                        href={route("admin.orders.index", {
                                                            filter: {
                                                                payment_status: "1"
                                                            }
                                                        })}
                                                    >
                                                        <span className="yoo-sidebar-link-title">
                                                            <span className="yoo-sidebar-link-text">{translate("Pending Payment Orders")}</span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </>
                            )}

                            {/* Subscribers */}
                            {hasPermission("subscribers.index") && (
                                <li className={`${route().current("admin.subscribers.*") ? "active" : ""}`}>
                                    <Link href={route("admin.subscribers.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <Icon icon="ion:mail-open-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Subscribers")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Support Ticket */}
                            <li className={`${route().current("admin.tickets.*") ? "active" : ""}`}>
                                <Link href={route("admin.tickets.index")}>
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-salmon-bg">
                                            <Icon icon="ion:chatbubbles-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Support Ticket")}</span>
                                    </span>
                                </Link>
                            </li>

                            {/* Form Response */}
                            {hasPermission("form_response.index") && (
                                <li className={`${route().current("admin.form.response.*") ? "active" : ""}`}>
                                    <Link href={route("admin.form.response.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                                <Icon icon="ion:mail-unread-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Form Response")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Pricing Plan */}
                            {hasPermission("pricing_plans.index") && (
                                <li className={`${route().current("admin.pricing.plans.*") ? "active" : ""}`}>
                                    <Link href={route("admin.pricing.plans.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                                <Icon icon="ion:cash-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Pricing Plan")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Payment History */}
                            {hasPermission("payment_methods.index") && (
                                <li className={`${route().current("admin.payment.history.*") ? "active" : ""}`}>
                                    <Link href={route("admin.payment.history.index")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <Icon icon="ion:card-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Payment History")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Media */}
                            {hasPermission("media.index") && (
                                <li className={`${route().current("admin.media.library") ? "active" : ""}`}>
                                    <Link href={route("admin.media.library")}>
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-gray-bg">
                                                <Icon icon="ion:camera-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Media")}</span>
                                        </span>
                                    </Link>
                                </li>
                            )}

                            {/* Portfolio Menu */}
                            {isEnabledPortfolio === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "portfolio" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("portfolio")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-indigo-bg">
                                                <Icon icon="ion:copy-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Portfolios")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "portfolio" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "portfolio" ? "active" : ""}`}>
                                        {hasPermission("portfolios.index") && (
                                            <li className={`${route().current("admin.portfolios.index") && "active"}`}>
                                                <Link href={route("admin.portfolios.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All portfolios")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("portfolios.create") && (
                                            <li className={`${route().current("admin.portfolios.create") && "active"}`}>
                                                <Link href={route("admin.portfolios.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("portfolio_categories.index") && (
                                            <li className={`${route().current("admin.portfolios.categories.index") && "active"}`}>
                                                <Link href={route("admin.portfolios.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Service Menu */}
                            {isEnabledService === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "services" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("services")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                                <Icon icon="ion:cloud-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Services")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "services" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "services" ? "active" : ""}`}>
                                        {hasPermission("services.index") && (
                                            <li className={`${route().current("admin.services.index") && "active"}`}>
                                                <Link href={route("admin.services.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All services")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("services.create") && (
                                            <li className={`${route().current("admin.services.create") && "active"}`}>
                                                <Link href={route("admin.services.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("service_categories.index") && (
                                            <li className={`${route().current("admin.services.categories.index") && "active"}`}>
                                                <Link href={route("admin.services.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Case Study Menu */}
                            {isEnabledCaseStudy === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "caseStudy" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("caseStudy")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-green-bg">
                                                <Icon icon="ion:folder-open-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Case Study")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "caseStudy" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "caseStudy" ? "active" : ""}`}>
                                        {hasPermission("case_study.index") && (
                                            <li className={`${route().current("admin.case.study.index") && "active"}`}>
                                                <Link href={route("admin.case.study.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All case study")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("case_study.create") && (
                                            <li className={`${route().current("admin.case.study.create") && "active"}`}>
                                                <Link href={route("admin.case.study.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("case_study_categories.index") && (
                                            <li className={`${route().current("admin.case.study.categories.index") && "active"}`}>
                                                <Link href={route("admin.case.study.categories.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Categories")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Team Menu */}
                            {isEnabledTeam === "1" && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "teams" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("teams")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-light-blue-bg">
                                                <Icon icon="ion:add-circle-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Teams")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon icon={activeMenu === "teams" ? "ion:chevron-down" : "ion:chevron-forward"} width="16" height="16" />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "teams" ? "active" : ""}`}>
                                        {hasPermission("teams.index") && (
                                            <li className={`${route().current("admin.teams.index") && "active"}`}>
                                                <Link href={route("admin.teams.index")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("All Teams")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                        {hasPermission("teams.create") && (
                                            <li className={`${route().current("admin.teams.create") && "active"}`}>
                                                <Link href={route("admin.teams.create")}>
                                                    <span className="yoo-sidebar-link-title">
                                                        <span className="yoo-sidebar-link-text">{translate("Add new")}</span>
                                                    </span>
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            )}

                            {/* Pages Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "pages" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("pages")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-orange-bg">
                                            <Icon icon="ion:file-tray-full-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Pages")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon icon={activeMenu === "pages" ? "ion:chevron-down" : "ion:chevron-forward"} width="16" height="16" />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "pages" ? "active" : ""}`}>
                                    {hasPermission("pages.index") && (
                                        <li className={route().current("admin.pages.index") ? "active" : ""}>
                                            <Link href={route("admin.pages.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Pages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("pages.create") && (
                                        <li>
                                            <Link href={route("admin.pages.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add New Pages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Appearance Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "appearance" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("appearance")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-gray-bg">
                                            <Icon icon="ion:brush-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("Appearance")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon
                                            icon={activeMenu === "appearance" ? "ion:chevron-down" : "ion:chevron-forward"}
                                            width="16"
                                            height="16"
                                        />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "appearance" ? "active" : ""}`}>
                                    {hasPermission("appearance.customize") && (
                                        <li>
                                            <Link href={route("admin.customize.customize")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Customize")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("appearance.menus") && (
                                        <li className={route().current("admin.menus.index") ? "active" : ""}>
                                            <Link href={route("admin.menus.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Menus")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Users Menu */}
                            <li className={`yoo-sidebar-has-children ${activeMenu === "users" ? "active" : ""}`}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleMenu("users")
                                    }}
                                >
                                    <span className="yoo-sidebar-link-title">
                                        <span className="yoo-sidebar-link-icon yoo-pink-bg">
                                            <Icon icon="ion:people-outline" width="20" height="20" />
                                        </span>
                                        <span className="yoo-sidebar-link-text">{translate("User & Roles")}</span>
                                    </span>
                                    <span className="yoo-dropdown-arrow">
                                        <Icon icon={activeMenu === "users" ? "ion:chevron-down" : "ion:chevron-forward"} width="16" height="16" />
                                    </span>
                                </a>
                                <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "users" ? "active" : ""}`}>
                                    {hasPermission("users.index") && (
                                        <li className={route().current("admin.users.index") ? "active" : ""}>
                                            <Link href={route("admin.users.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("All Users")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {hasPermission("users.create") && (
                                        <li className={route().current("admin.users.create") ? "active" : ""}>
                                            <Link href={route("admin.users.create")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Add User")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                    {auth.user.role_name === "admin" && (
                                        <li className={route().current("admin.roles.permissions.*") ? "active" : ""}>
                                            <Link href={route("admin.roles.permissions.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Role & Permission")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </li>

                            {/* Settings Menu */}
                            {hasPermission("settings.manage") && (
                                <li className={`yoo-sidebar-has-children ${activeMenu === "settings" ? "active" : ""}`}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            toggleMenu("settings")
                                        }}
                                    >
                                        <span className="yoo-sidebar-link-title">
                                            <span className="yoo-sidebar-link-icon yoo-blue-bg">
                                                <Icon icon="ion:cog-outline" width="20" height="20" />
                                            </span>
                                            <span className="yoo-sidebar-link-text">{translate("Settings")}</span>
                                        </span>
                                        <span className="yoo-dropdown-arrow">
                                            <Icon
                                                icon={activeMenu === "settings" ? "ion:chevron-down" : "ion:chevron-forward"}
                                                width="16"
                                                height="16"
                                            />
                                        </span>
                                    </a>
                                    <ul className={`yoo-sidebar-nav-dropdown ${activeMenu === "settings" ? "active" : ""}`}>
                                        <li className={`${route().current("admin.settings.page.setting") && "active"}`}>
                                            <Link href={route("admin.settings.page.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Page Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.common.settings") && "active"}`}>
                                            <Link href={route("admin.settings.common.settings")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Common Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.google.captcha") && "active"}`}>
                                            <Link href={route("admin.settings.google.captcha")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Google Captcha Setting")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.payment.gateway") && "active"}`}>
                                            <Link href={route("admin.settings.payment.gateway")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Payment Gateways")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.manual.payment.gateway.*") && "active"}`}>
                                            <Link href={route("admin.manual.payment.gateway.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Manual Payment Gateways")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.smtp.setting") && "active"}`}>
                                            <Link href={route("admin.settings.smtp.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("SMTP Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.currency.setting") && "active"}`}>
                                            <Link href={route("admin.settings.currency.setting")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Currency Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.languages.*") && "active"}`}>
                                            <Link href={route("admin.languages.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Languages")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.translations.*") && "active"}`}>
                                            <Link href={route("admin.translations.index")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Translation")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.invoice") && "active"}`}>
                                            <Link href={route("admin.settings.invoice")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Invoice Settings")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${route().current("admin.settings.social.login") && "active"}`}>
                                            <Link href={route("admin.settings.social.login")}>
                                                <span className="yoo-sidebar-link-title">
                                                    <span className="yoo-sidebar-link-text">{translate("Social Media Login")}</span>
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
