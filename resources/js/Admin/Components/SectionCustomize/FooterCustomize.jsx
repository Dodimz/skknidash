import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { produce } from "immer"
import { updateFooter } from "@/Redux/features/pages/Customize/customize"

export default function FooterCustomize() {
    const footer = useSelector((state) => state.customize.footer)
    const dispatch = useDispatch()
    const [data, setData] = useState({
        ...footer,
        footer_is_show_social_media: footer.footer_is_show_social_media === "1",
        footer_is_show_newslatter: footer.footer_is_show_newslatter === "1",
        footer_is_show_contact_logo_section: footer.footer_is_show_contact_logo_section === "1",
        footer_is_show_useful_links_section: footer.footer_is_show_useful_links_section === "1",
        footer_is_show_service_section: footer.footer_is_show_service_section === "1",
        footer_is_show_resources_section: footer.footer_is_show_resources_section === "1"
    })

    useEffect(() => {
        dispatch(updateFooter(data))
    }, [data])

    return (
        <>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Show Social Media:
                    <div
                        className={`yoo-switch ${data.footer_is_show_social_media ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_social_media = !draft.footer_is_show_social_media
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
                    Show Newslatter:
                    <div
                        className={`yoo-switch ${data.footer_is_show_newslatter ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_newslatter = !draft.footer_is_show_newslatter
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
                    Show Contact Logo Section:
                    <div
                        className={`yoo-switch ${data.footer_is_show_contact_logo_section ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_contact_logo_section = !draft.footer_is_show_contact_logo_section
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
                    Show Useful Links Section:
                    <div
                        className={`yoo-switch ${data.footer_is_show_useful_links_section ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_useful_links_section = !draft.footer_is_show_useful_links_section
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
                    Show Service Section:
                    <div
                        className={`yoo-switch ${data.footer_is_show_service_section ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_service_section = !draft.footer_is_show_service_section
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
                    Show Resources Section:
                    <div
                        className={`yoo-switch ${data.footer_is_show_resources_section ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.footer_is_show_resources_section = !draft.footer_is_show_resources_section
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label>Copyright Text</label>
                <input
                    type="text"
                    value={data.copyright_text}
                    onChange={(e) => setData({ ...data, copyright_text: e.target.value })}
                    className="form-control"
                />
            </div>
        </>
    )
}
