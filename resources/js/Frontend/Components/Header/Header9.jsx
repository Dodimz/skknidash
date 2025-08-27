import React, { useEffect, useState } from "react"
import { Link, router, usePage } from "@inertiajs/react"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "@/Admin/Components/Header/MenuItem"
import { useSelector } from "react-redux"
import SideHeader from "./SideHeader"
import LanguageDropdown from "./LanguageDropdown"
import { Icon } from "@iconify/react"
import gravatarUrl from "gravatar-url"
import translate from "@/utils/translate"

export default function Header9() {
    const { cart_slug } = usePage().props
    const { carts } = useSelector((state) => state.carts)
    const { currentLang, pageInfo } = useSelector((state) => state.pages)
    const currentLangPageInfo = pageInfo[currentLang]
    const customize = useSelector((state) => state.customize)
    const [sideHeaderToggle, setSideHeaderToggle] = useState(false)
    const [mobileToggle, setMobileToggle] = useState(false)
    const [hamburgerToggle, setHamburgerToggle] = useState(false)
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
            <header className={`cs_site_header cs_style_2 cs_color_1 cs_sticky_header${isSticky ? " cs_sticky_active" : ""}`}>
                <div className="cs_main_header">
                    <div className="container-fluid">
                        <div className="cs_main_header_in">
                            <div className="cs_main_header_left">
                                <Link className="cs_site_branding" to="/" href="/">
                                    <img src={customize?.general?.site_logo_light} alt={customize?.general?.site_name} />
                                </Link>
                            </div>
                            <div className="cs_main_header_right">
                                <div className="cs_toolbox">
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
                                    <button className="cs_hamburger_btn cs_hamburger_menu_btn" onClick={() => setHamburgerToggle(!hamburgerToggle)}>
                                        <span className="cs_hamburger_btn_in">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`cs_hamburger_overlay${hamburgerToggle ? " active" : ""}`} onClick={() => setHamburgerToggle(!hamburgerToggle)} />
            <div className={`cs_hamburger_header cs_ternary_color cs_start_right${hamburgerToggle ? " active" : ""}`}>
                <button className="cs_close_hamburger" onClick={() => setHamburgerToggle(!hamburgerToggle)}>
                    <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24.4427 9.15216L20.5229 2.38133C19.6875 0.938623 18.1333 0.041748 16.4656 0.041748H8.60622C6.93955 0.041748 5.38538 0.937581 4.54893 2.38133L0.630176 9.15216C-0.209408 10.6011 -0.209408 12.4001 0.630176 13.849L4.54997 20.6199C5.38643 22.0626 6.94059 22.9595 8.60726 22.9595H16.4666C18.1343 22.9595 19.6885 22.0636 20.5239 20.6199L24.4437 13.849C25.2833 12.4001 25.2823 10.6011 24.4427 9.15216ZM23.5416 13.3272L19.6218 20.098C18.9729 21.2199 17.7635 21.9178 16.4666 21.9178H8.60726C7.31143 21.9178 6.10205 21.2209 5.45205 20.098L1.53226 13.3272C0.880176 12.2001 0.880176 10.8011 1.53226 9.67404L5.45205 2.90321C6.10205 1.78133 7.31143 1.08341 8.60726 1.08341H16.4666C17.7635 1.08341 18.9729 1.78029 19.6218 2.90321L23.5416 9.67404C24.1937 10.8011 24.1937 12.2001 23.5416 13.3272ZM16.5146 8.223L13.2375 11.5001L16.5146 14.7772C16.7177 14.9803 16.7177 15.3105 16.5146 15.5136C16.4125 15.6157 16.2791 15.6657 16.1458 15.6657C16.0125 15.6657 15.8791 15.6147 15.7771 15.5136L12.5 12.2365L9.22288 15.5136C9.1208 15.6157 8.98747 15.6657 8.85413 15.6657C8.7208 15.6657 8.58747 15.6147 8.48538 15.5136C8.28226 15.3105 8.28226 14.9803 8.48538 14.7772L11.7625 11.5001L8.48538 8.223C8.28226 8.01987 8.28226 7.68966 8.48538 7.48654C8.68851 7.28341 9.01872 7.28341 9.22184 7.48654L12.4989 10.7636L15.776 7.48654C15.9791 7.28341 16.3093 7.28341 16.5125 7.48654C16.7156 7.68966 16.7156 8.01987 16.5125 8.223H16.5146Z"
                            fill="white"
                        ></path>
                    </svg>
                </button>
                <div className="cs_hamburger_brand">
                    <Link className="cs_site_branding" to="/" href="/">
                        <img src={customize?.general?.site_logo_light} alt={customize?.general?.site_name} />
                    </Link>
                </div>
                <nav className="cs_hamburger_menu cs_white_color">
                    <ul className="cs_nav_list cs_primary_font cs_light">
                        {menus.map((menuItem) => (
                            <MenuItem setMobileToggle={setMobileToggle} key={menuItem.id} item={menuItem} />
                        ))}
                    </ul>
                </nav>
                <div className="cs_hamburger_footer">
                    {customize?.contact?.contact_phone_number && (
                        <h3>
                            <a href={`tel:${customize?.contact?.contact_phone_number}`}>{customize?.contact?.contact_phone_number}</a>
                        </h3>
                    )}
                    {customize?.contact?.contact_email && (
                        <p className="mb-0">
                            <a href={`mailto:${customize?.contact?.contact_email}`}>{customize?.contact?.contact_email}</a>
                        </p>
                    )}
                </div>
            </div>
            <SideHeader sideHeaderToggle={sideHeaderToggle} setSideHeaderToggle={setSideHeaderToggle} customize={customize} />
        </>
    )
}
