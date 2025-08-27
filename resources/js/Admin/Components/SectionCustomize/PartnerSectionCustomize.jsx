import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function PartnerSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [toggleSwitch, setToggleSwitch] = useState(false)

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

    // Remove Partner
    const removePartner = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.partner_list = draft.partner_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Partner
    const clonePartner = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.partner_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.partner_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Partner
    const addNewPartner = () => {
        setData(
            produce((draft) => {
                draft.partner_list.push({
                    partner_image_url: ""
                })
                setOpenIndex(draft.partner_list.length - 1)
            })
        )
    }

    // conditional rendering
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
                <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                    <label>Partner List</label>
                    <div className="cs_loop_list_in">
                        {data.partner_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>Brand Item</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => clonePartner(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.partner_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removePartner(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <label>Partner Image</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.partner_list[index].partner_image_url = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.partner_list[index].partner_image_url = ""
                                                    })
                                                )
                                            }
                                            defaultValue={item.partner_image_url}
                                            size_sm
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewPartner}>
                                Add new
                            </button>
                        </div>
                    </div>
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
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="cs_loop_list" style={{ marginBottom: "15px" }}>
                    <label>Partner List</label>
                    <div className="cs_loop_list_in">
                        {data.partner_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>Brand Item</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => clonePartner(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.partner_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removePartner(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <label>Partner Image</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.partner_list[index].partner_image_url = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.partner_list[index].partner_image_url = ""
                                                    })
                                                )
                                            }
                                            defaultValue={item.partner_image_url}
                                            size_sm
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewPartner}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                        Reverse Animation:
                        <div
                            className={`yoo-switch ${toggleSwitch ? "active" : ""}`}
                            onClick={() => {
                                setToggleSwitch(!toggleSwitch)
                                setData({
                                    ...data,
                                    animation_direction: !toggleSwitch
                                })
                            }}
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
                pagination_style: sectionData?.data?.pagination_style ?? "pagination_0",
                animation_direction: sectionData?.data?.animation_direction ?? false,
                partner_list: sectionData?.data?.partner_list ?? [
                    {
                        partner_image_url: ""
                    }
                ]
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
                                Partners Style {data.layout}
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
                                            <img src={`/static/sections/partners/partners_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Partners Style {value}</label>
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
