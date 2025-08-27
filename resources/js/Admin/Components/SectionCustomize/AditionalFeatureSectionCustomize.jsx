import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch, useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function AditionalFeatureSectionCustomize({ index }) {
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

    // Remove Feature
    const removeFeature = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.feature_list = draft.feature_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Feature
    const cloneFeature = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.feature_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.feature_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Feature
    const addNewFeature = () => {
        setData(
            produce((draft) => {
                draft.feature_list.push({
                    feature_number: "",
                    feature_title: "",
                    feature_subtitle: "",
                    feature_image_url: "",
                    inner_feature_list: [
                        {
                            inner_feature_title: "",
                            inner_feature_subtitle: "",
                            inner_feature_icon_url: ""
                        }
                    ]
                })
                setOpenIndex(draft.feature_list.length - 1)
            })
        )
    }

    ////////////////////////////////
    // List Item Accordion
    const [openIndex2, setOpenIndex2] = useState(0)
    const handleToggle2 = (index) => {
        setOpenIndex2((prevIndex) => (prevIndex === index ? -1 : index))
    }
    // Add New InnerFeature Button
    const addNewInnerFeatureButton = (featureIndex) => {
        setData(
            produce((draft) => {
                if (!draft.feature_list[featureIndex].inner_feature_list) {
                    draft.feature_list[featureIndex].inner_feature_list = []
                }
                draft.feature_list[featureIndex].inner_feature_list.push({
                    inner_feature_title: "",
                    inner_feature_subtitle: "",
                    inner_feature_icon_url: ""
                })
            })
        )
    }

    // Remove InnerFeature Button
    const removeInnerFeatureButton = (featureIndex, innerFeatureIndex) => {
        setData(
            produce((draft) => {
                draft.feature_list[featureIndex].inner_feature_list.splice(innerFeatureIndex, 1)
            })
        )
    }
    ////////////////////////////////

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
                <div className="form-group">
                    <label>Section Subtitle</label>
                    <textarea
                        cols="30"
                        rows="3"
                        className="form-control"
                        value={data.section_subtitle}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                    ></textarea>
                </div>
                <div className="cs_loop_list">
                    <label>Feature List</label>
                    <div className="cs_loop_list_in">
                        {data.feature_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.feature_title ? item.feature_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneFeature(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.feature_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeFeature(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Feature image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.feature_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Feature Title</label>
                                            <input
                                                type="text"
                                                value={item.feature_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Feature Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.feature_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewFeature}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (710x625 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.section_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.section_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.section_image_url}
                    />
                </div>
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
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_subtitle: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Subtitle</label>
                    <textarea
                        cols="30"
                        rows="3"
                        className="form-control"
                        value={data.section_description}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_description: e.target.value
                            })
                        }
                    ></textarea>
                </div>
                <div className="cs_loop_list">
                    <label>Feature List</label>
                    <div className="cs_loop_list_in">
                        {data.feature_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.feature_title ? item.feature_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneFeature(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.feature_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeFeature(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Feature Icon</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.feature_image_url}
                                                size_sm
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Feature Title</label>
                                            <input
                                                type="text"
                                                value={item.feature_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Feature Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.feature_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewFeature}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "3" || data.layout === "4") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Feature Section List</label>
                    <div className="cs_loop_list_in">
                        {data.feature_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.feature_title ? item.feature_title : "Feature Section"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneFeature(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.feature_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeFeature(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Feature Title</label>
                                            <input
                                                type="text"
                                                value={item.feature_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        {data.layout === "3" && (
                                            <div className="form-group">
                                                <label>Feature Number</label>
                                                <input
                                                    type="text"
                                                    value={item.feature_number}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.feature_list[index].feature_number = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <label>Feature Thumbnail</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.feature_list[index].feature_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.feature_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Inner Feature List</label>
                                            <div className="cs_inner_feature_list">
                                                {item.inner_feature_list?.map((innerFeatureItem, innerFeatureIndex) => (
                                                    <div className="cs_inner_feature_item" key={innerFeatureIndex}>
                                                        <div className="cs_inner_feature_head">
                                                            <span
                                                                className="cs_inner_feature_head_title"
                                                                onClick={() => handleToggle2(innerFeatureIndex)}
                                                            >
                                                                <span>
                                                                    {innerFeatureItem.inner_feature_title
                                                                        ? innerFeatureItem.inner_feature_title
                                                                        : "Inner Feature Item"}
                                                                </span>
                                                            </span>
                                                            <span
                                                                className="cs_inner_feature_item_delete"
                                                                onClick={() => removeInnerFeatureButton(index, innerFeatureIndex)}
                                                            >
                                                                <Icon icon="lucide:trash" width="16" height="16" />
                                                            </span>
                                                        </div>
                                                        {openIndex2 === innerFeatureIndex && (
                                                            <div className="cs_inner_feature_body">
                                                                <div className="form-group">
                                                                    <label>Upload Icon</label>
                                                                    <SingleMediaUploader
                                                                        onSelected={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.feature_list[index].inner_feature_list[
                                                                                        innerFeatureIndex
                                                                                    ].inner_feature_icon_url = e
                                                                                })
                                                                            )
                                                                        }}
                                                                        handleRemoved={() => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.feature_list[index].inner_feature_list[
                                                                                        innerFeatureIndex
                                                                                    ].inner_feature_icon_url = ""
                                                                                })
                                                                            )
                                                                        }}
                                                                        defaultValue={innerFeatureItem.inner_feature_icon_url}
                                                                        size_sm
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Title</label>
                                                                    <input
                                                                        type="text"
                                                                        value={innerFeatureItem.inner_feature_title}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.feature_list[index].inner_feature_list[
                                                                                        innerFeatureIndex
                                                                                    ].inner_feature_title = e.target.value
                                                                                })
                                                                            )
                                                                        }}
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>Subtitle</label>
                                                                    <input
                                                                        type="text"
                                                                        value={innerFeatureItem.inner_feature_subtitle}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.feature_list[index].inner_feature_list[
                                                                                        innerFeatureIndex
                                                                                    ].inner_feature_subtitle = e.target.value
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
                                                <div className="cs_inner_feature_add_btn text-center">
                                                    <button className="cs_add_btn_border" onClick={() => addNewInnerFeatureButton(index)}>
                                                        Add New Feature
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewFeature}>
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
                section_description: sectionData?.data?.section_description ?? "",
                section_image_url: sectionData?.data?.section_image_url ?? "",
                feature_list: sectionData?.data?.feature_list ?? [
                    {
                        feature_number: "",
                        feature_title: "",
                        feature_subtitle: "",
                        feature_image_url: "",
                        inner_feature_list: [
                            {
                                inner_feature_title: "",
                                inner_feature_subtitle: "",
                                inner_feature_icon_url: ""
                            }
                        ]
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
                                Aditional Feature {data.layout}
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
                                            <img src={`/static/sections/aditional_feature/aditional_feature_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Aditional Feature {value}</label>
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
