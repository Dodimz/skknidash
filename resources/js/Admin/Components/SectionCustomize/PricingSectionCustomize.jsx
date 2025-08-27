import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { usePage } from "@inertiajs/react"
import { useRef } from "react"

export default function PricingSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const [layout, setLayout] = useState(false)
    const [savedLinkToggle, setSavedLinkToggle] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [statePricingPlan, setStatePricingPlan] = useState([])
    const { pricing_plans } = usePage().props
    const dropdownRef = useRef(null)

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }

    // Add this state near the top of your component
    const [openFeatureIndex, setOpenFeatureIndex] = useState(0)

    // Function to handle toggling feature items
    const handleFeatureToggle = (index) => {
        setOpenFeatureIndex((prevIndex) => (prevIndex === index ? 0 : index))
    }

    // List Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Remove Funfact
    const removeFunfact = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.pricing_list = draft.pricing_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Funfact
    const cloneFunfact = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.pricing_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.pricing_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Funfact
    const addNewFunfact = () => {
        setData(
            produce((draft) => {
                draft.pricing_list.push({
                    package_type: "",
                    package_list: [
                        {
                            package_name: "",
                            package_icon_url: "",
                            package_feature: [
                                {
                                    package_feature_text: "",
                                    package_feature_icon_url: ""
                                }
                            ],
                            package_price: "",
                            package_per: "",
                            package_btn_text: "",
                            package_btn_url: ""
                        }
                    ]
                })
                setOpenIndex(draft.pricing_list?.length - 1)
            })
        )
    }

    //////////////////////////////////////////////////
    // List Item Accordion
    const [openIndex2, setOpenIndex2] = useState(0)
    const handleToggle2 = (index) => {
        setOpenIndex2((prevIndex) => (prevIndex === index ? -1 : index))
    }
    // Fixed addNewInnerFeatureButton function
    const addNewInnerFeatureButton = (pricingIndex) => {
        setData(
            produce((draft) => {
                if (!draft.pricing_list[pricingIndex].package_list) {
                    draft.pricing_list[pricingIndex].package_list = []
                }
                draft.pricing_list[pricingIndex].package_list.push({
                    package_name: "",
                    package_icon_url: "",
                    package_feature: [
                        {
                            package_feature_text: "",
                            package_feature_icon_url: ""
                        }
                    ],
                    package_price: "",
                    package_per: "",
                    package_btn_text: "",
                    package_btn_url: ""
                })
            })
        )
        const newFeatureIndex = data.pricing_list[pricingIndex].package_list.length
        setOpenIndex2(newFeatureIndex)
    }

    // Remove InnerFeature Button
    const removeInnerFeatureButton = (pricingIndex, packageIndex) => {
        setData(
            produce((draft) => {
                // Remove the package_list item at the specified index
                draft.pricing_list[pricingIndex].package_list.splice(packageIndex, 1)
            })
        )
    }
    //////////////////////////////////////////////////
    // Add New Package Feature
    const addNewPackageFeature = (pricingIndex, packageIndex) => {
        setData(
            produce((draft) => {
                if (!draft.pricing_list[pricingIndex].package_list[packageIndex].package_feature) {
                    draft.pricing_list[pricingIndex].package_list[packageIndex].package_feature = []
                }
                draft.pricing_list[pricingIndex].package_list[packageIndex].package_feature.push({
                    package_feature_text: "",
                    package_feature_icon_url: ""
                })
            })
            // setOpenFeatureIndex(draft.pricing_list.length - 1);
        )
        const newFeatureIndex = data.pricing_list[pricingIndex].package_list[packageIndex].package_feature.length
        setOpenFeatureIndex(newFeatureIndex)
    }

    // Remove Package Feature
    const removePackageFeature = (pricingIndex, packageIndex, featureIndex) => {
        setData(
            produce((draft) => {
                draft.pricing_list[pricingIndex].package_list[packageIndex].package_feature.splice(featureIndex, 1)
            })
        )
    }

    useEffect(() => {
        setStatePricingPlan(pricing_plans?.data)
    }, [])

    const filteredPricingPlans = pricing_plans?.data?.filter((plan) => plan.text.toLowerCase().includes(searchTerm.toLowerCase()))

    const handlePricingPlanSelect = (url, packageIndex) => {
        setData(
            produce((draft) => {
                draft.pricing_list[openIndex].package_list[packageIndex].package_btn_url = url
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

    // Fixed initial useEffect data structure
    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                section_description: sectionData?.data?.section_description ?? "",
                pricing_list: sectionData?.data?.pricing_list ?? [
                    {
                        package_type: "",
                        package_list: [
                            {
                                package_name: "",
                                package_icon_url: "",
                                package_feature: [
                                    {
                                        package_feature_text: "",
                                        package_feature_icon_url: ""
                                    }
                                ],
                                package_price: "",
                                package_per: "",
                                package_btn_text: "",
                                package_btn_url: ""
                            }
                        ]
                    }
                ]
            })

            // Open the first feature item by default
            if (sectionData?.data?.pricing_list?.[0]?.package_list?.[0]?.package_feature?.length > 0) {
                setOpenFeatureIndex(0)
            }
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
                                Pricing Style {data.layout}
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
                                            <img src={`/static/sections/pricing/pricing_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Pricing Style {value}</label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Section Layout Desition */}
                    <div className="form-group">
                        <label>Section Title</label>
                        <input
                            type="text"
                            value={data.section_title}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    section_title: e.target.value
                                })
                            }
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
                    {data.layout === "1" && (
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
                    )}
                    <div className="cs_loop_list cs_style_1">
                        <label>Pricing Table</label>
                        <div className="cs_loop_list_in">
                            {data.pricing_list?.map((item, index) => (
                                <div className="cs_loop_item" key={index}>
                                    <div className="cs_loop_item_head">
                                        <span onClick={() => handleToggle(index)}>
                                            <span>{item.package_type ? item.package_type : "Package Items"}</span>
                                        </span>
                                        <div className="cs_loop_item_control_btns">
                                            <button className="cs_clone_loop_item" onClick={() => cloneFunfact(index)}>
                                                <Icon icon="lucide:copy" width="18" height="18" />
                                            </button>
                                            {data.pricing_list.length === 1 ? (
                                                ""
                                            ) : (
                                                <button className="cs_remove_loop_item" onClick={() => removeFunfact(index)}>
                                                    <Icon icon="lucide:x" width="18" height="18" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {openIndex === index && (
                                        <div className="cs_loop_item_body">
                                            <div className="form-group">
                                                <label>Package Type</label>
                                                <input
                                                    type="text"
                                                    value={item.package_type}
                                                    onChange={(e) => {
                                                        setData(
                                                            produce((draft) => {
                                                                draft.pricing_list[index].package_type = e.target.value
                                                            })
                                                        )
                                                    }}
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Package List</label>
                                                <div className="cs_inner_feature_list">
                                                    {item.package_list?.map((packageFeatureItem, packageFeatureIndex) => (
                                                        <div className="cs_inner_feature_item cs_type_1" key={packageFeatureIndex}>
                                                            <div className="cs_inner_feature_head">
                                                                <span
                                                                    className="cs_inner_feature_head_title"
                                                                    onClick={() => handleToggle2(packageFeatureIndex)}
                                                                >
                                                                    <span>
                                                                        {packageFeatureItem.package_name
                                                                            ? packageFeatureItem.package_name
                                                                            : "Package"}
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="cs_inner_feature_item_delete"
                                                                    onClick={() => removeInnerFeatureButton(index, packageFeatureIndex)}
                                                                >
                                                                    <Icon icon="lucide:trash" width="16" height="16" />
                                                                </span>
                                                            </div>
                                                            {openIndex2 === packageFeatureIndex && (
                                                                <div className="cs_inner_feature_body">
                                                                    {/* Existing fields for package details */}
                                                                    <div className="form-group">
                                                                        <label>Upload Package Icon</label>
                                                                        <SingleMediaUploader
                                                                            onSelected={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.pricing_list[index].package_list[
                                                                                            packageFeatureIndex
                                                                                        ].package_icon_url = e
                                                                                    })
                                                                                )
                                                                            }}
                                                                            handleRemoved={() => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.pricing_list[index].package_list[
                                                                                            packageFeatureIndex
                                                                                        ].package_icon_url = ""
                                                                                    })
                                                                                )
                                                                            }}
                                                                            defaultValue={
                                                                                item.package_list[packageFeatureIndex]?.package_icon_url || ""
                                                                            }
                                                                            size_sm
                                                                        />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Package Name</label>
                                                                        <input
                                                                            type="text"
                                                                            value={packageFeatureItem.package_name}
                                                                            onChange={(e) => {
                                                                                setData(
                                                                                    produce((draft) => {
                                                                                        draft.pricing_list[index].package_list[
                                                                                            packageFeatureIndex
                                                                                        ].package_name = e.target.value
                                                                                    })
                                                                                )
                                                                            }}
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                    <div className="row row_space_10">
                                                                        <div className="col-sm-6">
                                                                            <div className="form-group">
                                                                                <label>Package Price</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={packageFeatureItem.package_price}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.pricing_list[index].package_list[
                                                                                                    packageFeatureIndex
                                                                                                ].package_price = e.target.value
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <div className="form-group">
                                                                                <label>Package Per</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={packageFeatureItem.package_per}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.pricing_list[index].package_list[
                                                                                                    packageFeatureIndex
                                                                                                ].package_per = e.target.value
                                                                                            })
                                                                                        )
                                                                                    }}
                                                                                    className="form-control"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Package Feature Fields */}
                                                                    <label>Feature List</label>
                                                                    <div
                                                                        className="cs_inner_feature_list"
                                                                        style={{
                                                                            marginBottom: "10px"
                                                                        }}
                                                                    >
                                                                        {packageFeatureItem.package_feature?.map((feature, featureIndex) => (
                                                                            <div className="cs_inner_feature_item" key={featureIndex}>
                                                                                <div className="cs_inner_feature_head">
                                                                                    <span
                                                                                        className="cs_inner_feature_head_title"
                                                                                        onClick={() => handleFeatureToggle(featureIndex)}
                                                                                    >
                                                                                        <span>{feature.package_feature_text || "Feature"}</span>
                                                                                    </span>
                                                                                    <span
                                                                                        className="cs_inner_feature_item_delete"
                                                                                        onClick={() =>
                                                                                            removePackageFeature(
                                                                                                index,
                                                                                                packageFeatureIndex,
                                                                                                featureIndex
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <Icon icon="lucide:trash" width="16" height="16" />
                                                                                    </span>
                                                                                </div>
                                                                                {openFeatureIndex === featureIndex && (
                                                                                    <div className="cs_inner_feature_body">
                                                                                        <div className="form-group">
                                                                                            <label>Feature Text</label>
                                                                                            <input
                                                                                                type="text"
                                                                                                value={feature.package_feature_text}
                                                                                                onChange={(e) => {
                                                                                                    setData(
                                                                                                        produce((draft) => {
                                                                                                            draft.pricing_list[index].package_list[
                                                                                                                packageFeatureIndex
                                                                                                            ].package_feature[
                                                                                                                featureIndex
                                                                                                            ].package_feature_text = e.target.value
                                                                                                        })
                                                                                                    )
                                                                                                }}
                                                                                                className="form-control"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="form-group">
                                                                                            <label>Upload Feature Icon</label>
                                                                                            <SingleMediaUploader
                                                                                                onSelected={(e) => {
                                                                                                    setData(
                                                                                                        produce((draft) => {
                                                                                                            draft.pricing_list[index].package_list[
                                                                                                                packageFeatureIndex
                                                                                                            ].package_feature[
                                                                                                                featureIndex
                                                                                                            ].package_feature_icon_url = e // Corrected
                                                                                                        })
                                                                                                    )
                                                                                                }}
                                                                                                handleRemoved={() => {
                                                                                                    setData(
                                                                                                        produce((draft) => {
                                                                                                            draft.pricing_list[index].package_list[
                                                                                                                packageFeatureIndex
                                                                                                            ].package_feature[
                                                                                                                featureIndex
                                                                                                            ].package_feature_icon_url = "" // Corrected
                                                                                                        })
                                                                                                    )
                                                                                                }}
                                                                                                defaultValue={
                                                                                                    item.package_list[packageFeatureIndex]
                                                                                                        .package_feature[featureIndex]
                                                                                                        ?.package_feature_icon_url || "" // Corrected
                                                                                                }
                                                                                                size_sm
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                        <div className="cs_inner_feature_add_btn text-center">
                                                                            <button
                                                                                className="cs_add_btn_border"
                                                                                onClick={() => addNewPackageFeature(index, packageFeatureIndex)}
                                                                            >
                                                                                Add New Feature
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row row_space_10">
                                                                        <div className="col-sm-12">
                                                                            <div className="form-group">
                                                                                <label>Button Text</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={packageFeatureItem.package_btn_text}
                                                                                    onChange={(e) => {
                                                                                        setData(
                                                                                            produce((draft) => {
                                                                                                draft.pricing_list[index].package_list[
                                                                                                    packageFeatureIndex
                                                                                                ].package_btn_text = e.target.value
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
                                                                                        value={packageFeatureItem.package_btn_url}
                                                                                        onChange={(e) => {
                                                                                            setData(
                                                                                                produce((draft) => {
                                                                                                    draft.pricing_list[index].package_list[
                                                                                                        packageFeatureIndex
                                                                                                    ].package_btn_url = e.target.value
                                                                                                })
                                                                                            )
                                                                                        }}
                                                                                        className="form-control"
                                                                                    />
                                                                                    <div className="cs_link_options">
                                                                                        <span
                                                                                            className={`cs_link_option_btn${savedLinkToggle ? " active" : ""
                                                                                                }`}
                                                                                            onClick={() => setSavedLinkToggle(!savedLinkToggle)}
                                                                                        >
                                                                                            <Icon icon="lucide:link" width="16" height="16" />
                                                                                            <span>All Pricing Plans</span>
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
                                                                                                {filteredPricingPlans.length === 0 ? (
                                                                                                    <span>No pricing plans found</span>
                                                                                                ) : (
                                                                                                    filteredPricingPlans.map((plan, idx) => (
                                                                                                        <span
                                                                                                            key={idx}
                                                                                                            className={
                                                                                                                packageFeatureItem.package_btn_url ===
                                                                                                                    plan.url
                                                                                                                    ? "active"
                                                                                                                    : ""
                                                                                                            }
                                                                                                            onClick={() => handlePricingPlanSelect(plan.url, packageFeatureIndex)}
                                                                                                        >
                                                                                                            {plan?.text}, {plan?.price},{" "}
                                                                                                            {plan?.duration}
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
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    <div className="cs_inner_feature_add_btn text-center">
                                                        <button className="cs_add_btn_border" onClick={() => addNewInnerFeatureButton(index)}>
                                                            Add New Package
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="cs_loop_list_btn">
                                <button className="btn btn-sm btn-primary" onClick={addNewFunfact}>
                                    Add new
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* End Section Layout Desition */}
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
