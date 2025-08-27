import React, { useState } from "react"
import "./CookiePolicy.css"
import translate from "@/utils/translate"
import Cookies from "js-cookie"
import { useEffect } from "react"

const CookiePolicy = () => {
    const [visible, setVisible] = useState(false)

    const handleAcceptCookie = () => {
        Cookies.set("accept_cookie", true, { expires: 365 })
        window.location.reload()
    }

    useEffect(() => {
        const consent = Cookies.get("accept_cookie")
        if (!consent) {
            setVisible(true)
        }
    }, [])

    return visible ? (
        <div className="cookie-consent">
            <div className="cookie-card">
                <div className="cookie-content">
                    <div className="cookie-icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
                            <path d="M8.5 8.5v.01"></path>
                            <path d="M16 15.5v.01"></path>
                            <path d="M12 12v.01"></path>
                            <path d="M11 17v.01"></path>
                            <path d="M7 14v.01"></path>
                        </svg>
                    </div>
                    <p className="cookie-message">
                        {translate(
                            `We use cookies to enhance your browsing experience, personalize content, and analyze our traffic. By clicking 'Accept all', you consent to our use of cookies.`
                        )}
                    </p>
                </div>
                <div className="cookie-actions">
                    <button className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color cs_w_100_sm" onClick={handleAcceptCookie}>
                        {translate("Accept all")}
                    </button>
                </div>
            </div>
        </div>
    ) : null
}

export default CookiePolicy
