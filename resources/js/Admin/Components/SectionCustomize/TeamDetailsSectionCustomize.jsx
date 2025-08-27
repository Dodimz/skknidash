import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { produce } from "immer"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function TeamDetailsSectionCustomize({ index }) {
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

    // Remove Job
    const removeJob = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.social_list = draft.social_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Job
    const cloneJob = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.social_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.social_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Job
    const addNewJob = () => {
        setData(
            produce((draft) => {
                draft.social_list.push({
                    social_icon_class: "",
                    social_action_url: ""
                })
                setOpenIndex(draft.social_list.length - 1)
            })
        )
    }

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Member Image (805x920 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.member_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.member_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.member_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Member Name</label>
                    <input
                        type="text"
                        value={data.member_name}
                        onChange={(e) => setData({ ...data, member_name: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Member Designation</label>
                    <input
                        className="form-control"
                        value={data.member_designation}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_designation: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Member Designation</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.member_details}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_details: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        value={data.member_email}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_email: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        className="form-control"
                        value={data.member_phone_number}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_phone_number: e.target.value
                            })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Social Links Heading</label>
                    <input
                        className="form-control"
                        value={data.member_social_links_title}
                        onChange={(e) =>
                            setData({
                                ...data,
                                member_social_links_title: e.target.value
                            })
                        }
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Social List</label>
                    <div className="cs_loop_list_in">
                        {data.social_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.social_title ? item.social_title : "Social Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneJob(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.social_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeJob(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Social Icon</label>
                                            <input
                                                type="text"
                                                value={item.social_icon_class}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.social_list[index].social_icon_class = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Action URL</label>
                                            <input
                                                type="text"
                                                value={item.social_action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.social_list[index].social_action_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewJob}>
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
                member_image_url: sectionData?.data?.member_image_url ?? "",
                member_name: sectionData?.data?.member_name ?? "",
                member_designation: sectionData?.data?.member_designation ?? "",
                member_details: sectionData?.data?.member_details ?? "",
                member_email: sectionData?.data?.member_email ?? "",
                member_phone_number: sectionData?.data?.member_phone_number ?? "",
                member_social_links_title: sectionData?.data?.member_social_links_title ?? "",
                social_list: sectionData?.data?.social_list ?? [
                    {
                        social_icon_class: "",
                        social_action_url: ""
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
                                Team Details Style {data.layout}
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
                                            <img src={`/static/sections/team_details/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Team Details Style {value}</label>
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
