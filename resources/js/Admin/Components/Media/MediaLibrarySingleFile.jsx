import axios from "axios"
import { useEffect, useState } from "react"
import { IonIcon } from "@ionic/react"
import { checkmarkCircle } from "ionicons/icons"

export default function MediaLibrarySingleFile({ file, isFile, index, fileUploaded, onSelectImage, isSelected, removeFile }) {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadingPercentage, setUploadingPercentage] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")

    const setUploadedMediaToMainState = (media) => {
        fileUploaded(media, index)
    }

    const removedFromFile = () => {
        setTimeout(() => {
            removeFile(index)
        }, 300)
    }

    const uploadFile = async () => {
        const formData = new FormData()
        formData.append("file", file)
        setIsUploading(true)
        try {
            const res = await axios.post(route("admin.media.store"), formData, {
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    setUploadingPercentage(percentage)
                }
            })
            setIsUploading(false)
            setUploadedMediaToMainState(res.data)
        } catch (error) {
            console.error("Error uploading file:", error)
            setIsUploading(false)
        }
    }

    useEffect(() => {
        if (isFile) {
            uploadFile()
        }
    }, [isFile])

    const isImage = () => file.type.startsWith("image/")
    const isVideo = () => file.type.startsWith("video/")
    const isPdf = () => file.type === "application/pdf"
    const isZip = () => file.type === "application/zip"
    const isText = () => file.type.startsWith("text/")
    const isAudio = () => file.type.startsWith("audio/")
    const isSpreadsheet = () => {
        const spreadsheetExt = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.oasis.opendocument.spreadsheet",
            "application/vnd.ms-excel.sheet.macroenabled.12",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
        ]
        return spreadsheetExt.includes(file.type)
    }
    const isCode = () => {
        const codeExtensions = ["application/javascript", "application/json", "application/xml", "text/html", "text/css"]
        return codeExtensions.includes(file.type)
    }

    let previewElement = null
    if (isImage()) {
        previewElement = <img draggable={false} src={file.media_url} alt="" />
    } else if (isVideo()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/video.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isPdf()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/document.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isCode()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/code.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isText()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/text.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isZip()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/archive.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isAudio()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/audio.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else if (isSpreadsheet()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/spreadsheet.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    } else {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/default.png" alt="" />
                <div className="preview-file-name">
                    <p>{file.title}</p>
                </div>
            </div>
        )
    }

    return (
        <div
            title={file.title}
            className={`media-library-single-file ${isSelected ? "selected" : ""}`}
            onClick={() => {
                if (!isUploading) {
                    onSelectImage(file)
                }
            }}
        >
            {isUploading ? (
                <>
                    {!errorMessage ? (
                        <div className="uploading-progress">
                            <div className="progress-bar">
                                <div className="progress-done" style={{ width: uploadingPercentage }}></div>
                            </div>
                        </div>
                    ) : (
                        <p>{errorMessage}</p>
                    )}
                </>
            ) : (
                <>{previewElement}</>
            )}
            <div className="selected-mark">
                <IonIcon icon={checkmarkCircle} />
            </div>
        </div>
    )
}
