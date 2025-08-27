import React, { useRef, useState } from "react"
import { Icon } from "@iconify/react"
import { useSelector } from "react-redux"
import { usePage } from "@inertiajs/react"
import { useEffect } from "react"

export default function LanguageDropdown() {
    const { currentLang } = useSelector((state) => state.pages)
    const { lang } = usePage().props
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleToggle = () => setDropdownOpen(!dropdownOpen)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="cs_dropdown_wrap" ref={dropdownRef}>
            <button className={`cs_dropdown_toggle_btn${dropdownOpen ? " active" : ""}`} onClick={handleToggle}>
                <Icon icon="iconoir:language" width="24" height="24" />
            </button>
            {dropdownOpen && (
                <ul className="cs_dropdown_list active cs_mp0">
                    {Object.entries(lang.languages).map(([code, lang]) => (
                        <li key={code} className={code === currentLang ? "active" : ""}>
                            <a href={route("change.lang", code)}>{lang.name}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
