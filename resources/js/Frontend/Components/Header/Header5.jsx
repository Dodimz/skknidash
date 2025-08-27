import React, { useEffect, useState, useRef } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"
import SideHeader from "./SideHeader"
import GlobalSearch from "./GlobalSearch"
import LanguageDropdown from "./LanguageDropdown"
import { Icon } from "@iconify/react"
import gravatarUrl from "gravatar-url"

export default function Header5() {
    const { cart_slug } = usePage().props
    const { carts } = useSelector((state) => state.carts)
    const { currentLang, pageInfo } = useSelector((state) => state.pages)
    const currentLangPageInfo = pageInfo[currentLang]
    const customize = useSelector((state) => state.customize)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [isSticky, setIsSticky] = useState()
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
    const { lang, auth } = usePage().props
    const currentLanguage = currentLang ?? lang.default_lang
    const mainMenus = localStorage.getItem("main_menu") ? JSON.parse(localStorage.getItem("main_menu")) : []
    const menus = mainMenus ? organizeMenusIntoHierarchy(mainMenus[currentLanguage]) : []

    const cartItemCount = carts?.reduce((total, item) => total + (item.quantity || 1), 0) || 0

    const handleProfileDropdownToggle = () => setProfileDropdownOpen(!profileDropdownOpen)

    // handle logout
    const handleLogout = () => {
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to logout this session")}?`, `${translate("Logout")}!`, () => {
            router.post(route("logout"))
        })
    }

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 0) {
                setIsSticky(true)
            } else {
                setIsSticky(false)
            }
        })
    }, [])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".cs_dropdown_wrap")) {
                setProfileDropdownOpen(false)
            }
        }

        if (profileDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }

        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [profileDropdownOpen])

    return (
        <>
            <header
                className={`cs_site_header cs_style_1 cs_primary_color cs_with_border cs_sticky_header cs_size_md${isSticky ? " cs_sticky_active" : ""
                    }`}
            >
                <div className="cs_main_header">
                    <div className="container-fluid">
                        <div className="cs_main_header_in">
                            <div className="cs_main_header_left">
                                <Link className="cs_site_branding" to="/" href="/">
                                    <img src={customize?.general?.site_logo_dark} alt={customize?.general?.site_name} />
                                </Link>
                                <div className="cs_nav">
                                    <nav className={`cs_nav_list_wrap${mobileToggle ? " cs_active" : ""}`}>
                                        <ul className="cs_nav_list">
                                            {menus.map((menuItem) => (
                                                <MenuItem setMobileToggle={setMobileToggle} key={menuItem.id} item={menuItem} />
                                            ))}
                                        </ul>
                                    </nav>
                                    <span
                                        className={`cs_menu_toggle${mobileToggle ? " cs_toggle_active" : ""}`}
                                        onClick={() => setMobileToggle(!mobileToggle)}
                                    >
                                        <span></span>
                                    </span>
                                </div>
                            </div>
                            <div className="cs_main_header_right">
                                <div className="cs_toolbox cs_has_main_nav">
                                    <ul className="cs_header_contact_list cs_mp0">
                                        {customize?.contact?.contact_email && (
                                            <li>
                                                <i>
                                                    <Icon icon="lucide:mail" width="18" height="18" />
                                                </i>
                                                <a href={`mailto:${translate(customize?.contact?.contact_email)}`}>
                                                    {translate(customize?.contact?.contact_email)}
                                                </a>
                                            </li>
                                        )}
                                        {customize?.contact?.contact_phone_number && (
                                            <li>
                                                <i>
                                                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M8 6.65367C6.162 6.65367 4.66667 8.15108 4.66667 9.99164C4.66667 11.8322 6.162 13.3296 8 13.3296C9.838 13.3296 11.3333 11.8322 11.3333 9.99164C11.3333 8.15108 9.838 6.65367 8 6.65367ZM8 11.9944C6.89733 11.9944 6 11.0958 6 9.99164C6 8.88744 6.89733 7.98886 8 7.98886C9.10267 7.98886 10 8.88744 10 9.99164C10 11.0958 9.10267 11.9944 8 11.9944ZM13.764 7.29456C15.0173 7.16037 16 6.10758 16 4.81845C16 3.8738 15.624 2.97589 14.938 2.28893C11.89 -0.763311 4.10867 -0.762644 1.062 2.28893C0.376 2.97589 0 3.8738 0 4.81778C0 6.10758 0.983333 7.16037 2.236 7.29456L0.862667 9.87348C0.298 10.9336 0 12.1286 0 13.3296C0 14.8023 1.196 16 2.66667 16H13.3333C14.804 16 16 14.8023 16 13.3296C16 12.1286 15.702 10.9336 15.1373 9.87348L13.764 7.29456ZM1.33333 4.81712C1.33333 4.22963 1.57067 3.66685 2.00467 3.23291C4.58267 0.652658 11.4187 0.652658 13.9953 3.23291C14.4287 3.66685 14.6673 4.22963 14.6667 4.81778C14.6667 5.46201 14.1433 5.98607 13.5 5.98607H13.044L12.526 5.12154C12.2493 4.6589 11.85 4.29773 11.3733 4.07809C10.62 3.73027 9.42333 3.31636 8 3.31636C6.57667 3.31636 5.38 3.73094 4.62733 4.07809C4.14933 4.29839 3.75067 4.6589 3.474 5.12154L2.956 5.98607H2.5C1.85667 5.98607 1.33333 5.46201 1.33333 4.81712ZM13.3333 14.6648H2.66667C1.93133 14.6648 1.33333 14.066 1.33333 13.3296C1.33333 12.3469 1.57733 11.3689 2.04 10.5024L3.91867 6.97478L4.61733 5.80783C4.756 5.57684 4.952 5.39792 5.186 5.29044C5.81733 4.9987 6.81867 4.65088 8.00067 4.65088C9.18267 4.65088 10.1833 4.9987 10.816 5.29044C11.0493 5.39792 11.2453 5.57684 11.384 5.80783L12.0827 6.97478L13.9613 10.5024C14.4233 11.3696 14.668 12.3476 14.668 13.3296C14.668 14.066 14.07 14.6648 13.3347 14.6648H13.3333Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </i>
                                                <a href={`tel:${translate(customize?.contact?.contact_phone_number)}`}>
                                                    {translate(customize?.contact?.contact_phone_number)}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                    <GlobalSearch />
                                    {auth?.is_loggedIn ? (
                                        <div className="cs_dropdown_wrap">
                                            <div
                                                onClick={handleProfileDropdownToggle}
                                                className={`cs_header_user_btn ${profileDropdownOpen ? "active" : ""}`}
                                            >
                                                <Icon icon="lucide:circle-user" width="20" height="20" />
                                            </div>
                                            {profileDropdownOpen && (
                                                <div className="cs_header_user_dropdown">
                                                    <div className="cs_header_user_info">
                                                        <img src={gravatarUrl(auth?.user?.email)} alt="" />
                                                        <h4 className="">{auth?.user?.name}</h4>
                                                        <p className="">{auth?.user?.email}</p>
                                                    </div>
                                                    <ul className="cs_header_user_list cs_mp0">
                                                        <li>
                                                            <Link href={route("user.dashboard")}>{translate("Dashboard")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.orders")}>{translate("My Orders")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href={route("user.profile.edit")}>{translate("Profile")}</Link>
                                                        </li>
                                                        <li>
                                                            <a href="#" onClick={handleLogout}>
                                                                {translate("Log out")}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="cs_header_user_btn active d-flex">
                                            <Link href={route("login.create")}>{translate("Login")}</Link>
                                        </div>
                                    )}
                                    {currentLangPageInfo?.is_show_shopping_cart && (
                                        <Link href={route("pages.show", { slug: cart_slug })} className="cart-counter">
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_293_142)">
                                                    <path
                                                        d="M19.25 5.5H16.5C16.5 4.04131 15.9205 2.64236 14.8891 1.61091C13.8576 0.579463 12.4587 0 11 0C9.54131 0 8.14236 0.579463 7.11091 1.61091C6.07946 2.64236 5.5 4.04131 5.5 5.5H2.75C2.02065 5.5 1.32118 5.78973 0.805456 6.30546C0.289731 6.82118 0 7.52065 0 8.25L0 17.4167C0.00145554 18.6318 0.484808 19.7967 1.34403 20.656C2.20326 21.5152 3.3682 21.9985 4.58333 22H17.4167C18.6318 21.9985 19.7967 21.5152 20.656 20.656C21.5152 19.7967 21.9985 18.6318 22 17.4167V8.25C22 7.52065 21.7103 6.82118 21.1945 6.30546C20.6788 5.78973 19.9793 5.5 19.25 5.5ZM11 1.83333C11.9725 1.83333 12.9051 2.21964 13.5927 2.90728C14.2804 3.59491 14.6667 4.52754 14.6667 5.5H7.33333C7.33333 4.52754 7.71964 3.59491 8.40728 2.90728C9.09491 2.21964 10.0275 1.83333 11 1.83333ZM20.1667 17.4167C20.1667 18.146 19.8769 18.8455 19.3612 19.3612C18.8455 19.8769 18.146 20.1667 17.4167 20.1667H4.58333C3.85399 20.1667 3.15451 19.8769 2.63879 19.3612C2.12306 18.8455 1.83333 18.146 1.83333 17.4167V8.25C1.83333 8.00688 1.92991 7.77373 2.10182 7.60182C2.27373 7.42991 2.50688 7.33333 2.75 7.33333H5.5V9.16667C5.5 9.40978 5.59658 9.64294 5.76849 9.81485C5.94039 9.98676 6.17355 10.0833 6.41667 10.0833C6.65978 10.0833 6.89294 9.98676 7.06485 9.81485C7.23676 9.64294 7.33333 9.40978 7.33333 9.16667V7.33333H14.6667V9.16667C14.6667 9.40978 14.7632 9.64294 14.9352 9.81485C15.1071 9.98676 15.3402 10.0833 15.5833 10.0833C15.8264 10.0833 16.0596 9.98676 16.2315 9.81485C16.4034 9.64294 16.5 9.40978 16.5 9.16667V7.33333H19.25C19.4931 7.33333 19.7263 7.42991 19.8982 7.60182C20.0701 7.77373 20.1667 8.00688 20.1667 8.25V17.4167Z"
                                                        fill="#121212"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_293_142">
                                                        <rect width={22} height={22} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            {cartItemCount === 0 ? "" : <span>{cartItemCount}</span>}
                                        </Link>
                                    )}
                                    {Object.entries(lang.languages).length > 1 && <LanguageDropdown />}
                                    <button
                                        className="cs_hamburger_btn cs_hamburger_info_btn "
                                        onClick={() => setSideHeaderToggle(!sideHeaderToggle)}
                                    >
                                        <span className="cs_hamburger_btn_in">
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <SideHeader sideHeaderToggle={sideHeaderToggle} setSideHeaderToggle={setSideHeaderToggle} customize={customize} />
        </>
    )
}
