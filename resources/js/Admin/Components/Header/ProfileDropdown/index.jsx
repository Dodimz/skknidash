import { useEffect, useRef, useState } from "react"
import { usePage, router, Link } from "@inertiajs/react"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import gravatarUrl from "gravatar-url"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"

export default function ProfileDropdown() {
    const [isCollapse, setIsCollapse] = useState(false)
    const { props } = usePage()
    const outsideClickDetectorRef = useRef(null)

    // handle dropdown
    const handleDropdown = () => {
        setIsCollapse(!isCollapse)
    }

    // Hide on outside click
    const hideOnClickOutside = (e) => {
        if (outsideClickDetectorRef.current && !outsideClickDetectorRef.current.contains(e.target)) {
            setIsCollapse(false)
        }
    }

    // handle logout
    const handleLogout = () => {
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to logout this session")}?`, `${translate("Logout")}!`, () => {
            router.post(route("logout"))
        })
    }

    useEffect(() => {
        // event listeners
        document.addEventListener("click", hideOnClickOutside, true)
    }, [])

    return (
        <div className={`yoo-toggle-body yoo-profile-nav yoo-style1 ${isCollapse && "active"}`} onClick={() => handleDropdown()}>
            <div className="yoo-toggle-btn yoo-profile-nav-btn">
                <div className="yoo-profile-nav-text">
                    <span>{translate("Welcome")},</span>
                    <h4>{props.auth.user.name}</h4>
                </div>
                <div className="yoo-profile-nav-img">
                    <img src={gravatarUrl(props.auth.user.email)} alt="profile" />
                </div>
            </div>
            <ul className={`yoo-dropdown yoo-style1 ${isCollapse && "active"}`} ref={outsideClickDetectorRef}>
                <li>
                    <Link href={route("admin.profile")}>
                        <Icon
                            icon="ion:person-circle-outline"
                            width="20"
                            height="20"
                            style={{
                                marginRight: "6px"
                            }}
                            className="hydrated"
                        />
                        {translate("My Profile")}
                    </Link>
                </li>
                <li>
                    <Link href={route("admin.settings.page.setting")}>
                        <Icon
                            icon="ion:settings-outline"
                            width="20"
                            height="20"
                            style={{
                                marginRight: "6px"
                            }}
                            className="hydrated"
                        />
                        {translate("Page Settings")}
                    </Link>
                </li>
                <li>
                    <a href="/" target="_blank">
                        <Icon
                            icon="ion:link-outline"
                            width="20"
                            height="20"
                            style={{
                                marginRight: "6px"
                            }}
                            className="hydrated"
                        />
                        {translate("Visit Site")}
                    </a>
                </li>
                <li className="yoo-dropdown-cta">
                    <a href="#" onClick={handleLogout}>
                        {translate("Sign Out")}
                    </a>
                </li>
            </ul>
        </div>
    )
}
