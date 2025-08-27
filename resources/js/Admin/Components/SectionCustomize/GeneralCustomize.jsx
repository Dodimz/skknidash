import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { produce } from "immer"
import { updateGeneral } from "@/Redux/features/pages/Customize/customize"
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect"
import { Link, usePage } from "@inertiajs/react"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import ColorPicker from "../ColorPicker/ColorPicker"

export default function GeneralCustomize() {
    const { sitemap_url, errors } = usePage().props
    const general = useSelector((state) => state.customize.general)
    const dispatch = useDispatch()
    const [fontLists, setFontLists] = useState([])

    const [data, setData] = useState({
        ...general
    })

    const default_colors = {
        accent_color: "#fe5b2c",
        primary_color: "#18333b",
        secondary_color: "#67797e"
    }

    const restToDefaultColors = (e) => {
        e.preventDefault()
        setData((prevState) => ({
            ...prevState,
            ...default_colors
        }))
    }

    useEffect(() => {
        dispatch(updateGeneral(data))
    }, [data])

    useEffect(() => {
        axios.get("https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD2wtvt62x3jtd1LxDM9ZZnY7f7jnSzgVM&sort=popularity").then((res) => {
            const items = res.data.items.map((item) => {
                return { label: item.family, value: item.family }
            })
            setFontLists(items)
        })
    }, [])

    return (
        <>
            <div className="form-group">
                <label>Site Title</label>
                <input
                    type="text"
                    value={data.site_name}
                    onChange={(e) => setData({ ...data, site_name: e.target.value })}
                    className="form-control"
                />
                {errors?.site_name && <span className="text-danger">{errors?.site_name}</span>}
            </div>
            <div className="form-group">
                <label>Tagline</label>
                <input type="text" value={data.tagline} onChange={(e) => setData({ ...data, tagline: e.target.value })} className="form-control" />
            </div>
            <div className="form-group">
                <label>Site Logo Dark</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setData(
                            produce((draft) => {
                                draft.site_logo_dark = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setData(
                            produce((draft) => {
                                draft.site_logo_dark = ""
                            })
                        )
                    }
                    defaultValue={data.site_logo_dark}
                />
                {errors?.site_logo_dark && <span className="text-danger">{errors?.site_logo_dark}</span>}
            </div>
            <div className="form-group">
                <label>Site Logo Light</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setData(
                            produce((draft) => {
                                draft.site_logo_light = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setData(
                            produce((draft) => {
                                draft.site_logo_light = ""
                            })
                        )
                    }
                    defaultValue={data.site_logo_light}
                />
                {errors?.site_logo_light && <span className="text-danger">{errors?.site_logo_light}</span>}
            </div>
            <div className="form-group">
                <label>Site Favicon</label>
                <SingleMediaUploader
                    onSelected={(e) => {
                        setData(
                            produce((draft) => {
                                draft.site_favicon = e
                            })
                        )
                    }}
                    handleRemoved={() =>
                        setData(
                            produce((draft) => {
                                draft.site_favicon = ""
                            })
                        )
                    }
                    defaultValue={data.site_favicon}
                />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-lg-6">
                        <label>Sitemap URL</label>
                    </div>
                    <div className="col-md-6">
                        <Link href={route("admin.generate.sitemap")} style={{ color: "#0d6efd" }}>
                            Generate Sitemap
                        </Link>
                    </div>
                </div>
                <code>{sitemap_url}</code>
            </div>
            <div className="form-group">
                <label htmlFor="" style={{ display: "flex", gap: "10px" }}>
                    Is Show Breadcrumbs:
                    <div
                        className={`yoo-switch ${data.is_page_breadcrumbs ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_page_breadcrumbs = !draft.is_page_breadcrumbs
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            <div className="form-group">
                <label htmlFor="">Primary Font</label>
                <CustomSelect
                    options={fontLists}
                    placeholder="Select Primary Font"
                    value={data.primary_font}
                    onSelect={(e) =>
                        setData(
                            produce((draft) => {
                                draft.primary_font = e
                            })
                        )
                    }
                />
            </div>
            <div className="form-group">
                <label htmlFor="">Secondary Font</label>
                <CustomSelect
                    options={fontLists}
                    placeholder="Select Secondary Font"
                    value={data.secondary_font}
                    onSelect={(e) =>
                        setData(
                            produce((draft) => {
                                draft.secondary_font = e
                            })
                        )
                    }
                />
            </div>
            <div className="form-group">
                <div className="row">
                    <div className="col-lg-4">
                        <label>Site Color</label>
                    </div>
                    <div className="col-md-8">
                        <Link style={{ color: "#0d6efd" }} onClick={restToDefaultColors}>
                            Back To Default Color
                        </Link>
                    </div>
                </div>
            </div>
            <ColorPicker
                title={"Accent Color"}
                color={data.accent_color}
                onChange={(color) => {
                    setData(
                        produce((draft) => {
                            draft.accent_color = color.hex
                        })
                    )
                }}
            />
            <ColorPicker
                title={"⁠Heading Color"}
                color={data.primary_color}
                onChange={(color) => {
                    setData(
                        produce((draft) => {
                            draft.primary_color = color.hex
                        })
                    )
                }}
            />
            <ColorPicker
                title={"Body Color"}
                color={data.secondary_color}
                onChange={(color) => {
                    setData(
                        produce((draft) => {
                            draft.secondary_color = color.hex
                        })
                    )
                }}
            />
        </>
    )
}
