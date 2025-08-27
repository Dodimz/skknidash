import { IonIcon } from "@ionic/react"
import { trashOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import "./multiple-media-uploader.css"
import MediaPopup from "@/Admin/Components/Media/MediaPopup"

export default function MultipleMediaUploader({ onSelected, handleRemoved, defaultValue }) {
    const [previewImageUrls, setPreviewImageUrls] = useState(defaultValue || [])
    const [showUploaderPopup, setShowUploaderPopup] = useState(false)

    useEffect(() => {
        if (defaultValue) {
            setPreviewImageUrls(defaultValue)
        }
    }, [defaultValue])

    const removeImage = (index) => {
        const removedUrls = previewImageUrls.filter((_, i) => i !== index)
        setPreviewImageUrls(removedUrls)
        handleRemoved(removedUrls)
    }

    const handleInsert = (files) => {
        const newFiles = files.map((file) => file.media_url)
        setPreviewImageUrls((prevUrls) => [...prevUrls, ...newFiles])
        onSelected(newFiles)
    }

    return (
        <div>
            <div onClick={() => setShowUploaderPopup(true)} className="upload-area">
                <p>click here to select files</p>
            </div>
            <div className="upload-wrapper">
                {previewImageUrls.map((previewImageUrl, index) => (
                    <div className="multi-image-preview" key={index}>
                        <img src={previewImageUrl} className="multi-preview-image" alt="Preview" />
                        <button type="button" onClick={() => removeImage(index)} className="remove-button">
                            <IonIcon icon={trashOutline} />
                        </button>
                    </div>
                ))}
            </div>
            {showUploaderPopup && (
                <MediaPopup
                    type="images"
                    isShow={showUploaderPopup}
                    setIsShow={setShowUploaderPopup}
                    multiple={true}
                    actionButtonText="Insert Image"
                    defaultMedia={previewImageUrls}
                    onInsert={handleInsert}
                />
            )}
        </div>
    )
}
