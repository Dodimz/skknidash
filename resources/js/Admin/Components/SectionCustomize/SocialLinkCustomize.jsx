import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSocialLink } from "@/Redux/features/pages/Customize/customize"
import { Icon } from "@iconify/react"
import { produce } from "immer"

export default function SocialLinkCustomize() {
    const social_links = useSelector((state) => state.customize.social_links)
    const dispatch = useDispatch()
    const [data, setData] = useState(social_links)

    // List Item Accordion
    const [openIndex, setOpenIndex] = useState(0)
    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index))
    }

    // Clone Social
    const cloneSocial = (cloneIndex) => {
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

    // Add New Social
    const addNewSocial = () => {
        setData(
            produce((draft) => {
                draft.social_list.push({
                    social_title: "",
                    social_icon: "",
                    social_url: ""
                })
                setOpenIndex(draft.social_list.length - 1)
            })
        )
    }

    // Remove Social
    const removeSocial = (removeIndex) => {
        setData(
            produce((draft) => {
                draft.social_list = draft.social_list.filter((_, index) => index !== removeIndex)
            })
        )
    }

    useEffect(() => {
        dispatch(updateSocialLink(data))
    }, [data])

    return (
        <>
            <div className="cs_loop_list">
                <label>Add Social</label>
                <div className="cs_loop_list_in">
                    {data.social_list?.map((item, index) => (
                        <div className="cs_loop_item" key={index}>
                            <div className="cs_loop_item_head">
                                <span onClick={() => handleToggle(index)}>
                                    <span>{item.social_title ? item.social_title : "List Item"}</span>
                                </span>
                                <div className="cs_loop_item_control_btns">
                                    <button className="cs_clone_loop_item" onClick={() => cloneSocial(index)}>
                                        <Icon icon="lucide:copy" width="18" height="18" />
                                    </button>
                                    {data.social_list.length === 1 ? (
                                        ""
                                    ) : (
                                        <button className="cs_remove_loop_item" onClick={() => removeSocial(index)}>
                                            <Icon icon="lucide:x" width="18" height="18" />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {openIndex === index && (
                                <div className="cs_loop_item_body">
                                    <div className="form-group">
                                        <label>Social Title</label>

                                        <input
                                            type="text"
                                            value={item.social_title}
                                            onChange={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.social_list[index].social_title = e.target.value
                                                    })
                                                )
                                            }}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Social Icon ({" "}
                                            <a href="https://icon-sets.iconify.design/" target="_blank" className="text-primary">
                                                How to use icon?
                                            </a>{" "}
                                            )
                                        </label>
                                        <div className={`${item.social_icon && "cs_input_group"}`}>
                                            <input
                                                type="text"
                                                value={item.social_icon}
                                                onChange={(e) => {
                                                    setData(
                                                        produce((draft) => {
                                                            draft.social_list[index].social_icon = e.target.value
                                                        })
                                                    )
                                                }}
                                                className="form-control"
                                            />
                                            {item.social_icon && (
                                                <span className="cs_input_group_text">
                                                    <Icon icon={item.social_icon} width="16" height="16" />
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Social Icon URL</label>
                                        <input
                                            type="text"
                                            value={item.social_url}
                                            onChange={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.social_list[index].social_url = e.target.value
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
                        <button className="btn btn-sm btn-primary" onClick={addNewSocial}>
                            Add new
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
