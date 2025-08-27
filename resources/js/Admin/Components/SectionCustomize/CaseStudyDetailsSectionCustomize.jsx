import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { produce } from "immer"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"
import Editor from "../Inputs/Editor"
import { usePage } from "@inertiajs/react"

export default function CaseStudyDetailsSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setPortfolioSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const { errors } = usePage().props

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }

    // List Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Gallery
    const removeGallery = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.gallery_list = draft.gallery_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Gallery
    const cloneGallery = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.gallery_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.gallery_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Gallery
    const addNewGallery = () => {
        setData(
            produce((draft) => {
                draft.gallery_list.push({
                    gallery_image_url: ""
                })
                setOpenIndex(draft.gallery_list.length - 1)
            })
        )
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Banner Background (1920x400 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.banner_bg_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.banner_bg_url = ""
                                })
                            )
                        }
                        defaultValue={data.banner_bg_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                            setData({
                                ...data,
                                title: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={(e) =>
                            setData({
                                ...data,
                                category: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Feature Image (736x1235 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.image_url = ""
                                })
                            )
                        }
                        defaultValue={data.image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Details</label>
                    <Editor
                        onChange={(e) =>
                            setData(
                                produce((draft) => {
                                    draft.text_editor_content = e
                                })
                            )
                        }
                        value={data.text_editor_content ?? ""}
                    />
                    {errors?.description && <span className="text-danger">{errors?.description}</span>}
                </div>
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) =>
                            setData({
                                ...data,
                                title: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Name</label>
                    <input
                        type="text"
                        value={data.avatar_name}
                        onChange={(e) =>
                            setData({
                                ...data,
                                avatar_name: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        value={data.category}
                        onChange={(e) =>
                            setData({
                                ...data,
                                category: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Post Date</label>
                    <input
                        type="text"
                        value={data.post_date}
                        onChange={(e) =>
                            setData({
                                ...data,
                                post_date: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 5
                    }}
                >
                    <label className="form-label">Banner Type</label>
                    <div className="cs_padding_toggle_btns">
                        <span
                            className={`cs_padding_toggle_btn${data.banner_type === "static" ? " active" : ""}`}
                            onClick={(e) =>
                                setData({
                                    ...data,
                                    banner_type: "static"
                                })
                            }
                        >
                            Static
                        </span>
                        <span
                            className={`cs_padding_toggle_btn${data.banner_type === "slider" ? " active" : ""}`}
                            onClick={(e) =>
                                setData({
                                    ...data,
                                    banner_type: "slider"
                                })
                            }
                        >
                            Slider
                        </span>
                        <span
                            className={`cs_padding_toggle_btn${data.banner_type === "video" ? " active" : ""}`}
                            onClick={(e) =>
                                setData({
                                    ...data,
                                    banner_type: "video"
                                })
                            }
                        >
                            Video
                        </span>
                    </div>
                </div>
                {data.banner_type === "static" && (
                    <div className="form-group">
                        <label>Feature Image (1300x550 px)</label>
                        <SingleMediaUploader
                            onSelected={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.image_url = e
                                    })
                                )
                            }}
                            handleRemoved={() =>
                                setData(
                                    produce((draft) => {
                                        draft.image_url = ""
                                    })
                                )
                            }
                            defaultValue={data.image_url}
                        />
                    </div>
                )}
                {data.banner_type === "slider" && (
                    <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                        <label>Gallery List</label>
                        <div className="cs_loop_list_in">
                            {data.gallery_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle(index)}>
                                            <span>Gallery Item</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneGallery(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.gallery_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeGallery(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Gallery Image</label>
                                                <SingleMediaUploader
                                                    onSelected={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.gallery_list[index].gallery_image_url = e
                                                            })
                                                        )
                                                    }}
                                                    handleRemoved={() =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.gallery_list[index].gallery_image_url = ""
                                                            })
                                                        )
                                                    }
                                                    defaultValue={item.gallery_image_url}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewGallery}>
                                    Add new
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {data.banner_type === "video" && (
                    <div className="form-group">
                        <label>YouTube Video ID</label>
                        <input
                            type="text"
                            value={data.youtube_id}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    youtube_id: e.target.value
                                })
                            }
                            className="form-control"
                        />
                    </div>
                )}
                <div className="form-group">
                    <label>Details</label>
                    <Editor
                        onChange={(e) =>
                            setData(
                                produce((draft) => {
                                    draft.text_editor_content = e
                                })
                            )
                        }
                        value={data.text_editor_content ?? ""}
                    />
                    {errors?.description && <span className="text-danger">{errors?.description}</span>}
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                title: sectionData?.data?.title ?? "",
                category: sectionData?.data?.category ?? "",
                post_date: sectionData?.data?.post_date ?? "",
                banner_bg_url: sectionData?.data?.banner_bg_url ?? "",
                banner_type: sectionData?.data?.banner_type ?? "static",
                avatar_name: sectionData?.data?.avatar_name ?? "",
                image_url: sectionData?.data?.image_url ?? "",
                youtube_id: sectionData?.data?.youtube_id ?? "",
                text_editor_content: sectionData?.data?.text_editor_content ?? "",
                gallery_list: sectionData?.data?.gallery_list ?? [
                    {
                        gallery_image_url: ""
                    }
                ]
            })
        }
    }, [currentLang, sectionData, index])

    useEffect(() => {
        if (index) {
            setPortfolioSectionData(pageData[currentLang][index])
        }
    }, [index, currentLang])

    useEffect(() => {
        if (Object.keys(data).length !== 0 && index) {
            dispatch(updatePageSection({ data, index }))
        }
    }, [data, index])

    useEffect(() => {
        if (index) {
            setAdvancedData(pageData[currentLang][index].advanced)
        }
    }, [index, currentLang, pageData])

    return (
        <>
            <div className="cs_tab_wrap">
                <span className={`cs_tab_item${tab === "general" ? " active" : ""}`} onClick={() => setTab("general")}>
                    <Icon icon="lucide:pencil" width="18" height="18" /> General
                </span>
                <span className={`cs_tab_item${tab === "advance" ? " active" : ""}`} onClick={() => setTab("advance")}>
                    <Icon icon="lucide:settings" width="18" height="18" />
                    Advance
                </span>
            </div>
            {tab === "general" ? (
                <>
                    <div className="cs_design_layout_box">
                        <div className={`cs_design_layout_select ${layout ? "active" : ""}`}>
                            <label>Design Layout</label>
                            <div className="cs_design_layout_toggle_btn" onClick={() => setLayout(!layout)}>
                                Case Study Details {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2"].map((value) => (
                                    <div key={value} className="cs_section_image" onClick={() => setLayout(!layout)}>
                                        <input
                                            type="radio"
                                            id={`layout-${value}`}
                                            name="layout"
                                            value={value}
                                            checked={data.layout === value}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    layout: e.target.value
                                                })
                                            }
                                            className="form-check-input"
                                        />
                                        <div className="cs_section_image_in">
                                            <img src={`/static/sections/case_study_details/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Case Study Details Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {customizer}
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
