import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { produce } from "immer"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function EventScheduleSectionCustomize({ index }) {
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

    // List Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Event
    const removeEvent = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.event_list = draft.event_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Event
    const cloneEvent = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.event_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.event_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Event
    const addNewEvent = () => {
        setData(
            produce((draft) => {
                draft.event_list.push({
                    event_title: "",
                    event_details: "",
                    event_time: "",
                    event_serial_number: "",
                    event_action_text: "",
                    event_action_url: "",
                    event_image_url: ""
                })
                setOpenIndex(draft.event_list.length - 1)
            })
        )
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
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Event List</label>
                    <div className="cs_loop_list_in">
                        {data.event_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.event_title ? item.event_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneEvent(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.event_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeEvent(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Serial Number</label>
                                            <input
                                                type="text"
                                                value={item.event_serial_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_serial_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.event_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Title</label>
                                            <input
                                                type="text"
                                                value={item.event_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Details</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                value={item.event_details}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_details = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Event Time</label>
                                            <input
                                                type="text"
                                                value={item.event_time}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.event_list[index].event_time = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="row row_space_10">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Action Text</label>
                                                    <input
                                                        type="text"
                                                        value={item.event_action_text}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.event_list[index].event_action_text = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Action URL</label>
                                                    <input
                                                        type="text"
                                                        value={item.event_action_url}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.event_list[index].event_action_url = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewEvent}>
                                Add new
                            </button>
                        </div>
                    </div>
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
                event_list: sectionData?.data?.event_list ?? [
                    {
                        event_title: "",
                        event_details: "",
                        event_time: "",
                        event_serial_number: "",
                        event_action_text: "",
                        event_action_url: "",
                        event_image_url: ""
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
                                Section Style {data.layout}
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
                                            <img src={`/static/sections/event_schedule/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Event Schedule Style {value}</label>
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
