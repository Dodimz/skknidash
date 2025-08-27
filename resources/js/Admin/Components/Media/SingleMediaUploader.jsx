import { IonIcon } from "@ionic/react"
import { trashOutline } from "ionicons/icons"
import React, { useEffect, useState } from "react"
import "./single-media-uploader.css"
import MediaPopup from "@/Admin/Components/Media/MediaPopup"
import translate from "@/utils/translate"

export default function SingleMediaUploader({ onSelected, handleRemoved, defaultValue, size_sm }) {
    const [previewImageUrl, setPreviewImageUrl] = useState("")
    const [showUploaderPopup, setShowUploaderPopup] = useState(false)

    const removeImage = (e) => {
        e.stopPropagation()
        setPreviewImageUrl("")
        handleRemoved()
    }

    const handleInsert = (file) => {
        setPreviewImageUrl(file[0].media_url)
        onSelected(file[0].media_url)
    }

    useEffect(() => {
        setPreviewImageUrl(defaultValue)
    }, [defaultValue])

    return (
        <div>
            <div onClick={() => setShowUploaderPopup(true)} className={`upload-area${size_sm ? " upload-area-sm" : ""}`}>
                {previewImageUrl ? (
                    <div className="image-preview">
                        <img src={previewImageUrl} className="preview-image" alt="Preview" />
                        <button onClick={removeImage} className="remove-button">
                            <IonIcon icon={trashOutline} />
                        </button>
                    </div>
                ) : (
                    <p>{translate("click here to select a file")}</p>
                )}
            </div>
            {showUploaderPopup && (
                <MediaPopup
                    type="images"
                    isShow={showUploaderPopup}
                    setIsShow={setShowUploaderPopup}
                    multiple={false}
                    actionButtonText="Insert Image"
                    defaultMedia={[previewImageUrl]}
                    onInsert={handleInsert}
                />
            )}
        </div>
    )
}
