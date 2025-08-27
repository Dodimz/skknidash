import React, { useState, useEffect, useRef } from "react"
import "./CustomSelect.css"

const CustomSelect = ({ options, value, placeholder, onSelect }) => {
    const [showOptions, setShowOptions] = useState(false)
    const [selectedOption, setSelectedOption] = useState(value ? options.find((item) => item.value == value) : null)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const selectContainerRef = useRef(null)
    const searchInputRef = useRef(null)
    const optionsContainerRef = useRef(null)

    useEffect(() => {
        if (value) {
            setSelectedOption(options.find((option) => option.value == value) || null)
        }
    }, [value, options])

    const filteredOptions = options.filter((option) => {
        const label = option.label?.toLowerCase()
        const searchQueryLower = searchQuery?.toLowerCase()
        return label?.includes(searchQueryLower) || option.value.toString()?.includes(searchQueryLower)
    })

    const toggleOptions = () => {
        setShowOptions(!showOptions)
        setSelectedIndex(-1)
        if (!showOptions) {
            setTimeout(() => {
                searchInputRef.current.focus()
            }, 0)
            document.addEventListener("click", handleOutsideClick)
        } else {
            document.removeEventListener("click", handleOutsideClick)
        }
    }

    const selectOption = (option) => {
        setSelectedOption(option)
        setShowOptions(false)
        onSelect(option.value)
        setSelectedIndex(-1)
        document.removeEventListener("click", handleOutsideClick)
    }

    const selectNextOption = () => {
        if (selectedIndex < filteredOptions.length - 1) {
            setSelectedIndex((prevIndex) => prevIndex + 1)
            scrollToOption()
        }
    }

    const selectPreviousOption = () => {
        if (selectedIndex > 0) {
            setSelectedIndex((prevIndex) => prevIndex - 1)
            scrollToOption()
        }
    }

    const selectCurrentOption = () => {
        if (filteredOptions.length > 0 && selectedIndex >= 0) {
            selectOption(filteredOptions[selectedIndex])
        }
    }

    const handleOutsideClick = (event) => {
        if (!selectContainerRef.current || !selectContainerRef.current.contains(event.target)) {
            setShowOptions(false)
            document.removeEventListener("click", handleOutsideClick)
        }
    }

    const scrollToOption = () => {
        if (optionsContainerRef.current && optionsContainerRef.current.children.length) {
            const option = optionsContainerRef.current.children[selectedIndex]
            const containerRect = optionsContainerRef.current.getBoundingClientRect()
            const optionRect = option.getBoundingClientRect()

            if (optionRect.top < containerRect.top) {
                optionsContainerRef.current.scrollTop -= containerRect.top - optionRect.top
            } else if (optionRect.bottom > containerRect.bottom) {
                optionsContainerRef.current.scrollTop += optionRect.bottom - containerRect.bottom
            }
        }
    }

    return (
        <div className="custom-select" ref={selectContainerRef}>
            <div className="selected-option" tabIndex="0" onClick={toggleOptions}>
                {selectedOption ? selectedOption.label : placeholder}
                <i className={`arrow-icon ${showOptions ? "up" : "down"}`}></i>
            </div>
            {showOptions && (
                <div className="options-container">
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "ArrowUp") {
                                selectPreviousOption()
                            } else if (e.key === "ArrowDown") {
                                selectNextOption()
                            } else if (e.key === "Enter") {
                                selectCurrentOption()
                            }
                        }}
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                        placeholder="Search..."
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div className="options-container-option" ref={optionsContainerRef}>
                        {filteredOptions.map((option, index) => (
                            <div
                                key={option.value}
                                className={`option ${index === selectedIndex ? "selected" : ""} ${
                                    selectedOption?.value === option.value ? "defaultSelect" : ""
                                }`}
                                onClick={() => selectOption(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                        {filteredOptions.length === 0 && <div className="no-options">No options found</div>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default CustomSelect
