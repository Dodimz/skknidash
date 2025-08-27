import { useState, useEffect, useRef } from "react"

export default function DropDownButton({ children, selectedOption, disabled }) {
    const [isShowDropdown, setIsShowDropdown] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShowDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        setIsShowDropdown(false)
    }, [selectedOption])

    return (
        <div ref={dropdownRef}>
            <button
                disabled={disabled}
                onClick={() => setIsShowDropdown(!isShowDropdown)}
                className="btn btn-outline-light btn-sm dropdown-toggle yoo-table-btn2"
                type="button"
            >
                {selectedOption}
            </button>
            <div className={`dropdown-menu ${isShowDropdown ? "show" : ""}`}>{children}</div>
        </div>
    )
}
