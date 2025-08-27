import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { produce } from "immer"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function HorizontalScrollSectionCustomize({ index }) {
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

    // Remove Slide
    const removeSlide = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.slide_list = draft.slide_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Slide
    const cloneSlide = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.slide_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.slide_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Slide
    const addNewSlide = () => {
        setData(
            produce((draft) => {
                draft.slide_list.push({
                    slide_type: "Hero",
                    background_image_url: "",
                    image_url: "",
                    section_title: "",
                    section_subtitle: "",
                    phone_number: "",
                    video_url: "",
                    action_text: "",
                    action_url: "",
                    action_text_2: "",
                    action_url_2: "",
                    inner_slide_list: [
                        {
                            inner_feature_title: "",
                            inner_feature_subtitle: "",
                            inner_feature_icon_url: "",
                            inner_feature_action_url: "",
                            avatar_name: "",
                            avatar_designation: "",
                            testimonial_text: "",
                            review_number: "",
                            testimonial_video_image_url: "",
                            testimonial_video_url: "",
                            funfact_number: "",
                            contact_title: "",
                            contact_description: "",
                            contact_info: "",
                            social_link_show: false
                        }
                    ]
                })
                setOpenIndex(draft.slide_list.length - 1)
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
                if (!draft.slide_list[featureIndex].inner_slide_list) {
                    draft.slide_list[featureIndex].inner_slide_list = []
                }
                draft.slide_list[featureIndex].inner_slide_list.push({
                    inner_feature_title: "",
                    inner_feature_subtitle: "",
                    inner_feature_icon_url: "",
                    inner_feature_action_url: "",
                    avatar_name: "",
                    avatar_designation: "",
                    testimonial_text: "",
                    review_number: "",
                    testimonial_video_image_url: "",
                    testimonial_video_url: "",
                    funfact_number: "",
                    contact_title: "",
                    contact_description: "",
                    contact_info: "",
                    social_link_show: false
                })
                setOpenIndex2(draft.slide_list[featureIndex].inner_slide_list.length - 1)
            })
        )
    }

    // Remove InnerFeature Button
    const removeInnerFeatureButton = (featureIndex, innerFeatureIndex) => {
        setData(
            produce((draft) => {
                draft.slide_list[featureIndex].inner_slide_list.splice(innerFeatureIndex, 1)
            })
        )
    }
    ////////////////////////////////

    // conditional render
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <div className="cs_loop_list">
                <label>Slide List</label>
                <div className="cs_loop_list_in">
                    {data.slide_list?.map((item, index) => (
                        <div className="cs_loop_item" key={index}>
                            <div className="cs_loop_item_head">
                                <span onClick={() => handleToggle(index)}>
                                    <span>{item.slide_type}</span>
                                </span>
                                <div className="cs_loop_item_control_btns">
                                    <button className="cs_clone_loop_item" onClick={() => cloneSlide(index)}>
                                        <Icon icon="lucide:copy" width="18" height="18" />
                                    </button>
                                    {data.slide_list.length === 1 ? (
                                        ""
                                    ) : (
                                        <button className="cs_remove_loop_item" onClick={() => removeSlide(index)}>
                                            <Icon icon="lucide:x" width="18" height="18" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {openIndex === index && (
                                <div className="cs_loop_item_body">
                                    <div className="form-group">
                                        <label>Slide Type</label>
                                        <select
                                            className="form-control"
                                            value={item.slide_type}
                                            onChange={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.slide_list[index].slide_type = e.target.value
                                                    })
                                                )
                                            }}
                                        >
                                            <option value="Hero">Hero</option>
                                            <option value="AditionalFeature">Aditional Feature</option>
                                            <option value="Service">Service</option>
                                            <option value="Testimonial">Testimonial</option>
                                            <option value="FunFact">FunFact</option>
                                            <option value="ContactInfo">Contact Info</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Background Image</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.slide_list[index].background_image_url = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.slide_list[index].background_image_url = ""
                                                    })
                                                )
                                            }
                                            defaultValue={item.background_image_url}
                                        />
                                    </div>
                                    {item.slide_type === "AditionalFeature" && (
                                        <div className="form-group">
                                            <label>Section Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slide_list[index].image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slide_list[index].image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.image_url}
                                            />
                                        </div>
                                    )}
                                    {!(item.slide_type === "Testimonial") && (
                                        <>
                                            <div className="form-group">
                                                <label>Section Title</label>
                                                <input
                                                    type="text"
                                                    value={item.section_title}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].section_title = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Section Subtitle</label>
                                                <textarea
                                                    cols="30"
                                                    rows="3"
                                                    value={item.section_subtitle}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].section_subtitle = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </>
                                    )}
                                    {item.slide_type === "Testimonial" && (
                                        <>
                                            <div className="form-group">
                                                <label>Video Background Image</label>
                                                <SingleMediaUploader
                                                    onSelected={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].image_url = e
                                                            })
                                                        )
                                                    }}
                                                    handleRemoved={() =>
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].image_url = ""
                                                            })
                                                        )
                                                    }
                                                    defaultValue={item.image_url}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>YouTube Video URL</label>
                                                <input
                                                    type="text"
                                                    value={item.video_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].video_url = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                        </>
                                    )}
                                    {item.slide_type === "Hero" && (
                                        <>
                                            <div className="form-group">
                                                <label>Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={item.phone_number}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.slide_list[index].phone_number = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <label
                                                style={{
                                                    borderBottom: "1px solid #dcdcde",
                                                    display: "block",
                                                    paddingBottom: "2px"
                                                }}
                                            >
                                                Action Button 1:
                                            </label>
                                            <div className="row row_space_10">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Text</label>
                                                        <input
                                                            type="text"
                                                            value={item.action_text}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.slide_list[index].action_text = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>URL</label>
                                                        <input
                                                            type="text"
                                                            value={item.action_url}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.slide_list[index].action_url = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <label
                                                style={{
                                                    borderBottom: "1px solid #dcdcde",
                                                    display: "block",
                                                    paddingBottom: "2px"
                                                }}
                                            >
                                                Action Button 2:
                                            </label>
                                            <div className="row row_space_10">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>Text</label>
                                                        <input
                                                            type="text"
                                                            value={item.action_text_2}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.slide_list[index].action_text_2 = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label>URL</label>
                                                        <input
                                                            type="text"
                                                            value={item.action_url_2}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.slide_list[index].action_url_2 = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {!(item.slide_type === "Hero") && (
                                        <div className="form-group">
                                            <label>List Items</label>
                                            <div className="cs_inner_feature_list">
                                                {item.inner_slide_list?.map((innerFeatureItem, innerFeatureIndex) => (
                                                    <div className="cs_inner_feature_item" key={innerFeatureIndex}>
                                                        <div className="cs_inner_feature_head">
                                                            <span
                                                                className="cs_inner_feature_head_title"
                                                                onClick={() => handleToggle2(innerFeatureIndex)}
                                                            >
                                                                <span>List Item</span>
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
                                                                {item.slide_type === "AditionalFeature" && (
                                                                    <div className="form-group">
                                                                        <label>Upload Icon</label>
                                                                        <SingleMediaUploader
                                                                            onSelected={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].inner_feature_icon_url = e
                                                                                    })
                                                                                )
                                                                            }}
                                                                            handleRemoved={() => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].inner_feature_icon_url = ""
                                                                                    })
                                                                                )
                                                                            }}
                                                                            defaultValue={innerFeatureItem.inner_feature_icon_url}
                                                                            size_sm
                                                                        />
                                                                    </div>
                                                                )}
                                                                {!(item.slide_type === "Testimonial" || item.slide_type === "ContactInfo") && (
                                                                    <div className="form-group">
                                                                        <label>Title</label>
                                                                        <input
                                                                            type="text"
                                                                            value={innerFeatureItem.inner_feature_title}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].inner_feature_title = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {item.slide_type === "Service" && (
                                                                    <div className="form-group">
                                                                        <label>Action URL</label>
                                                                        <input
                                                                            type="text"
                                                                            value={innerFeatureItem.inner_feature_action_url}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].inner_feature_action_url = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {item.slide_type === "AditionalFeature" && (
                                                                    <div className="form-group">
                                                                        <label>Subtitle</label>
                                                                        <input
                                                                            type="text"
                                                                            value={innerFeatureItem.inner_feature_subtitle}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].inner_feature_subtitle = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {item.slide_type === "Testimonial" && (
                                                                    <>
                                                                        <div className="form-group">
                                                                            <label>Avatar Name</label>
                                                                            <input
                                                                                type="text"
                                                                                value={innerFeatureItem.avatar_name}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].avatar_name = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Avatar Designation</label>
                                                                            <input
                                                                                type="text"
                                                                                value={innerFeatureItem.avatar_designation}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].avatar_designation = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Testimonial Text</label>
                                                                            <textarea
                                                                                cols="30"
                                                                                rows="10"
                                                                                className="form-control"
                                                                                value={innerFeatureItem.testimonial_text}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].testimonial_text = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                style={{
                                                                                    height: "100px"
                                                                                }}
                                                                            ></textarea>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Review Number (1 to 5)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={innerFeatureItem.review_number}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].review_number = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                                {item.slide_type === "FunFact" && (
                                                                    <div className="form-group">
                                                                        <label>FunFact Number</label>
                                                                        <input
                                                                            type="text"
                                                                            value={innerFeatureItem.funfact_number}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.slide_list[index].inner_slide_list[
                                                                                            innerFeatureIndex
                                                                                        ].funfact_number = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                )}
                                                                {item.slide_type === "ContactInfo" && (
                                                                    <>
                                                                        <div className="form-group">
                                                                            <label>Contact Title</label>
                                                                            <input
                                                                                type="text"
                                                                                value={innerFeatureItem.contact_title}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].contact_title = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Contact Description</label>
                                                                            <input
                                                                                type="text"
                                                                                value={innerFeatureItem.contact_description}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].contact_description = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Contact Info</label>
                                                                            <input
                                                                                type="text"
                                                                                value={innerFeatureItem.contact_info}
                                                                                onChange={(e) => {
                                                                                    setData(
                                                                                        produce((draft) => {
                                                                                            draft.slide_list[index].inner_slide_list[
                                                                                                innerFeatureIndex
                                                                                            ].contact_info = e.target.value
                                                                                        })
                                                                                    )
                                                                                }}
                                                                                className="form-control"
                                                                            />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label
                                                                                htmlFor=""
                                                                                style={{
                                                                                    display: "flex",
                                                                                    gap: "10px",
                                                                                    marginTop: "10px"
                                                                                }}
                                                                            >
                                                                                Show Social Links:
                                                                                <div
                                                                                    className={`yoo-switch ${
                                                                                        innerFeatureItem.social_link_show ? "active" : ""
                                                                                    }`}
                                                                                    onClick={() => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.slide_list[index].inner_slide_list[
                                                                                                    innerFeatureIndex
                                                                                                ].social_link_show =
                                                                                                    !draft.slide_list[index].inner_slide_list[
                                                                                                        innerFeatureIndex
                                                                                                    ].social_link_show
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                >
                                                                                    <div className="yoo-switch-in" />
                                                                                </div>
                                                                            </label>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                <div className="cs_inner_feature_add_btn text-center">
                                                    <button className="cs_add_btn_border" onClick={() => addNewInnerFeatureButton(index)}>
                                                        Add New Item
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="cs_loop_list_btn">
                        <button className="btn btn-sm btn-primary" onClick={addNewSlide}>
                            Add new
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                slide_list: sectionData?.data?.slide_list ?? [
                    {
                        slide_type: "Hero",
                        background_image_url: "",
                        image_url: "",
                        section_title: "",
                        section_subtitle: "",
                        phone_number: "",
                        video_url: "",
                        action_text: "",
                        action_url: "",
                        action_text_2: "",
                        action_url_2: "",
                        inner_slide_list: [
                            {
                                inner_feature_title: "",
                                inner_feature_subtitle: "",
                                inner_feature_icon_url: "",
                                inner_feature_action_url: "",
                                avatar_name: "",
                                avatar_designation: "",
                                testimonial_text: "",
                                review_number: "",
                                testimonial_video_image_url: "",
                                testimonial_video_url: "",
                                funfact_number: "",
                                contact_title: "",
                                contact_description: "",
                                contact_info: "",
                                social_link_show: false
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
                        {/* <div
                            className={`cs_design_layout_select ${
                                layout ? "active" : ""
                            }`}
                        >
                            <label>Design Layout</label>
                            <div
                                className="cs_design_layout_toggle_btn"
                                onClick={() => setLayout(!layout)}
                            >
                                Horizontal Scroll {data.layout}
                                <Icon
                                    icon="lucide:chevron-down"
                                    width="17"
                                    height="17"
                                />
                            </div>
                        </div> */}
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
                                            <img src={`/static/sections/job_listings/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Horizontal Scroll {value}</label>
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
