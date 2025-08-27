import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { produce } from "immer"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"
import { usePage } from "@inertiajs/react"
import { useRef } from "react"

export default function PortfolioSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setPortfolioSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statePortfolio, setStatePortfolio] = useState([])
    const { portfolios } = usePage().props
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

    // Remove Portfolio
    const removePortfolio = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.portfolio_list = draft.portfolio_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Portfolio
    const clonePortfolio = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.portfolio_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.portfolio_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Portfolio
    const addNewPortfolio = () => {
        setData(
            produce((draft) => {
                draft.portfolio_list.push({
                    portfolio_title: "",
                    portfolio_image_url: "",
                    action_url: "",
                    portfolio_category: ""
                })
                setOpenIndex(draft.portfolio_list.length - 1)
            })
        )
    }

    useEffect(() => {
        setStatePortfolio(portfolios?.data)
    }, [])

    const filteredPortfolios = portfolios?.data?.filter((study) => study.text.toLowerCase().includes(searchTerm.toLowerCase()))

    const handlePortfolioSelect = (url, portfolioIndex) => {
        setData(
            produce((draft) => {
                draft.portfolio_list[portfolioIndex].action_url = url
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
                    <label>Portfolio List</label>
                    <div className="cs_loop_list_in">
                        {data.portfolio_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.portfolio_title ? item.portfolio_title : "Portfolio Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => clonePortfolio(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.portfolio_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removePortfolio(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.portfolio_list[index].portfolio_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.portfolio_list[index].portfolio_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.portfolio_image_url}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <input
                                                type="text"
                                                value={item.portfolio_category}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.portfolio_list[index].portfolio_category = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                value={item.portfolio_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.portfolio_list[index].portfolio_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group m-0">
                                            <label>Action URL</label>
                                            <div className="cs_link_options_wrap">
                                                <input
                                                    type="text"
                                                    value={item.action_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.portfolio_list[index].action_url = e.target.value
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
                                                        <span>All Portfolios</span>
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
                                                            {filteredPortfolios.length === 0 ? (
                                                                <span>No portfolios found</span>
                                                            ) : (
                                                                filteredPortfolios.map((study, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.action_url === study.url ? "active" : ""}
                                                                        onClick={() => handlePortfolioSelect(study.url, index)}
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
                            <button className="btn btn-sm btn-primary" onClick={addNewPortfolio}>
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
                portfolio_list: sectionData?.data?.portfolio_list ?? [
                    {
                        portfolio_title: "",
                        portfolio_image_url: "",
                        action_url: "",
                        portfolio_category: ""
                    }
                ]
            })
        }
    }, [currentLang, sectionData, index])

    useEffect(() => {
        if (index) {
            setPortfolioSectionData(pageData[currentLang][index])
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
                                Portfolio Style {data.layout}
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
                                            <img src={`/static/sections/portfolio/style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Portfolio Style {value}</label>
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
