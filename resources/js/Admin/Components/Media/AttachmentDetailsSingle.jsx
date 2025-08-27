import moment from "moment"
import humanReadableSize from "@/Admin/Utils/humanReadableSize"
import { useState } from "react"

export default function AttachmentDetailsSingle({ file, onDeleted }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
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

    const handleDelete = async () => {
        if (window.confirm("Do you want to delete this attachment?")) {
            setIsDeleting(true)
            const res = await axios.delete(route("admin.media.destroy", file))
            setIsDeleting(false)
            if (res.data) {
                onDeleted(file)
            }
        }
    }

    const handleCopyUrl = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(file.full_url)
                .then(() => {
                    setIsCopied(true)
                    setTimeout(() => setIsCopied(false), 2000) // Reset the copied state after 2 seconds
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err)
                })
        } else {
            // Fallback for browsers that do not support Clipboard API
            const textArea = document.createElement("textarea")
            textArea.value = file.full_url
            textArea.style.position = "fixed" // Avoid scrolling to bottom
            textArea.style.left = "-99999px" // Position the text area off-screen
            document.body.appendChild(textArea)
            textArea.select()
            try {
                document.execCommand("copy")
                setIsCopied(true)
                setTimeout(() => setIsCopied(false), 2000) // Reset the copied state after 2 seconds
            } catch (err) {
                console.error("Fallback: Oops, unable to copy", err)
            }
            document.body.removeChild(textArea)
        }
    }

    let previewElement = null
    if (isImage()) {
        previewElement = <img draggable={false} src={file.media_url} alt="" />
    } else if (isVideo()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/video.png" alt="" />
            </div>
        )
    } else if (isPdf()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/document.png" alt="" />
            </div>
        )
    } else if (isCode()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/code.png" alt="" />
            </div>
        )
    } else if (isText()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/text.png" alt="" />
            </div>
        )
    } else if (isZip()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/archive.png" alt="" />
            </div>
        )
    } else if (isAudio()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/audio.png" alt="" />
            </div>
        )
    } else if (isSpreadsheet()) {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/spreadsheet.png" alt="" />
            </div>
        )
    } else {
        previewElement = (
            <div className="icon-preview">
                <img src="/static/images/media/default.png" alt="" />
            </div>
        )
    }

    return (
        <>
            <h4>ATTACHMENT DETAILS</h4>
            <div className="single-preview-wrap">
                <div className="preview-box">{previewElement}</div>
                <div className="preview-details">
                    <p>
                        <b>File name:</b> {file.title}
                    </p>
                    <p>
                        <b>Uploaded on:</b> {moment(file.created_at).format("ll")}
                    </p>
                    <p>
                        <b>File size:</b> {humanReadableSize(file.size)}
                    </p>
                    <p>
                        <b>Dimensions:</b> {file.dimensions}
                    </p>
                    <p className="copy-url" onClick={handleCopyUrl}>
                        Copy URL {isCopied && <span>Copied!</span>}
                    </p>
                    {!isDeleting ? (
                        <p className="text-danger delete-media" onClick={handleDelete}>
                            Delete permanently
                        </p>
                    ) : (
                        <p className="text-danger">Deleting...</p>
                    )}
                </div>
            </div>
        </>
    )
}
