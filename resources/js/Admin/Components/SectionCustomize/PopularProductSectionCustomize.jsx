import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"

export default function PopularProductSectionCustomize({ index }) {
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
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Section Title</label>
                    <input
                        type="text"
                        value={data.section_title}
                        onChange={(e) => setData({ ...data, section_title: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Subtitle</label>
                    <input
                        type="text"
                        value={data.section_subtitle}
                        onChange={(e) => setData({ ...data, section_subtitle: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action Button Text</label>
                    <input
                        type="text"
                        className="form-control"
                        value={data.action_text}
                        onChange={(e) =>
                            setData({
                                ...data,
                                action_text: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Cursor Pagination Style</label>
                    <select
                        className="form-control"
                        value={data.pagination_style}
                        onChange={(e) =>
                            setData({
                                ...data,
                                pagination_style: e.target.value
                            })
                        }
                    >
                        <option value="pagination_0">No Pagination</option>
                        <option value="pagination_1">Pagination Style 1</option>
                        <option value="pagination_2">Pagination Style 2</option>
                        <option value="pagination_3">Pagination Style 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Cursor Navigation Style</label>
                    <select
                        className="form-control"
                        value={data.navigation_style}
                        onChange={(e) =>
                            setData({
                                ...data,
                                navigation_style: e.target.value
                            })
                        }
                    >
                        <option value="navigation_0">No Navigation</option>
                        <option value="navigation_1">Navigation Style 1</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="editor-breadcamp-toggle-wrap">
                        Cursor Auto Play:
                        <div
                            className={`yoo-switch ${data.is_auto_play === true ? "active" : ""}`}
                            onClick={() =>
                                setData({
                                    ...data,
                                    is_auto_play: data.is_auto_play === false ? true : false
                                })
                            }
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                action_text: sectionData?.data?.action_text ?? "",
                pagination_style: sectionData?.data?.pagination_style ?? "pagination_1",
                navigation_style: sectionData?.data?.navigation_style ?? "navigation_1",
                is_auto_play: sectionData?.data?.is_auto_play ?? false
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
                                Popular Product S{data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1"].map((value) => (
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
                                            <img src={`/static/sections/category/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Popular Product Style {value}</label>
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
