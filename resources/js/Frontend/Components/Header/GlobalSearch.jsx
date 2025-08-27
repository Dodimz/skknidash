import translate from "@/utils/translate"
import { router } from "@inertiajs/react"
import React, { useState, useRef, useEffect } from "react"

export default function GlobalSearch() {
    const [searchQuery, setSearchQuery] = useState("")
    const [toggle, setToggle] = useState(false)
    const searchFormRef = useRef(null)
    const searchToggleRef = useRef(null)

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchFormRef.current &&
                searchToggleRef.current &&
                !searchFormRef.current.contains(event.target) &&
                !searchToggleRef.current.contains(event.target)
            ) {
                setToggle(false)
            }
        }

        // Add event listener when component mounts
        document.addEventListener("mousedown", handleClickOutside)

        // Clean up event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    // Handle search submission
    const getResults = (query) => {
        router.get(route("search.name"), { search: query }, { preserveState: true })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        getResults(searchQuery)
    }

    return (
        <>
            <span ref={searchToggleRef} className="cs_search_mobile_toggle" onClick={() => setToggle(!toggle)}>
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18.9996 19L12.9997 13M14.9996 8C14.9996 11.866 11.8656 15 7.99963 15C4.13364 15 0.999634 11.866 0.999634 8C0.999634 4.13401 4.13364 1 7.99963 1C11.8656 1 14.9996 4.13401 14.9996 8Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </span>
            <form ref={searchFormRef} onSubmit={handleSubmit} className={`cs_header_search_form${toggle ? " active" : ""}`}>
                <input
                    type="text"
                    placeholder={translate("Search")}
                    className="cs_header_search_field"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="cs_header_submit_btn">
                    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.9996 19L12.9997 13M14.9996 8C14.9996 11.866 11.8656 15 7.99963 15C4.13364 15 0.999634 11.866 0.999634 8C0.999634 4.13401 4.13364 1 7.99963 1C11.8656 1 14.9996 4.13401 14.9996 8Z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </form>
        </>
    )
}
