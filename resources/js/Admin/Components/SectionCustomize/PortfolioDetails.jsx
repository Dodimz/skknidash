import React, { useEffect, useState } from "react"
import { produce } from "immer"
import { usePage } from "@inertiajs/react"
import CustomSelect from "@/Admin/Components/Inputs/CustomSelect"
import { useDispatch } from "react-redux"
import {
    updatePageBreadcrumb,
    updatePageFooterLayout,
    updatePageHeaderLayout,
    updatePageMetaDescription,
    updatePageMetaImage,
    updatePageMetaTags,
    updatePageMetaTitle,
    updatePagePageCategory,
    updatePageTitle,
    updatePageBreadcrumbImage,
    updatePageBreadcrumbTitle,
    updatePageHeaderActionButtonText,
    updatePageHeaderActionButtonURL,
    updatePageHeaderShowShoppingCart
} from "@/Redux/features/pages/Page/page"
import { useSelector } from "react-redux"
import SingleMediaUploader from "../Media/SingleMediaUploader"

export default function PortfolioDetails() {
    const { currentLang, pageInfo } = useSelector((state) => state.pages)

    const dispatch = useDispatch()
    const { categories, errors } = usePage().props
    const [data, setData] = useState({})

    // update state
    useEffect(() => {
        dispatch(updatePageTitle(data.title))
        dispatch(updatePageBreadcrumb(data.is_show_breadcrumb))
        dispatch(updatePageBreadcrumbTitle(data.breadcrumb_title))
        dispatch(updatePageHeaderActionButtonText(data.header_action_button_text))
        dispatch(updatePageHeaderActionButtonURL(data.header_action_button_url))
        dispatch(updatePageBreadcrumbImage(data.breadcrumb_image))
        dispatch(updatePageHeaderLayout(data.header_layout))
        dispatch(updatePageHeaderShowShoppingCart(data.is_show_shopping_cart))
        dispatch(updatePageFooterLayout(data.footer_layout))
        dispatch(updatePageMetaTitle(data.meta_title))
        dispatch(updatePageMetaDescription(data.meta_description))
        dispatch(updatePageMetaTags(data.meta_tags))
        dispatch(updatePageMetaImage(data.meta_image))
        dispatch(updatePagePageCategory(data.category))
    }, [data])

    useEffect(() => {
        if (pageInfo[currentLang]) {
            setData(pageInfo[currentLang])
        }
    }, [currentLang])

    return (
        <>
            <div className="form-group">
                <label htmlFor="">Page Title</label>
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
            <div className="form-group">
                <label htmlFor="">Select Category</label>
                <CustomSelect
                    options={categories?.data}
                    placeholder="Select category"
                    onSelect={(e) =>
                        setData(
                            produce((draft) => {
                                draft.category = e
                            })
                        )
                    }
                    value={data.category}
                />
                {errors?.category && <span className="text-danger">{errors?.category}</span>}
            </div>
            <div className="form-group my-3">
                <label>Select Header Layout</label>
                <select
                    className="form-control"
                    value={data.header_layout}
                    onChange={(e) =>
                        setData(
                            produce((draft) => {
                                draft.header_layout = e.target.value
                            })
                        )
                    }
                >
                    <option value="1">Layout 1</option>
                    <option value="2">Layout 2</option>
                    <option value="3">Layout 3</option>
                    <option value="4">Layout 4</option>
                    <option value="5">Layout 5</option>
                    <option value="6">Layout 6</option>
                    <option value="7">Layout 7</option>
                    <option value="8">Layout 8</option>
                    <option value="9">Layout 9</option>
                    <option value="10">Layout 10</option>
                </select>
            </div>

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
            <div className="form-group mb-3">
                <label>Select Footer Layout</label>
                <select
                    className="form-control"
                    value={data.footer_layout}
                    onChange={(e) =>
                        setData(
                            produce((draft) => {
                                draft.footer_layout = e.target.value
                            })
                        )
                    }
                >
                    <option value="1">Layout 1</option>
                    <option value="2">Layout 2</option>
                </select>
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
                        <label>Breadcrumb Image</label>
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
                    <i>Separate with coma</i>
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
