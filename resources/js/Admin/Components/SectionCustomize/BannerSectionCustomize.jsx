import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"

export default function BannerSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
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
    if (data.layout === "1" || data.layout === "2" || data.layout === "3") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background Image</label>
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
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label title="Desktop">
                                Bnner Height <Icon icon="lucide:monitor" width="16" height="16" />
                            </label>
                            <div className="cs_input_group">
                                <input
                                    type="number"
                                    value={data.desktop_height}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            desktop_height: e.target.value
                                        })
                                    }
                                    className="form-control"
                                />
                                <span class="cs_input_group_text">PX</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-group">
                            <label title="Mobile">
                                Bnner Height <Icon icon="lucide:smartphone" width="16" height="16" />
                            </label>
                            <div className="cs_input_group">
                                <input
                                    type="number"
                                    value={data.mobile_height}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            mobile_height: e.target.value
                                        })
                                    }
                                    className="form-control"
                                />
                                <span class="cs_input_group_text">PX</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    ></textarea>
                </div>
            </>
        )
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Thumbnail Image (1920x550 px)</label>
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
                    <label>Animated Image (68x75 px)</label>
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
                        size_sm
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
            </>
        )
    } else if (data.layout === "5") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Thumbnail Image (1920x550 px)</label>
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
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
            </>
        )
    } else if (data.layout === "6") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Thumbnail Image (1296x540 px)</label>
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
                    <textarea
                        cols="30"
                        rows="12"
                        className="form-control"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.subtitle}
                        onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                    />
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                title: sectionData?.data?.title ?? "",
                subtitle: sectionData?.data?.subtitle ?? "",
                background_image_url: sectionData?.data?.background_image_url ?? "",
                image_url: sectionData?.data?.image_url ?? "",
                desktop_height: sectionData?.data?.desktop_height ?? "",
                mobile_height: sectionData?.data?.mobile_height ?? "",
                action_url: sectionData?.data?.action_url ?? ""
            })
        }
    }, [currentLang, sectionData, index])

    useEffect(() => {
        if (index) {
            setSectionData(pageData[currentLang][index])
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
                                Banner Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4", "5", "6"].map((value) => (
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
                                            <img src={`/static/sections/banner/banner_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Banner Style {value}</label>
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
