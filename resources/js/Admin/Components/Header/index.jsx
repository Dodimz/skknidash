import ProfileDropdown from "@/Admin/Components/Header/ProfileDropdown/index.jsx"
import { useSelector } from "react-redux"
import React, { useState, useRef, useEffect } from "react"
import { Link, usePage } from "@inertiajs/react"
import { Icon } from "@iconify/react"

export default function Header() {
    const customize = useSelector((state) => state.customize)
    const { languages, default_lang } = usePage().props.lang
    const [isLanguageActive, setLanguageActive] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState(default_lang)
    const outsideClickRef = useRef(null)

    const toggleLanguage = () => {
        setLanguageActive((prevState) => !prevState) // Toggle the previous state
    }

    useEffect(() => {
        // Handle on outside click
        const handleOnClickOutside = (e) => {
            if (outsideClickRef.current && !outsideClickRef.current.contains(e.target)) {
                setLanguageActive(false)
            }
        }

        document.addEventListener("click", handleOnClickOutside, true)

        return () => {
            document.removeEventListener("click", handleOnClickOutside, true)
        }
    }, [])

    return (
        <header className="yoo-header yoo-style1 yoo-sticky-menu" ref={outsideClickRef}>
            <div className="yoo-main-header">
                <div className="yoo-main-header-in">
                    <div className="yoo-main-header-left">
                        <Link href={route("admin.dashboard")} className="yoo-logo-link yoo-light-logo">
                            <img src={customize?.general?.site_logo_light} alt="Logo" />
                        </Link>
                    </div>
                    <div className="yoo-main-header-right">
                        <div className="yoo-nav-wrap yoo-fade-up"></div>
                        <ul className="yoo-ex-nav yoo-style1 yoo-flex yoo-mp0">
                            {/* Language Dropdown */}
                            <li>
                                <div className="yoo-toggle-body yoo-profile-nav yoo-style1">
                                    <div
                                        className={`yoo-toggle-btn yoo-ex-nav-btn yoo-message-btn ${isLanguageActive ? "active" : ""}`}
                                        onClick={toggleLanguage}
                                    >
                                        <Icon icon="iconoir:language" width="20" height="20" />
                                    </div>
                                    <ul className={`yoo-dropdown yoo-style1 ${isLanguageActive ? "active" : ""}`} style={{ width: "200px" }}>
                                        {Object.entries(languages).map(([code, language]) => (
                                            <a
                                                onClick={() => {
                                                    setSelectedLanguage(code)
                                                }}
                                                className={`dropdown-item ${selectedLanguage === code ? "active" : ""}`}
                                                href={route("admin.change.lang", code)}
                                                key={code}
                                            >
                                                {language.name}
                                            </a>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                            {/* Profile Dropdown */}
                            <li>
                                <ProfileDropdown />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}
