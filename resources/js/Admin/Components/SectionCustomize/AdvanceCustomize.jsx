import React, { useEffect, useRef, useState } from "react"
import { produce } from "immer"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import { ChromePicker } from "react-color"

export default function AdvanceCustomize({ advancedCallback, currentSection }) {
    const [advancedData, setAdvancedData] = useState(currentSection)
    const [showColorPicker, setShowColorPicker] = useState(false)
    const colorPickerRef = useRef(null)

    useEffect(() => {
        advancedCallback(advancedData)
    }, [advancedData])

    useEffect(() => {
        setAdvancedData((prev) => ({
            ...prev,
            padding: {
                top: {
                    lg: prev.padding.top.lg,
                    md: prev.padding.top.md || prev.padding.top.lg
                },
                bottom: {
                    lg: prev.padding.bottom.lg,
                    md: prev.padding.bottom.md || prev.padding.bottom.lg
                }
            }
        }))
    }, [])

    return (
        <>
            <div className="form-group">
                <label className="form-label">Padding Top (px)</label>
                <div className="row row_space_10" style={{ marginBottom: "8px" }}>
                    <div className="col-md-6">
                        <div className="cs_input_group">
                            <span className="cs_input_group_text">Desktop</span>
                            <input
                                type="number"
                                className="form-control"
                                value={advancedData.padding.top.lg}
                                onChange={(e) =>
                                    setAdvancedData(
                                        produce((draft) => {
                                            draft.padding.top.lg = e.target.value
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="cs_input_group">
                            <span className="cs_input_group_text">Mobile</span>
                            <input
                                type="number"
                                className="form-control"
                                value={advancedData.padding.top.md}
                                onChange={(e) =>
                                    setAdvancedData(
                                        produce((draft) => {
                                            draft.padding.top.md = e.target.value
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <label className="form-label">Padding Bottom (px)</label>
                <div className="row row_space_10">
                    <div className="col-md-6">
                        <div className="cs_input_group">
                            <span className="cs_input_group_text">Desktop</span>
                            <input
                                type="number"
                                className="form-control"
                                value={advancedData.padding.bottom.lg}
                                onChange={(e) =>
                                    setAdvancedData(
                                        produce((draft) => {
                                            draft.padding.bottom.lg = e.target.value
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="cs_input_group">
                            <span className="cs_input_group_text">Mobile</span>
                            <input
                                type="number"
                                className="form-control"
                                value={advancedData.padding.bottom.md}
                                onChange={(e) =>
                                    setAdvancedData(
                                        produce((draft) => {
                                            draft.padding.bottom.md = e.target.value
                                        })
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-group">
                <label>Background Image</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setAdvancedData(
                            produce((draft) => {
                                draft.backgroundImage = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setAdvancedData(
                            produce((draft) => {
                                draft.backgroundImage = ""
                            })
                        )
                    }
                    defaultValue={advancedData.backgroundImage}
                />
            </div>

            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Dark Section:
                    <div
                        className={`yoo-switch ${advancedData.is_section_dark ? "active" : ""}`}
                        onClick={() =>
                            setAdvancedData(
                                produce((draft) => {
                                    draft.is_section_dark = !draft.is_section_dark
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
                {advancedData.is_section_dark && (
                    <i
                        style={{
                            fontSize: "13px",
                            lineHeight: "1.2em",
                            display: "block"
                        }}
                    >
                        Note: Please choose a dark background from below
                    </i>
                )}
            </div>

            <div className="form-group">
                <label
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >
                    <span>Background Color:</span>
                    <div
                        className="color"
                        style={{
                            width: "40px",
                            height: "28px",
                            backgroundColor: advancedData.backgroundColor,
                            cursor: "pointer",
                            borderRadius: "5px",
                            border: "1px solid #dcdcde"
                        }}
                        onClick={() => setShowColorPicker(!showColorPicker)}
                    ></div>
                </label>
                {showColorPicker && (
                    <div ref={colorPickerRef}>
                        <ChromePicker
                            color={{ hex: advancedData.backgroundColor, a: 1 }}
                            disableAlpha={true}
                            onChange={(color) => {
                                setAdvancedData(
                                    produce((draft) => {
                                        draft.backgroundColor = color.hex
                                    })
                                )
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="options">CSS Classes</label>
                <input
                    type="text"
                    className="form-control"
                    value={advancedData.classes}
                    onChange={(e) =>
                        setAdvancedData(
                            produce((draft) => {
                                draft.classes = e.target.value
                            })
                        )
                    }
                />
            </div>
        </>
    )
}
