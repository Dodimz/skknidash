import React, { useEffect, useRef, useState } from "react"
import { ChromePicker } from "react-color"

export default function ColorPicker({ title, color, onChange }) {
    const [showColorPicker, setShowColorPicker] = useState(false)
    const colorPickerRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setShowColorPicker(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [colorPickerRef])

    return (
        <>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    {title}:
                    <div
                        className="color"
                        style={{
                            width: "30px",
                            height: "22px",
                            backgroundColor: color,
                            cursor: "pointer",
                            border: "1px solid #ced4da",
                            borderRadius: "5px"
                        }}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    ></div>
                </label>
            </div>

            {showColorPicker && (
                <div ref={colorPickerRef}>
                    <ChromePicker color={{ hex: color, a: 1 }} disableAlpha={true} onChange={onChange} />
                </div>
            )}
        </>
    )
}
