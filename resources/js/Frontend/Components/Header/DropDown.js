import React, { useState } from "react"

export default function DropDown({ children }) {
    // Mobile Toggle
    const [mobileToggle, setMobileToggle] = useState(false)
    const handelMobileToggle = () => {
        setMobileToggle(!mobileToggle)
    }
    return (
        <>
            <span className={`cs_munu_dropdown_toggle${mobileToggle ? " active" : ""}`} onClick={handelMobileToggle}>
                <span></span>
            </span>
            {children}
        </>
    )
}
