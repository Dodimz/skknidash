import React, { useEffect, useState } from "react"
import { produce } from "immer"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"

export default function HeroSectionCustomize({ index }) {
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

    // Remove Funfact
    const removeFunfact = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.funfact_list = draft.funfact_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    // Clone Funfact
    const cloneFunfact = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.funfact_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.funfact_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Funfact
    const addNewFunfact = () => {
        setData(
            produce((draft) => {
                draft.funfact_list.push({
                    funfact_title: "",
                    funfact_value: ""
                })
                setOpenIndex(draft.funfact_list.length - 1)
            })
        )
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

    // Add New feature
    const addNewFeature = () => {
        setData(
            produce((draft) => {
                draft.feature_list.push({
                    feature_title: "",
                    feature_subtitle: ""
                })
                setOpenIndex(draft.feature_list.length - 1)
            })
        )
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
                    casestudy_image_url: "",
                    casestudy_number: "",
                    casestudy_category: "",
                    casestudy_title: "",
                    casestudy_action_text: "",
                    casestudy_action_url: ""
                })
                setOpenIndex(draft.casestudy_list.length - 1)
            })
        )
    }

    // Remove Slider
    const removeSlider = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.slider_list = draft.slider_list.filter((_, index) => index !== removeIndex)
            })
        )
    }
    // Clone Slider
    const cloneSlider = (cloneIndex) => {
        setData(
            produce((draft) => {
                const newList = [...draft.slider_list]
                const clonedItem = { ...newList[cloneIndex] }
                newList.splice(cloneIndex + 1, 0, clonedItem)
                draft.slider_list = newList
                setOpenIndex(cloneIndex + 1)
            })
        )
    }

    // Add New Slider
    const addNewSlider = () => {
        setData(
            produce((draft) => {
                draft.slider_list.push({
                    title: "",
                    sub_title: "",
                    imageUrl: "",
                    action_text: "",
                    action_url: "",
                    action_text_2: "",
                    action_url_2: "",
                    avatar_image_url: "",
                    avatar_image_url_2: "",
                    review_title: "",
                    review_number: ""
                })
                setOpenIndex(draft.slider_list.length - 1)
            })
        )
    }

    // conditional rendering
    let customizer = ""
    if (data.layout === "1") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1170x900 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={data.phone_number}
                        onChange={(e) => setData({ ...data, phone_number: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "2") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="email"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData({
                                ...data,
                                phone_number: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="cs_loop_list">
                    <label>Slider List</label>
                    <div className="cs_loop_list_in">
                        {data.slider_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.title ? item.title : "Slider Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneSlider(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.slider_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeSlider(index)}>
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
                                                            draft.slider_list[index].imageUrl = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.imageUrl}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Url</label>
                                            <input
                                                type="text"
                                                value={item.action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewSlider}>
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
                    <label>Background image (1020x100 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Image (200x200 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.avatar_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.avatar_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.avatar_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Conference date</label>
                    <input
                        type="text"
                        value={data.conference_date}
                        onChange={(e) => {
                            setData({
                                ...data,
                                conference_date: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Conference location</label>
                    <input
                        type="text"
                        value={data.location_date}
                        onChange={(e) => {
                            setData({ ...data, location_date: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Conference time</label>
                    <input
                        type="text"
                        value={data.conference_time}
                        onChange={(e) => {
                            setData({
                                ...data,
                                conference_time: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Conference place</label>
                    <input
                        type="text"
                        value={data.conference_place}
                        onChange={(e) => {
                            setData({
                                ...data,
                                conference_place: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Name</label>
                    <input
                        type="text"
                        value={data.avatar_name}
                        onChange={(e) => {
                            setData({
                                ...data,
                                avatar_name: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Avatar Designation</label>
                    <input
                        type="text"
                        value={data.avatar_designation}
                        onChange={(e) => {
                            setData({
                                ...data,
                                avatar_designation: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action link</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "4") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Second Action button text</label>
                    <input
                        type="text"
                        value={data.action_text_2}
                        onChange={(e) => {
                            setData({
                                ...data,
                                action_text_2: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Second Action button url</label>
                    <input
                        type="text"
                        value={data.action_url_2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                action_url_2: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "5") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Slider List</label>
                    <div className="cs_loop_list_in">
                        {data.slider_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.title ? item.title : "Slider Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneSlider(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.slider_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeSlider(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Slider image (770x650 px)</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.imageUrl}
                                            />
                                        </div>
                                        <div className="row row_space_10">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Avatar Image (200x200 px)</label>
                                                    <SingleMediaUploader
                                                        onSelected={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.slider_list[index].avatar_image_url = e
                                                                })
                                                            )
                                                        }}
                                                        handleRemoved={() =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.slider_list[index].avatar_image_url = ""
                                                                })
                                                            )
                                                        }
                                                        defaultValue={item.avatar_image_url}
                                                        size_sm
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label>Avatar Image 2 (200x200 px)</label>
                                                    <SingleMediaUploader
                                                        onSelected={(e) => {
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.slider_list[index].avatar_image_url_2 = e
                                                                })
                                                            )
                                                        }}
                                                        handleRemoved={() =>
                                                            setData(
                                                                produce((draft) => {
                                                                    draft.slider_list[index].avatar_image_url_2 = ""
                                                                })
                                                            )
                                                        }
                                                        defaultValue={item.avatar_image_url_2}
                                                        size_sm
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Subtitle</label>
                                            <input
                                                type="text"
                                                value={item.sub_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].sub_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Review Title</label>
                                            <input
                                                type="text"
                                                value={item.review_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].review_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Review number (1 to 5)</label>
                                            <input
                                                type="number"
                                                value={item.review_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].review_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Button text</label>
                                            <input
                                                type="text"
                                                value={item.action_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Button url</label>
                                            <input
                                                type="text"
                                                value={item.action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Second button text</label>
                                            <input
                                                type="text"
                                                value={item.action_text_2}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_text_2 = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Second button url</label>
                                            <input
                                                type="text"
                                                value={item.action_url_2}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url_2 = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewSlider}>
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
                    <label>Background image (1920x560 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="cs_loop_list">
                    <label>Funfact List</label>
                    <div className="cs_loop_list_in">
                        {data.funfact_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.funfact_title ? item.funfact_title : "List Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneFunfact(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.funfact_list.length === 1 ? (
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
                                            <label>Funfact Title</label>
                                            <input
                                                type="text"
                                                value={item.funfact_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.funfact_list[index].funfact_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Funfact Value</label>
                                            <input
                                                type="text"
                                                value={item.funfact_value}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.funfact_list[index].funfact_value = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewFunfact}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "7") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1920x560 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="cs_loop_list">
                    <label>Feature List</label>
                    <div className="cs_loop_list_in">
                        {data.feature_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head" onClick={() => handleToggle(index)}>
                                    <span>
                                        <span>{item.feature_title ? item.feature_title : "Feature Item"}</span>
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
    } else if (data.layout === "8") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (970x900 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "9") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Video Placeholder Image (1920x1000 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>YouTube Video ID</label>
                    <input
                        type="text"
                        value={data.youtube_id}
                        onChange={(e) => setData({ ...data, youtube_id: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "10") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Casestudy List</label>
                    <div className="cs_loop_list_in">
                        {data.casestudy_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.casestudy_title ? item.casestudy_title : "Casestudy Item"}</span>
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
                                            <label>Background image (1170x900 px)</label>
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
                                            <label>Casestudy Number</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Casestudy Category</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_category}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_category = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
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
                                        <div className="form-group" style={{ marginBottom: "10px" }}>
                                            <label>Action Button Text</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_action_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_action_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Action Button URL</label>
                                            <input
                                                type="text"
                                                value={item.casestudy_action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.casestudy_list[index].casestudy_action_url = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewCasestudy}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "11") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Slider List</label>
                    <div className="cs_loop_list_in">
                        {data.slider_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.title ? item.title : "Slider Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneSlider(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.slider_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeSlider(index)}>
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
                                                            draft.slider_list[index].imageUrl = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.imageUrl}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Subtitle</label>
                                            <input
                                                type="text"
                                                value={item.sub_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].sub_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Action Text</label>
                                            <input
                                                type="text"
                                                value={item.action_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Action Url</label>
                                            <input
                                                type="text"
                                                value={item.action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewSlider}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "12") {
        customizer = (
            <>
                <div className="cs_loop_list">
                    <label>Slider List</label>
                    <div className="cs_loop_list_in">
                        {data.slider_list?.map((item, index) => (
                            <div className="cs_loop_item" key={index}>
                                <div className="cs_loop_item_head">
                                    <span onClick={() => handleToggle(index)}>
                                        <span>{item.title ? item.title : "Slider Item"}</span>
                                    </span>
                                    <div className="cs_loop_item_control_btns">
                                        <button className="cs_clone_loop_item" onClick={() => cloneSlider(index)}>
                                            <Icon icon="lucide:copy" width="18" height="18" />
                                        </button>
                                        {data.slider_list.length === 1 ? (
                                            ""
                                        ) : (
                                            <button className="cs_remove_loop_item" onClick={() => removeSlider(index)}>
                                                <Icon icon="lucide:x" width="18" height="18" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {openIndex === index && (
                                    <div className="cs_loop_item_body">
                                        <div className="form-group">
                                            <label>Slider image (1920x1000 px)</label>
                                            <SingleMediaUploader
                                                onSelected={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = e
                                                        })
                                                    )
                                                }}
                                                handleRemoved={() =>
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].imageUrl = ""
                                                        })
                                                    )
                                                }
                                                defaultValue={item.imageUrl}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Title</label>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Slider Subtitle</label>
                                            <input
                                                type="text"
                                                value={item.sub_title}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].sub_title = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="text"
                                                value={item.phone_number}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].phone_number = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Button text</label>
                                            <input
                                                type="text"
                                                value={item.action_text}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_text = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Button url</label>
                                            <input
                                                type="text"
                                                value={item.action_url}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Second button text</label>
                                            <input
                                                type="text"
                                                value={item.action_text_2}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_text_2 = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Second button url</label>
                                            <input
                                                type="text"
                                                value={item.action_url_2}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.slider_list[index].action_url_2 = e.target.value
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
                            <button className="btn btn-sm btn-primary" onClick={addNewSlider}>
                                Add new
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (data.layout === "13") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (19200x1000 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>YouTube Video ID</label>
                    <input
                        type="text"
                        value={data.youtube_id}
                        onChange={(e) => setData({ ...data, youtube_id: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="email"
                        value={data.phone_number}
                        onChange={(e) =>
                            setData({
                                ...data,
                                phone_number: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "14") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1920x860 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label className="editor-breadcamp-toggle-wrap">
                        Background Attachment:
                        <div
                            className={`yoo-switch ${data.background_attachment === "fixed" ? "active" : ""}`}
                            onClick={() =>
                                setData({
                                    ...data,
                                    background_attachment: data.background_attachment === "initial" ? "fixed" : "initial"
                                })
                            }
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Second Action button text</label>
                    <input
                        type="text"
                        value={data.action_text_2}
                        onChange={(e) => {
                            setData({
                                ...data,
                                action_text_2: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Second Action button url</label>
                    <input
                        type="text"
                        value={data.action_url_2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                action_url_2: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "15") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Image (970x900 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
            </>
        )
    } else if (data.layout === "16") {
        customizer = (
            <>
                <div className="form-group">
                    <label>Background image (1920x860 px)</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.background_image_url = ""
                                })
                            )
                        }
                        defaultValue={data.background_image_url}
                    />
                </div>
                <div className="form-group">
                    <label className="editor-breadcamp-toggle-wrap">
                        Background Attachment:
                        <div
                            className={`yoo-switch ${data.background_attachment === "fixed" ? "active" : ""}`}
                            onClick={() =>
                                setData({
                                    ...data,
                                    background_attachment: data.background_attachment === "initial" ? "fixed" : "initial"
                                })
                            }
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} className="form-control" />
                </div>
                <div className="form-group">
                    <label>Sub Title</label>
                    <textarea
                        cols="30"
                        rows="10"
                        className="form-control"
                        value={data.sub_title}
                        onChange={(e) => setData({ ...data, sub_title: e.target.value })}
                    ></textarea>
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Action button text</label>
                    <input
                        type="text"
                        value={data.action_text}
                        onChange={(e) => {
                            setData({ ...data, action_text: e.target.value })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Action button url</label>
                    <input
                        type="text"
                        value={data.action_url}
                        onChange={(e) => setData({ ...data, action_url: e.target.value })}
                        className="form-control"
                    />
                </div>
                <div className="form-group" style={{ marginBottom: "10px" }}>
                    <label>Second Action button text</label>
                    <input
                        type="text"
                        value={data.action_text_2}
                        onChange={(e) => {
                            setData({
                                ...data,
                                action_text_2: e.target.value
                            })
                        }}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Second Action button url</label>
                    <input
                        type="text"
                        value={data.action_url_2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                action_url_2: e.target.value
                            })
                        }
                        className="form-control"
                    />
                </div>
            </>
        )
    }

    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                title: sectionData?.data?.title,
                sub_title: sectionData?.data?.sub_title,
                action_text: sectionData?.data?.action_text,
                action_text_2: sectionData?.data?.action_text_2,
                background_image_url: sectionData?.data?.background_image_url,
                avatar_image_url: sectionData?.data?.avatar_image_url,
                avatar_image_url_2: sectionData?.data?.avatar_image_url_2,
                action_url: sectionData?.data?.action_url,
                action_url_2: sectionData?.data?.action_url_2,
                email_address: sectionData?.data?.email_address,
                phone_number: sectionData?.data?.phone_number,
                slider_list: sectionData?.data?.slider_list ?? [
                    {
                        title: "",
                        sub_title: "",
                        imageUrl: "",
                        action_text: "",
                        action_url: "",
                        action_text_2: "",
                        action_url_2: "",
                        avatar_image_url: "",
                        avatar_image_url_2: "",
                        review_title: "",
                        review_number: "",
                        phone_number: ""
                    }
                ],
                funfact_list: sectionData?.data?.funfact_list ?? [
                    {
                        funfact_title: "",
                        funfact_value: ""
                    }
                ],
                casestudy_list: sectionData?.data?.casestudy_list ?? [
                    {
                        casestudy_image_url: "",
                        casestudy_number: "",
                        casestudy_category: "",
                        casestudy_title: "",
                        casestudy_action_text: "",
                        casestudy_action_url: ""
                    }
                ],
                feature_list: sectionData?.data?.feature_list ?? [
                    {
                        feature_title: "",
                        feature_subtitle: ""
                    }
                ],
                youtube_id: sectionData?.data?.youtube_id ?? "",
                conference_date: sectionData?.data?.conference_date,
                location_date: sectionData?.data?.location_date,
                conference_time: sectionData?.data?.conference_time,
                conference_place: sectionData?.data?.conference_place,
                avatar_name: sectionData?.data?.avatar_name,
                avatar_designation: sectionData?.data?.avatar_designation,
                review_title: sectionData?.data?.review_title,
                review_number: sectionData?.data?.review_number,
                background_attachment: sectionData?.data?.background_attachment ?? "initial"
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
                                Hero Style {data.layout}
                                <Icon icon="lucide:chevron-down" width="17" height="17" />
                            </div>
                        </div>
                        {layout && (
                            <div className="cs_section_images">
                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"].map((value) => (
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
                                            <img src={`/static/sections/hero/hero_style_${value}.jpg`} alt="Thumb" />
                                            <label htmlFor={`layout-${value}`}>Hero Style {value}</label>
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
