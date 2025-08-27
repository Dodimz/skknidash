import { IonIcon } from "@ionic/react"
import { ellipsisHorizontal } from "ionicons/icons"
import { useState, useEffect, useRef } from "react"

export default function ActionButton({ children }) {
    const [isShow, setIsShow] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsShow(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="position-relative">
            <button className="yoo-table-action-btn yoo-style1" type="button" onClick={() => setIsShow(true)}>
                <IonIcon icon={ellipsisHorizontal} className="md hydrated" />
            </button>
            <div
                ref={dropdownRef}
                className={`dropdown-menu ${isShow && "show"}`}
                style={{
                    position: "absolute",
                    willChange: "transform",
                    top: 0,
                    left: 0
                }}
            >
                {children}
            </div>
        </div>
    )
}
