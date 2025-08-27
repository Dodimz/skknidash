import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { produce } from "immer"
import { useDispatch, useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { useRef } from "react"
import { usePage } from "@inertiajs/react"

export default function ServiceSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [caseStudies, setCaseStudies] = useState([])
    const { services } = usePage().props
    const dropdownRef = useRef(null)

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }

    // Service Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Service
    const removeService = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.service_list = draft.service_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Service
    const cloneService = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.service_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.service_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Service
    const addNewService = () => {
        setData(
            produce((draft) => {
                draft.service_list.push({
                    service_number: "",
                    service_image_url: "",
                    service_title: "",
                    service_subtitle: "",
                    service_btn_url: "",
                    service_btn_text: ""
                })
                setOpenIndex(draft.service_list.length - 1)
            })
        )
    }

    useEffect(() => {
        setCaseStudies(services?.data)
    }, [])

    const filteredServices = services?.data?.filter((service) => service.text.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleServiceSelect = (url, serviceIndex) => {
        setData(
            produce((draft) => {
                draft.service_list[serviceIndex].service_btn_url = url
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
                    <label>Section Description</label>
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
                <div className="row row_space_10">
                    <div className="col-lg-6">
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
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Section Button URL</label>
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
                    </div>
                </div>
                <div className="cs_loop_list">
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Thumbnail</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.service_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Serial Number</label>
                                            <input
                                                type="text"
                                                value={item.service_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.service_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="form-group m-0">
                                            <label>Button URL</label>
                                            <div className="cs_link_options_wrap">
                                                <input
                                                    type="text"
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
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
                <div className="row row_space_10">
                    <div className="col-lg-6">
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
                    </div>
                    <div className="col-lg-6">
                        <div className="form-group">
                            <label>Section Button URL</label>
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
                    </div>
                </div>
                <div className="cs_loop_list">
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Slider image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.service_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.service_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Button Text</label>
                                            <input
                                                type="text"
                                                value={item.service_btn_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_btn_text = e.target.value
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
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
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
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Slider image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.service_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.service_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Button Text</label>
                                            <input
                                                type="text"
                                                value={item.service_btn_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_btn_text = e.target.value
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
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
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
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (705x680 px)</label>
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
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
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
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "5") {
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
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
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
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "6") {
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
                    <label>Service List</label>
                    <div className="cs_loop_list_in">
                        {data.service_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.service_title ? item.service_title : "Service Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneService(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.service_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeService(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Slider image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.service_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Title</label>
                                            <input
                                                type="text"
                                                value={item.service_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Service Subtitle</label>
                                            <textarea
                                                cols="30"
                                                rows="10"
                                                className="form-control"
                                                value={item.service_subtitle}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_subtitle = e.target.value
                                                        })
                                                    )
                                                }}
                                            ></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label>Button Text</label>
                                            <input
                                                type="text"
                                                value={item.service_btn_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.service_list[index].service_btn_text = e.target.value
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
                                                    value={item.service_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.service_list[index].service_btn_url = e.target.value
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
                                                        <span>All Services</span>
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
                                                            {filteredServices.length === 0 ? (
                                                                <span>No case studies found</span>
                                                            ) : (
                                                                filteredServices.map((service, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.service_btn_url === service.url ? "active" : ""}
                                                                        onClick={() => handleServiceSelect(service.url, index)}
                                                                    >
                                                                        {service.text}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewService}>
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
                section_btn_text: sectionData?.data?.section_btn_text ?? "",
                section_btn_url: sectionData?.data?.section_btn_url ?? "",
                pagination_style: sectionData?.data?.pagination_style ?? "pagination_2",
                service_list: sectionData?.data?.service_list ?? [
                    {
                        service_number: "",
                        service_image_url: "",
                        service_title: "",
                        service_subtitle: "",
                        service_btn_url: "",
                        service_btn_text: ""
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
                                Service Style {data.layout}
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
                                            <img src={`/static/sections/service/service_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Service Style {value}</label>
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
