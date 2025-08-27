import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { produce } from "immer"
import { updateSidebar } from "@/Redux/features/pages/Customize/customize"

export default function SidebarCustomize() {
    const sidebar = useSelector((state) => state.customize.sidebar)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        ...sidebar,
        is_show_logo: sidebar.is_show_logo === "1",
        is_show_contact_info: sidebar.is_show_contact_info === "1",
        is_show_social_media: sidebar.is_show_social_media === "1",
        is_show_subscribe: sidebar.is_show_subscribe === "1"
    })

    useEffect(() => {
        dispatch(updateSidebar(data))
    }, [data])

    return (
        <>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Is Show Logo:
                    <div
                        className={`yoo-switch ${data.is_show_logo ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_show_logo = !draft.is_show_logo
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Is Show Contact Info:
                    <div
                        className={`yoo-switch ${data.is_show_contact_info ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_show_contact_info = !draft.is_show_contact_info
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Is Show Social Media:
                    <div
                        className={`yoo-switch ${data.is_show_social_media ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_show_social_media = !draft.is_show_social_media
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Is Show Newslatter:
                    <div
                        className={`yoo-switch ${data.is_show_subscribe ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_show_subscribe = !draft.is_show_subscribe
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
        </>
    )
}
