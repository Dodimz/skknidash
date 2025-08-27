import React, { useEffect, useState } from "react"
import { produce } from "immer"
import { usePage } from "@inertiajs/react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
    updatePageBreadcrumb,
    updatePageMetaDescription,
    updatePageMetaImage,
    updatePageMetaTags,
    updatePageMetaTitle,
    updatePageTitle,
    updatePageHeaderLayout,
    updatePageFooterLayout,
    updatePageBreadcrumbImage,
    updatePageBreadcrumbTitle,
    updatePageHeaderActionButtonText,
    updatePageHeaderActionButtonURL,
    updatePageHeaderShowShoppingCart
} from "@/Redux/features/pages/Page/page"
import SingleMediaUploader from "../Media/SingleMediaUploader"
import { Icon } from "@iconify/react"
import translate from "@/utils/translate"

export default function PageDetailsCustomize() {
    const dispatch = useDispatch()
    const { errors } = usePage().props
    const [data, setData] = useState({})
    const { currentLang, pageInfo } = useSelector((state) => state.pages)
    const [headerLayoutOpen, setHeaderLayoutOpen] = useState(false)
    const [footerLayoutOpen, setFooterLayoutOpen] = useState(false)

    // update state
    useEffect(() => {
        dispatch(updatePageTitle(data.title))
        dispatch(updatePageHeaderLayout(data.header_layout))
        dispatch(updatePageHeaderShowShoppingCart(data.is_show_shopping_cart))
        dispatch(updatePageFooterLayout(data.footer_layout))
        dispatch(updatePageBreadcrumb(data.is_show_breadcrumb))
        dispatch(updatePageBreadcrumbTitle(data.breadcrumb_title))
        dispatch(updatePageHeaderActionButtonText(data.header_action_button_text))
        dispatch(updatePageHeaderActionButtonURL(data.header_action_button_url))
        dispatch(updatePageBreadcrumbImage(data.breadcrumb_image))
        dispatch(updatePageMetaTitle(data.meta_title))
        dispatch(updatePageMetaDescription(data.meta_description))
        dispatch(updatePageMetaTags(data.meta_tags))
        dispatch(updatePageMetaImage(data.meta_image))
    }, [data])

    useEffect(() => {
        if (pageInfo[currentLang]) {
            setData(pageInfo[currentLang])
        }
    }, [currentLang])

    return (
        <>
            <div className="form-group">
                <label>Page Title</label>
                <input
                    onChange={(e) =>
                        setData(
                            produce((draft) => {
                                draft.title = e.target.value
                            })
                        )
                    }
                    type="text"
                    value={data.title}
                    className="form-control"
                />
                {errors?.title && <span className="text-danger">{errors?.title}</span>}
            </div>
            <div className="cs_design_layout_box cs_type_1">
                <div className={`cs_design_layout_select ${headerLayoutOpen ? "active" : ""}`}>
                    <label>Header Layout</label>
                    <div className="cs_design_layout_toggle_btn" onClick={() => setHeaderLayoutOpen(!headerLayoutOpen)}>
                        {data.header_layout === "0" ? "No Header" : `Header Style ${data.header_layout}`}
                        <Icon icon="lucide:chevron-down" width="17" height="17" />
                    </div>
                </div>
                {headerLayoutOpen && (
                    <div className="cs_section_images">
                        {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((value) => (
                            <div key={value} className="cs_section_image" onClick={() => setHeaderLayoutOpen(false)}>
                                <input
                                    type="radio"
                                    id={`header-${value}`}
                                    name="header_layout"
                                    value={value}
                                    checked={data.header_layout == value}
                                    onChange={(e) =>
                                        setData(
                                            produce((draft) => {
                                                draft.header_layout = e.target.value
                                            })
                                        )
                                    }
                                    className="form-check-input"
                                />
                                <div className="cs_section_image_in">
                                    <img src={`/static/sections/headers/style_${value}.jpg`} alt="Thumb" />
                                    {value === "0" ? "" : <label htmlFor={`header-${value}`}>Header Style {value}</label>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {data.header_layout && (
                <div className="form-group">
                    <label className="editor-breadcamp-toggle-wrap">
                        Show Header Shopping Cart:
                        <div
                            className={`yoo-switch ${data.is_show_shopping_cart ? "active" : ""}`}
                            onClick={() =>
                                setData(
                                    produce((draft) => {
                                        draft.is_show_shopping_cart = !draft.is_show_shopping_cart
                                    })
                                )
                            }
                        >
                            <div className="yoo-switch-in" />
                        </div>
                    </label>
                </div>
            )}
            {(data.header_layout == "3" || data.header_layout == "8" || data.header_layout == "10") && (
                <>
                    <div className="form-group">
                        <label>Header Action Button Text</label>
                        <input
                            onChange={(e) =>
                                setData(
                                    produce((draft) => {
                                        draft.header_action_button_text = e.target.value
                                    })
                                )
                            }
                            type="text"
                            value={data.header_action_button_text}
                            className="form-control"
                        />
                        {errors?.header_action_button_text && <span className="text-danger">{errors?.header_action_button_text}</span>}
                    </div>
                    <div className="form-group">
                        <label>Header Action Button URL</label>
                        <input
                            onChange={(e) =>
                                setData(
                                    produce((draft) => {
                                        draft.header_action_button_url = e.target.value
                                    })
                                )
                            }
                            type="text"
                            value={data.header_action_button_url}
                            className="form-control"
                        />
                        {errors?.header_action_button_url && <span className="text-danger">{errors?.header_action_button_url}</span>}
                    </div>
                </>
            )}
            <div className="cs_design_layout_box cs_type_1">
                <div className={`cs_design_layout_select ${footerLayoutOpen ? "active" : ""}`}>
                    <label>Footer Layout</label>
                    <div className="cs_design_layout_toggle_btn" onClick={() => setFooterLayoutOpen(!footerLayoutOpen)}>
                        {data.footer_layout === "0" ? "No Footer" : `Footer Style ${data.footer_layout}`}
                        <Icon icon="lucide:chevron-down" width="17" height="17" />
                    </div>
                </div>
                {footerLayoutOpen && (
                    <div className="cs_section_images">
                        {["0", "1", "2"].map((value) => (
                            <div key={value} className="cs_section_image" onClick={() => setFooterLayoutOpen(false)}>
                                <input
                                    type="radio"
                                    id={`footer-${value}`}
                                    name="footer_layout"
                                    value={value}
                                    checked={data.footer_layout == value}
                                    onChange={(e) =>
                                        setData(
                                            produce((draft) => {
                                                draft.footer_layout = e.target.value
                                            })
                                        )
                                    }
                                    className="form-check-input"
                                />
                                <div className="cs_section_image_in">
                                    <img src={`/static/sections/footers/style_${value}.jpg`} alt="Thumb" />

                                    {value === "0" ? "" : <label htmlFor={`footer-${value}`}>Footer Style {value}</label>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="form-group">
                <label className="editor-breadcamp-toggle-wrap">
                    Show Breadcrumb:
                    <div
                        className={`yoo-switch ${data.is_show_breadcrumb ? "active" : ""}`}
                        onClick={() =>
                            setData(
                                produce((draft) => {
                                    draft.is_show_breadcrumb = !draft.is_show_breadcrumb
                                })
                            )
                        }
                    >
                        <div className="yoo-switch-in" />
                    </div>
                </label>
            </div>
            {data.is_show_breadcrumb && (
                <div className="editor-breadcamp-inputs">
                    <div className="form-group">
                        <label htmlFor="">Breadcrumb Title</label>
                        <input
                            onChange={(e) =>
                                setData(
                                    produce((draft) => {
                                        draft.breadcrumb_title = e.target.value
                                    })
                                )
                            }
                            type="text"
                            value={data.breadcrumb_title}
                            className="form-control"
                        />
                        {errors?.breadcrumb_title && <span className="text-danger">{errors?.breadcrumb_title}</span>}
                    </div>
                    <div className="form-group">
                        <label>{translate("Breadcrumb Image")}</label>
                        <SingleMediaUploader
                            onSelected={(e) => {
                                setData(
                                    produce((draft) => {
                                        draft.breadcrumb_image = e
                                    })
                                )
                            }}
                            handleRemoved={() =>
                                setData(
                                    produce((draft) => {
                                        draft.breadcrumb_image = ""
                                    })
                                )
                            }
                            defaultValue={data.breadcrumb_image}
                        />
                    </div>
                </div>
            )}
            <h4 className="seo-details-title">SEO Details:</h4>
            <div className="seo-details-wrap">
                <div className="form-group">
                    <label htmlFor="">Meta Title</label>
                    <input
                        onChange={(e) =>
                            setData(
                                produce((draft) => {
                                    draft.meta_title = e.target.value
                                })
                            )
                        }
                        type="text"
                        value={data.meta_title}
                        className="form-control"
                    />
                    {errors?.meta_title && <span className="text-danger">{errors?.meta_title}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Meta Tags</label>
                    <input
                        onChange={(e) =>
                            setData(
                                produce((draft) => {
                                    draft.meta_tags = e.target.value
                                })
                            )
                        }
                        type="text"
                        value={data.meta_tags}
                        className="form-control"
                    />
                    <i>Note: Separate with coma</i>
                    <br />
                    {errors?.meta_tags && <span className="text-danger">{errors?.meta_tags}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="">Meta Description</label>
                    <textarea
                        onChange={(e) =>
                            setData(
                                produce((draft) => {
                                    draft.meta_description = e.target.value
                                })
                            )
                        }
                        value={data.meta_description}
                        className="form-control"
                    />
                    {errors?.meta_description && <span className="text-danger">{errors?.meta_description}</span>}
                </div>
                <div className="form-group">
                    <label>Meta Image</label>
                    <SingleMediaUploader
                        onSelected={(e) => {
                            setData(
                                produce((draft) => {
                                    draft.meta_image = e
                                })
                            )
                        }}
                        handleRemoved={() =>
                            setData(
                                produce((draft) => {
                                    draft.meta_image = ""
                                })
                            )
                        }
                        defaultValue={data.meta_image}
                    />
                </div>
            </div>
        </>
    )
}
