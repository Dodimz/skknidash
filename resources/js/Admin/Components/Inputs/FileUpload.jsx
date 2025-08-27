import React, { useEffect, useRef, useState } from "react"
import "./FileUoload.css"
import { IonIcon } from "@ionic/react"
import { trashOutline } from "ionicons/icons"

function FileUpload({ select, value = "" }) {
    const [highlight, setHighlight] = useState(false)
    const [file, setFile] = useState(null)
    const [previewImageUrl, setPreviewImageUrl] = useState(null)
    const inputRef = useRef(null)

    const handleDragOver = (e) => {
        e.preventDefault()
        setHighlight(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setHighlight(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setHighlight(false)
        const droppedFile = e.dataTransfer.files[0]
        select(droppedFile)
        setPreviewImageUrl(URL.createObjectURL(droppedFile))
    }

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0]
        setFile(selectedFile)
        setPreviewImageUrl(URL.createObjectURL(selectedFile))
    }

    const removeImage = (e) => {
        e.stopPropagation()
        setFile(null)
        setPreviewImageUrl("")
    }

    // callback file
    useEffect(() => {
        if (file) {
            select(file)
        }
    }, [file])

    useEffect(() => {
        setPreviewImageUrl(value)
    }, [value])

    return (
        <div>
            <div
                className={`upload-area ${highlight ? "highlight" : ""}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >
                {previewImageUrl ? (
                    <div className="image-preview">
                        <img src={previewImageUrl} className="preview-image" alt="Preview" />
                        <button onClick={removeImage} className="remove-button">
                            <IonIcon icon={trashOutline} />
                        </button>
                    </div>
                ) : (
                    <p>Drag and drop a file here or click to select a file</p>
                )}
                <input type="file" ref={inputRef} style={{ display: "none" }} onChange={handleFileInputChange} />
            </div>
        </div>
    )
}

export default FileUpload
