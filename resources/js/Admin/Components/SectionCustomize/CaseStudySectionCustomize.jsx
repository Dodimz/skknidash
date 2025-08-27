import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { produce } from "immer"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { usePage } from "@inertiajs/react"
import { useRef } from "react"

export default function CaseStudySectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [caseStudies, setCaseStudies] = useState([])
    const { case_studies } = usePage().props
    const dropdownRef = useRef(null)

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

    // Remove Casestudy
    const removeCasestudy = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.casestudy_list = draft.casestudy_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Casestudy
    const cloneCasestudy = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.casestudy_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.casestudy_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Casestudy
    const addNewCasestudy = () => {
        setData(
            produce((draft) => {
                draft.casestudy_list.push({
                    casestudy_title: "",
                    casestudy_subtitle: "",
                    casestudy_image_url: "",
                    casestudy_btn_text: "",
                    casestudy_btn_url: "",
                    youtube_video_url: "",
                    link_type: "normal_link"
                })
                setOpenIndex(draft.casestudy_list.length - 1)
            })
        )
    }

    useEffect(() => {
        setCaseStudies(case_studies?.data)
    }, [])

    const filteredCaseStudies = case_studies?.data?.filter((study) => study.text.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleCaseStudySelect = (url, caseStudyIndex) => {
        setData(
            produce((draft) => {
                draft.casestudy_list[caseStudyIndex].casestudy_btn_url = url
            })
        )
        setSavedLinkToggle(false)
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSavedLinkToggle(false)
            }
        }

        if (savedLinkToggle) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [savedLinkToggle])

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
                <div className="form-group">
                    <label>Section Button Text</label>
                    <input
                        type="text"
                        value={data.section_btn_text}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_text: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Button Url</label>
                    <input
                        type="text"
                        value={data.section_btn_url}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_url: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Casestudy List</label>
                    <div className="cs_loop_list_in">
                        {data.casestudy_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.casestudy_title ? item.casestudy_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneCasestudy(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.casestudy_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeCasestudy(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Casestudy Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.casestudy_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Title</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="cs_radio_tab_wrap">
                                            <div className="cs_radio_tab_head">
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="normal_link"
                                                        checked={item.link_type === "normal_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">Normal Link</span>
                                                </span>
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="youtube_link"
                                                        checked={item.link_type === "youtube_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">YouTube Link</span>
                                                </span>
                                            </div>
                                            <div className="cs_radio_tab_body">
                                                {item.link_type === "normal_link" && (
                                                    <div className="row row_space_10">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label>Button Text</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.casestudy_btn_text}
                                                                    onChange={(e) => {
                                                                        setData(
                                                                            produce((draft) => {
                                                                                draft.casestudy_list[index].casestudy_btn_text = e.target.value
                                                                            })
                                                                        )
                                                                    }}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group m-0">
                                                                <label>Button URL</label>
                                                                <div className="cs_link_options_wrap">
                                                                    <input
                                                                        type="text"
                                                                        value={item.casestudy_btn_url}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.casestudy_list[index].casestudy_btn_url = e.target.value
                                                                                })
                                                                            )
                                                                        }}
                                                                        className="form-control"
                                                                    />
                                                                    <div className="cs_link_options">
                                                                        <span
                                                                            className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                                            onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                                        >
                                                                            <Icon icon="lucide:link" width="16" height="16" />
                                                                            <span>All Case Study</span>
                                                                        </span>
                                                                    </div>
                                                                    {savedLinkToggle && (
                                                                        <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                                            <input
                                                                                type="text"
                                                                                className="cs_saved_links_search"
                                                                                placeholder="Search..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />
                                                                            <div className="cs_saved_links">
                                                                                {filteredCaseStudies.length === 0 ? (
                                                                                    <span>No case studies found</span>
                                                                                ) : (
                                                                                    filteredCaseStudies.map((study, idx) => (
                                                                                        <span
                                                                                            key={idx}
                                                                                            className={
                                                                                                item.casestudy_btn_url === study.url ? "active" : ""
                                                                                            }
                                                                                            onClick={() => handleCaseStudySelect(study.url, index)}
                                                                                        >
                                                                                            {study.text}
                                                                                        </span>
                                                                                    ))
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.link_type === "youtube_link" && (
                                                    <div className="form-group">
                                                        <label>YouTube Video Link</label>
                                                        <input
                                                            type="text"
                                                            value={item.youtube_video_url}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.casestudy_list[index].youtube_video_url = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {data.casestudy_list.length < 3 ? (
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewCasestudy}>
                                    Add new
                                </button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "2") {
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
                <div className="form-group">
                    <label>Section Button Text</label>
                    <input
                        type="text"
                        value={data.section_btn_text}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_text: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Button Url</label>
                    <input
                        type="text"
                        value={data.section_btn_url}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_url: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Casestudy List</label>
                    <div className="cs_loop_list_in">
                        {data.casestudy_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.casestudy_title ? item.casestudy_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneCasestudy(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.casestudy_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeCasestudy(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Casestudy Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.casestudy_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Title</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="cs_radio_tab_wrap">
                                            <div className="cs_radio_tab_head">
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="normal_link"
                                                        checked={item.link_type === "normal_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">Normal Link</span>
                                                </span>
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="youtube_link"
                                                        checked={item.link_type === "youtube_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">YouTube Link</span>
                                                </span>
                                            </div>
                                            <div className="cs_radio_tab_body">
                                                {item.link_type === "normal_link" && (
                                                    <div className="row row_space_10">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label>Button Text</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.casestudy_btn_text}
                                                                    onChange={(e) => {
                                                                        setData(
                                                                            produce((draft) => {
                                                                                draft.casestudy_list[index].casestudy_btn_text = e.target.value
                                                                            })
                                                                        )
                                                                    }}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group m-0">
                                                                <label>Button URL</label>
                                                                <div className="cs_link_options_wrap">
                                                                    <input
                                                                        type="text"
                                                                        value={item.casestudy_btn_url}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.casestudy_list[index].casestudy_btn_url = e.target.value
                                                                                })
                                                                            )
                                                                        }}
                                                                        className="form-control"
                                                                    />
                                                                    <div className="cs_link_options">
                                                                        <span
                                                                            className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                                            onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                                        >
                                                                            <Icon icon="lucide:link" width="16" height="16" />
                                                                            <span>All Case Study</span>
                                                                        </span>
                                                                    </div>
                                                                    {savedLinkToggle && (
                                                                        <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                                            <input
                                                                                type="text"
                                                                                className="cs_saved_links_search"
                                                                                placeholder="Search..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />
                                                                            <div className="cs_saved_links">
                                                                                {filteredCaseStudies.length === 0 ? (
                                                                                    <span>No case studies found</span>
                                                                                ) : (
                                                                                    filteredCaseStudies.map((study, idx) => (
                                                                                        <span
                                                                                            key={idx}
                                                                                            className={
                                                                                                item.casestudy_btn_url === study.url ? "active" : ""
                                                                                            }
                                                                                            onClick={() => handleCaseStudySelect(study.url, index)}
                                                                                        >
                                                                                            {study.text}
                                                                                        </span>
                                                                                    ))
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.link_type === "youtube_link" && (
                                                    <div className="form-group">
                                                        <label>YouTube Video Link</label>
                                                        <input
                                                            type="text"
                                                            value={item.youtube_video_url}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.casestudy_list[index].youtube_video_url = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewCasestudy}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "3") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Marquee Text</label>
                    <input
                        type="text"
                        value={data.marquee_text}
                        onChange={(e) => setData({ ...data, marquee_text: e.target.value })}
                        className="form-control"
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
                <div className="form-group">
                    <label>Section Button Text</label>
                    <input
                        type="text"
                        value={data.section_btn_text}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_text: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Section Button Url</label>
                    <input
                        type="text"
                        value={data.section_btn_url}
                        onChange={(e) =>
                            setData({
                                ...data,
                                section_btn_url: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Casestudy List</label>
                    <div className="cs_loop_list_in">
                        {data.casestudy_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.casestudy_title ? item.casestudy_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneCasestudy(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.casestudy_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeCasestudy(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Casestudy Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.casestudy_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Title</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="cs_radio_tab_wrap">
                                            <div className="cs_radio_tab_head">
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="normal_link"
                                                        checked={item.link_type === "normal_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">Normal Link</span>
                                                </span>
                                                <span className="cs_radio_tab_item">
                                                    <input
                                                        type="radio"
                                                        name={`link_type_${index}`}
                                                        value="youtube_link"
                                                        checked={item.link_type === "youtube_link"}
                                                        onChange={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.casestudy_list[index].link_type = e.target.value
                                                                })
                                                            )
                                                        }}
                                                        className="form-check-input"
                                                    />
                                                    <span className="cs_radio_tab_item_in">YouTube Link</span>
                                                </span>
                                            </div>
                                            <div className="cs_radio_tab_body">
                                                {item.link_type === "normal_link" && (
                                                    <div className="row row_space_10">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label>Button Text</label>
                                                                <input
                                                                    type="text"
                                                                    value={item.casestudy_btn_text}
                                                                    onChange={(e) => {
                                                                        setData(
                                                                            produce((draft) => {
                                                                                draft.casestudy_list[index].casestudy_btn_text = e.target.value
                                                                            })
                                                                        )
                                                                    }}
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12">
                                                            <div className="form-group m-0">
                                                                <label>Button URL</label>
                                                                <div className="cs_link_options_wrap">
                                                                    <input
                                                                        type="text"
                                                                        value={item.casestudy_btn_url}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                produce((draft) => {
                                                                                    draft.casestudy_list[index].casestudy_btn_url = e.target.value
                                                                                })
                                                                            )
                                                                        }}
                                                                        className="form-control"
                                                                    />
                                                                    <div className="cs_link_options">
                                                                        <span
                                                                            className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                                            onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                                        >
                                                                            <Icon icon="lucide:link" width="16" height="16" />
                                                                            <span>All Case Study</span>
                                                                        </span>
                                                                    </div>
                                                                    {savedLinkToggle && (
                                                                        <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                                            <input
                                                                                type="text"
                                                                                className="cs_saved_links_search"
                                                                                placeholder="Search..."
                                                                                value={searchTerm}
                                                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                                            />
                                                                            <div className="cs_saved_links">
                                                                                {filteredCaseStudies.length === 0 ? (
                                                                                    <span>No case studies found</span>
                                                                                ) : (
                                                                                    filteredCaseStudies.map((study, idx) => (
                                                                                        <span
                                                                                            key={idx}
                                                                                            className={
                                                                                                item.casestudy_btn_url === study.url ? "active" : ""
                                                                                            }
                                                                                            onClick={() => handleCaseStudySelect(study.url, index)}
                                                                                        >
                                                                                            {study.text}
                                                                                        </span>
                                                                                    ))
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {item.link_type === "youtube_link" && (
                                                    <div className="form-group">
                                                        <label>YouTube Video Link</label>
                                                        <input
                                                            type="text"
                                                            value={item.youtube_video_url}
                                                            onChange={(e) => {
                                                                setData(
                                                                    produce((draft) => {
                                                                        draft.casestudy_list[index].youtube_video_url = e.target.value
                                                                    })
                                                                )
                                                            }}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewCasestudy}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Casestudy List</label>
                    <div className="cs_loop_list_in">
                        {data.casestudy_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.casestudy_title ? item.casestudy_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneCasestudy(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.casestudy_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeCasestudy(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Casestudy Image (1920x1000 px)</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.casestudy_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Title</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Subtitle</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Button Text</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_btn_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_btn_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group m-0">
                                            <label>Button URL</label>
                                            <div className="cs_link_options_wrap">
                                                <input
                                                    type="text"
                                                    value={item.casestudy_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.casestudy_list[index].casestudy_btn_url = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                                <div className="cs_link_options">
                                                    <span
                                                        className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                        onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                    >
                                                        <Icon icon="lucide:link" width="16" height="16" />
                                                        <span>All Case Study</span>
                                                    </span>
                                                </div>
                                                {savedLinkToggle && (
                                                    <div className="cs_saved_links_dropdown" ref={dropdownRef}>
                                                        <input
                                                            type="text"
                                                            className="cs_saved_links_search"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                        <div className="cs_saved_links">
                                                            {filteredCaseStudies.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredCaseStudies.map((study, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.casestudy_btn_url === study.url ? "active" : ""}
                                                                        onClick={() => handleCaseStudySelect(study.url, index)}
                                                                    >
                                                                        {study.text}
                                                                    </span>
                                                                ))
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="cs_loop_list_btn">
                            <button className="btn btn-sm btn-primary" onClick={addNewCasestudy}>
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
                section_btn_text: sectionData?.data?.section_btn_text ?? "",
                section_btn_url: sectionData?.data?.section_btn_url ?? "",
                marquee_text: sectionData?.data?.marquee_text ?? "",
                casestudy_list: sectionData?.data?.casestudy_list ?? [
                    {
                        casestudy_title: "",
                        casestudy_subtitle: "",
                        casestudy_image_url: "",
                        casestudy_btn_text: "",
                        casestudy_btn_url: "",
                        youtube_video_url: "",
                        link_type: "normal_link"
                    }
                ],
                action_text: sectionData?.data?.action_text ?? "",
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
                                Casestudy Style {data.layout}
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
                                            <img src={`/static/sections/casestudy/casestudy_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Casestudy Style {value}</label>
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
