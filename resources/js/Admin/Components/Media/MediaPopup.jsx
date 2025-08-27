import "./media.scss"
import { IonIcon, IonSpinner } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import { useEffect, useRef, useState } from "react"
import MediaLibrarySingleFile from "@/Admin/Components/Media/MediaLibrarySingleFile"
import axios from "axios"
import { produce } from "immer"
import AttachmentDetailsSingle from "@/Admin/Components/Media/AttachmentDetailsSingle"
import translate from "@/utils/translate"

export default function MediaPopup({ multiple = true, type = "", onInsert, isShow, setIsShow, actionButtonText, defaultMedia }) {
    const fileRef = useRef()
    const [dragging, setDragging] = useState(false)
    const [selectedTab, setSelectedTab] = useState("media_library")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [filteredMonthYear, setFilteredMonthYear] = useState([])
    const [mediaFile, setMediaFile] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [totalData, setTotalData] = useState(0)
    const [isLoadMore, setIsLoadMore] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [filteredQuery, setFilteredQuery] = useState({
        date: "",
        type: type
    })

    const onDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(true)
    }

    const onDragEnter = (e) => {
        e.preventDefault()
        e.preventDefault()
        setDragging(true)
    }

    const onDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragging(false)
    }

    const onDrop = (e) => {
        e.preventDefault()
        e.preventDefault()
        setDragging(false)
        const files = Array.from(e.dataTransfer.files)
        setSelectedTab("media_library")
        setMediaFile(
            produce((draft) => {
                draft.unshift(...files)
            })
        )
        // Handle file upload logic here
    }

    const handleFileSelect = (e) => {
        const files = e.target.files
        setMediaFile(
            produce((draft) => {
                draft.unshift(...files)
            })
        )
        setSelectedTab("media_library")
    }

    const getMediaFiles = async () => {
        const res = await axios.get(
            route("admin.media.index", {
                page: currentPage,
                search: searchQuery,
                filter: filteredQuery
            })
        )
        setMediaFile((draft) => {
            return produce(draft, (newDraft) => {
                newDraft.push(...res.data.data)
            })
        })
        setTotalData(res.data.total)
        return true
    }

    const handleSearch = async () => {
        const res = await axios.get(
            route("admin.media.index", {
                page: currentPage,
                search: searchQuery,
                filter: filteredQuery
            })
        )
        setMediaFile(res.data.data)
        setTotalData(res.data.total)
        return true
    }

    const handleMediaUploaded = (media, index) => {
        setMediaFile(
            produce((draft) => {
                draft[index] = media
            })
        )
    }

    const isFileExists = (file) => {
        return selectedFiles.includes(file)
    }

    const handleSelectedFile = (file) => {
        if (multiple) {
            // Check if the file is already selected
            const isSelected = selectedFiles.includes(file)

            // If the file is not selected, add it to the selectedFiles array
            if (!isSelected) {
                setSelectedFiles([...selectedFiles, file])
            } else {
                // If the file is already selected, remove it from the selectedFiles array
                setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile !== file))
            }
        } else {
            const isSelected = selectedFiles.includes(file)
            if (isSelected) {
                setSelectedFiles([])
            } else {
                setSelectedFiles([file])
            }
        }
    }

    const onDeleted = (file) => {
        const filteredSelectedFile = selectedFiles.filter((s) => s.id !== file.id)
        setSelectedFiles(filteredSelectedFile)

        const filteredMediaFile = mediaFile.filter((m) => m.id !== file.id)
        setMediaFile(filteredMediaFile)
    }

    const handleOnInterImage = () => {
        onInsert(selectedFiles)
        setSelectedFiles([])
        setIsShow(false)
    }

    useEffect(() => {
        const init = async () => {
            if (currentPage === 1) {
                setIsLoading(true)
            } else {
                setIsLoadMore(true)
            }
            await getMediaFiles()
            setIsLoading(false)
            setIsLoadMore(false)
        }
        init()
    }, [currentPage])

    useEffect(() => {
        const init = async () => {
            setMediaFile([])
            setSelectedFiles([])
            setIsLoading(true)
            await handleSearch()
            setIsLoading(false)
        }
        init()
    }, [searchQuery, filteredQuery])

    useEffect(() => {
        const init = async () => {
            const res = await axios.get(route("admin.media.filtered.month.year"))
            setFilteredMonthYear(res.data)
        }
        init()
    }, [])

    useEffect(() => {
        const selected = mediaFile.filter((m) => defaultMedia.includes(m.media_url))
        setSelectedFiles(selected)
    }, [defaultMedia, mediaFile])

    return (
        isShow && (
            <>
                <div className="media-uploader" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onDragEnter={onDragEnter}>
                    <div className="media-uploader-wrap">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center card-header-content">
                                    <div>{translate("Media Uploader")}</div>
                                    {actionButtonText && (
                                        <div onClick={() => setIsShow(false)}>
                                            <IonIcon icon={closeOutline} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${selectedTab === "uploaded_file" && "active"}`}
                                        onClick={() => setSelectedTab("uploaded_file")}
                                    >
                                        {translate("Uploaded File")}
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className={`nav-link ${selectedTab === "media_library" && "active"}`}
                                        onClick={() => setSelectedTab("media_library")}
                                    >
                                        {translate("Media Library")}
                                    </button>
                                </li>
                            </ul>
                            <div className="card-body">
                                {selectedTab === "uploaded_file" ? (
                                    <div className="upload-file">
                                        <div className="upload-file-wrap">
                                            <div className="upload-file-wrap-in">
                                                <h3>{translate("Drop files to upload")}</h3>
                                                <span>Or</span>
                                                <button className="btn btn-outline-primary" type="button" onClick={() => fileRef.current?.click()}>
                                                    {translate("Select File")}
                                                </button>
                                                <span className="mt-2">{translate("Maximum upload file size: 128 MB.")}</span>
                                            </div>
                                        </div>
                                        <input ref={fileRef} type="file" multiple onChange={handleFileSelect} hidden />
                                    </div>
                                ) : (
                                    <div className="media-library">
                                        <div className="media-library-wrap">
                                            <div className="row">
                                                <div className="col-xl-10 col-lg-9 col-sm-8 media-library-left">
                                                    <div className="media-library-header d-flex justify-content-between">
                                                        <div className="media-library-header-left">
                                                            <h4>{translate("Filter media")}</h4>
                                                            <div className="media-library-header-left-input">
                                                                <select
                                                                    name=""
                                                                    defaultValue={filteredQuery.type}
                                                                    id=""
                                                                    onChange={(e) =>
                                                                        setFilteredQuery(
                                                                            produce((draft) => {
                                                                                draft.type = e.target.value
                                                                            })
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">All</option>
                                                                    <option value="images">Images</option>
                                                                    <option value="video">Videos</option>
                                                                    <option value="audio">Audio</option>
                                                                    <option value="pdf">PDF</option>
                                                                    <option value="text">Text</option>
                                                                    <option value="code">Code</option>
                                                                    <option value="zip">ZIP</option>
                                                                    <option value="spreadsheet">Spreadsheet</option>
                                                                </select>
                                                                <select
                                                                    name=""
                                                                    id=""
                                                                    onChange={(e) =>
                                                                        setFilteredQuery(
                                                                            produce((draft) => {
                                                                                draft.date = e.target.value
                                                                            })
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="">All Dates</option>
                                                                    {filteredMonthYear.map((f, index) => (
                                                                        <option key={`fil-${index}`} value={f}>
                                                                            {f}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="media-library-header-right">
                                                            <h4>{translate("Search")}</h4>
                                                            <div className="media-library-header-right-input">
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => {
                                                                        setSearchQuery(e.target.value)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media-library-body">
                                                        <div className="media-library-files">
                                                            {mediaFile?.map((f, index) => {
                                                                let isFile = false
                                                                if (f instanceof File) {
                                                                    isFile = true
                                                                }
                                                                // is this file is selected
                                                                const isSelected = isFileExists(f)
                                                                return (
                                                                    <MediaLibrarySingleFile
                                                                        key={index}
                                                                        file={f}
                                                                        index={index}
                                                                        isFile={isFile}
                                                                        fileUploaded={handleMediaUploaded}
                                                                        onSelectImage={handleSelectedFile}
                                                                        isSelected={isSelected}
                                                                    />
                                                                )
                                                            })}
                                                        </div>
                                                        {loading && (
                                                            <div className="media-loading">
                                                                <div className="media-loading-wrap">
                                                                    <IonSpinner name="circles" />
                                                                    <span>{translate("Loading")}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {!mediaFile.length && (
                                                            <div className="media-loading">
                                                                <div className="media-loading-wrap">
                                                                    <span>{translate("No data available")}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {mediaFile.length < totalData && (
                                                        <div className="load-more pt-3 text-center">
                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-primary"
                                                                disabled={isLoadMore}
                                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                            >
                                                                {isLoadMore ? (
                                                                    <>
                                                                        {translate("Please wait")}{" "}
                                                                        <IonSpinner
                                                                            style={{
                                                                                width: "14px",
                                                                                height: "14px"
                                                                            }}
                                                                            name="crescent"
                                                                        />
                                                                    </>
                                                                ) : (
                                                                    translate("Load More")
                                                                )}
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-sm-4">
                                                    <div className="media-details">
                                                        <div className="media-details-wrap">
                                                            {selectedFiles.map((file, index) => (
                                                                <AttachmentDetailsSingle key={index} file={file} onDeleted={onDeleted} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {actionButtonText && (
                                <div className="card-footer text-right">
                                    <button className="btn btn-sm btn-success" onClick={handleOnInterImage} disabled={!selectedFiles.length}>
                                        {actionButtonText}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    {dragging && (
                        <div className="dragging-overlay">
                            <div className="dragging-overlay-wrap">
                                <h2 style={{ position: "absolute" }}>{translate("Drop file to upload")}</h2>
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    )
}
