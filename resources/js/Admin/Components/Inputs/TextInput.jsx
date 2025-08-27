import { useRef, useState } from "react"

export default function TextInput({ marginBottom = "20px", ...props }) {
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef()

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    const inputClassName = isFocused || inputRef.current?.value || props.value ? "active1" : ""
    return (
        <div className={`form-group level-up form-group-md ${inputClassName}`} style={{ marginBottom: marginBottom }}>
            {props.title && <label htmlFor={props.id}>{props.title}</label>}
            <input
                {...props}
                ref={inputRef}
                id={props.id}
                className={`form-control ${props.error && "is-invalid"}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            {props.error && <div className="invalid-feedback">{props.error}</div>}
        </div>
    )
}
