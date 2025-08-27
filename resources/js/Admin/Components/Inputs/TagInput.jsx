import { useEffect, useRef, useState } from "react"
import "./TagInput.css"
import { closeOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { IonSpinner } from "@ionic/react"
import translate from "@/utils/translate"

export default function TagInput({ selectTag, value = [], ...props }) {
    const [isFocused, setIsFocused] = useState(false)
    const [tags, setTags] = useState(value)
    const [query, setQuery] = useState("")
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const inputRef = useRef()
    const [searchResult, setSearchResult] = useState([])
    const [openResultBox, setOpenResultBox] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
        if (searchResult.length) {
            setOpenResultBox(true)
        }
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault()
            addTagsFromInput()
        }
    }

    const addTagsFromInput = () => {
        const input = inputRef.current.value
        if (input) {
            const inputTags = input.split(",").map((tag) => tag.trim())
            const uniqueTags = inputTags.filter((tag) => !tags.includes(tag))
            setTags([...tags, ...uniqueTags])
            inputRef.current.value = ""
        }
    }

    const removeTag = (tag) => {
        const updatedTags = tags.filter((t) => t !== tag)
        setTags(updatedTags)
    }

    const inputClassName = isFocused || inputRef.current?.value ? "active1" : ""

    // handle search
    const handleSearch = (query) => {
        setIsSearchLoading(true)
        axios
            .get(route("admin.tags.search", { search: query }))
            .then((res) => {
                setSearchResult(res.data)
                if (res.data.length) {
                    setOpenResultBox(true)
                }
                setIsSearchLoading(false)
            })
            .catch((err) => {
                setIsSearchLoading(false)
            })
    }

    // select form search tag
    const selectFromSearch = (selectedTag) => {
        const inputTags = selectedTag.split(",").map((tag) => tag.trim())
        const uniqueTags = inputTags.filter((tag) => !tags.includes(tag))
        setTags([...tags, ...uniqueTags])
        setOpenResultBox(false)
    }

    // handle debounce
    useEffect(() => {
        const debounceId = setTimeout(() => {
            if (query) {
                handleSearch(query)
            }
        }, 400)

        return () => {
            clearTimeout(debounceId)
        }
    }, [query])

    // callback tag
    useEffect(() => {
        selectTag(tags)
    }, [tags])

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (openResultBox && !event.target.closest(".tags-area")) {
                setOpenResultBox(false)
            }
        }

        document.addEventListener("click", handleOutsideClick)

        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    }, [openResultBox])

    return (
        <>
            <div className="yoo-group-btn">
                <div className="pr-0 tags-area" style={{ flex: "1" }}>
                    <div className={`form-group level-up form-group-md ${inputClassName}`}>
                        <label htmlFor={props.id}>{props.title}</label>
                        <input
                            {...props}
                            ref={inputRef}
                            id={props.id}
                            className={`form-control ${props.error && "is-invalid"}`}
                            onFocus={handleFocus}
                            onChange={(e) => setQuery(e.target.value)}
                            onBlur={handleBlur}
                            onKeyPress={handleKeyPress}
                        />
                        {props.error && <div className="invalid-feedback">{props.error}</div>}
                        <span className="search-spinner" style={isSearchLoading ? { display: "block" } : { display: "none" }}>
                            <IonSpinner name="crescent"></IonSpinner>
                        </span>
                        {openResultBox && (
                            <div className="options-container-option tags-options-container">
                                {searchResult.map((tag) => (
                                    <div key={tag} className="option" onClick={() => selectFromSearch(tag)}>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="">
                    <button type="button" className="btn btn-light yoo-table-btn1" onClick={addTagsFromInput}>
                        {translate("Add")}
                    </button>
                </div>
            </div>

            <div>
                <span>{translate("Separate tags with commas")}</span>
                <div className="yoo-height-b10 yoo-height-lg-b10" />
                <div className="tag-container">
                    {tags.map((tag, index) => (
                        <div key={index}>
                            <span className="remove-tag-button" onClick={() => removeTag(tag)}>
                                <IonIcon icon={closeOutline} />
                            </span>
                            <span className="tag">{tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
