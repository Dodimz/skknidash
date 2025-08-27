import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { produce } from "immer"
import { Icon } from "@iconify/react"

export default function CTASectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [ctaSectionData, setCtaSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }
    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1920x770 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Action Button Text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => setData({ ...data, action_text: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action Button URL</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1296x580 px)</label>
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
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Action Button Text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => setData({ ...data, action_text: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action Button URL</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "3") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (460 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Image (230x200 px)</label>
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
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Action Button Text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => setData({ ...data, action_text: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action Button URL</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Action Button Text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => setData({ ...data, action_text: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action Button URL</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    }
    useEffect(() => {
        if (index) {
            setData({
                layout: ctaSectionData?.data?.layout ?? "1",
                title: ctaSectionData?.data?.title ?? "",
                background_image_url: ctaSectionData?.data?.background_image_url ?? "",
                image_url: ctaSectionData?.data?.image_url ?? "",
                action_text: ctaSectionData?.data?.action_text ?? "",
                action_url: ctaSectionData?.data?.action_url ?? ""
            })
        }
    }, [currentLang, ctaSectionData, index])

    useEffect(() => {
        if (index) {
            setCtaSectionData(pageData[currentLang][index])
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
                                CTA Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4"].map((value) => (
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
                                            <img src={`/static/sections/cta/cta_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>CTA Style {value}</label>
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
