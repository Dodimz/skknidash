import React, { useEffect, useState } from "react"
import AdvanceCustomize from "@/Admin/Components/SectionCustomize/AdvanceCustomize"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { produce } from "immer"
import { updatePageSection, updatePageAdvancedSettings } from "@/Redux/features/pages/Page/page"
import { Icon } from "@iconify/react"
import Editor from "../Inputs/Editor"
import { usePage } from "@inertiajs/react"

export default function TextEditorSectionCustomize({ index }) {
    const { currentLang, pageData } = useSelector((state) => state.pages)
    const [tab, setTab] = useState("general")
    const dispatch = useDispatch()
    const [sectionData, setSectionData] = useState({})
    const [advancedData, setAdvancedData] = useState({})
    const [data, setData] = useState({})
    const { errors } = usePage().props

    const advancedCallback = (data) => {
        if (index) {
            setAdvancedData(data)
            dispatch(updatePageAdvancedSettings({ data, index }))
        }
    }
    useEffect(() => {
        if (index) {
            setData({
                layout: sectionData?.data?.layout ?? "1",
                section_title: sectionData?.data?.section_title ?? "",
                section_subtitle: sectionData?.data?.section_subtitle ?? "",
                section_description: sectionData?.data?.section_description ?? "",
                text_editor_content: sectionData?.data?.text_editor_content ?? ""
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

                    <div className="form-group">
                        <label>Text Editor</label>
                        <Editor
                            onChange={(e) =>
                                setData(
                                    produce((draft) => {
                                        draft.text_editor_content = e
                                    })
                                )
                            }
                            value={data.text_editor_content ?? ""}
                        />
                        {errors?.description && <span className="text-danger">{errors?.description}</span>}
                    </div>
                </>
            ) : (
                <AdvanceCustomize advancedCallback={advancedCallback} currentSection={advancedData} />
            )}
        </>
    )
}
