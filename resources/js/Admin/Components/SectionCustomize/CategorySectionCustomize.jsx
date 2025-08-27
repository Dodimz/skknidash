import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"
import { usePage } from "@inertiajs/react"

export default function CategorySectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { product_categories } = usePage().props;

    const filteredCategories = product_categories?.data?.filter((category) =>
        category?.text?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleCategorySelect = (url, categoryIndex) => {
        setData(
            produce((draft) => {
                draft.category_list[categoryIndex].category_btn_url = url;
            })
        );
        setSavedLinkToggle(false);
    };

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

    // Remove Category
    const removeCategory = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.category_list = draft.category_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Category
    const cloneCategory = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.category_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.category_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Category
    const addNewCategory = () => {
        setData(
            produce((draft) => {
                draft.category_list.push({
                    category_title: "",
                    category_subtitle: "",
                    category_image_url: "",
                    category_btn_text: "",
                    category_btn_url: ""
                })
                setOpenIndex(draft.category_list.length - 1)
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
                        type="text"
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
                    <label>Category List</label>
                    <div className="cs_loop_list_in">
                        {data.category_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.category_title ? item.category_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneCategory(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.category_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeCategory(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Category Image</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.category_list[index].category_image_url = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.category_list[index].category_image_url = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.category_image_url}
                                                size_sm
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Category Title</label>
                                            <input
                                                type="text"
                                                value={item.category_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.category_list[index].category_title = e.target.value
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
                                                value={item.category_btn_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.category_list[index].category_btn_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <div className="form-group">
                                            <label>Button URL</label>
                                            <input
                                                type="text"
                                                value={item.category_btn_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.category_list[index].category_btn_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div> */}

                                        <div className="form-group">
                                            <label>Button URL</label>
                                            <div className="cs_link_options_wrap">
                                                <input
                                                    type="text"
                                                    value={item.category_btn_url}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.category_list[index].category_btn_url = e.target.value;
                                                            })
                                                        );
                                                    }}
                                                    className="form-control"
                                                />
                                                <div className="cs_link_options">
                                                    <span
                                                        className={`cs_link_option_btn${savedLinkToggle ? " active" : ""}`}
                                                        onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                    >
                                                        <Icon icon="lucide:link" width="16" height="16" />
                                                        <span>All Product Categories</span> {/* Changed from "All Teams" */}
                                                    </span>
                                                </div>
                                                {savedLinkToggle && (
                                                    <div className="cs_saved_links_dropdown">
                                                        <input
                                                            type="text"
                                                            className="cs_saved_links_search"
                                                            placeholder="Search..."
                                                            value={searchTerm}
                                                            onChange={(e) => setSearchTerm(e.target.value)}
                                                        />
                                                        <div className="cs_saved_links">
                                                            {filteredCategories?.length === 0 ? (
                                                                <span>No category found</span>
                                                            ) : (
                                                                filteredCategories?.map((category, idx) => (
                                                                    <span
                                                                        key={idx}
                                                                        className={item.category_btn_url === category.url ? "active" : ""}
                                                                        onClick={() => handleCategorySelect(category.url, index)}
                                                                    >
                                                                        {category.text}
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
                        {data.category_list.length ? (
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewCategory}>
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
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                category_list: sectionData?.data?.category_list ?? [
                    {
                        category_title: "",
                        category_image_url: "",
                        category_btn_text: "",
                        category_btn_url: ""
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
                                Category Style {data.layout}
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
                                            <label htmlFor={`layout-${value}`}>About Style {value}</label>
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
