import { useForm, Head, usePage } from "@inertiajs/react"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import FormValidationError from "@/Admin/Components/Validation/FromValidationError"
import { useState, useEffect } from "react"
import Editor from "@/Admin/Components/Inputs/Editor"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import MultipleMediaUploader from "@/Admin/Components/Media/MultipleMediaUploader"
import { produce } from "immer"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TagInput from "@/Admin/Components/Inputs/TagInput"
import translate from "@/utils/translate"

export default function Create({ languages, product_categories, default_lang, brands }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const { props } = usePage()
    const languageArr = Object.entries(languages)

    const { data, setData, errors, post } = useForm({
        category: "",
        brand: "",
        slug: "",
        price: "",
        discount_price: "",
        thumbnail_image: "",
        slider_images: [],
        status: "1",
        is_popular: "0",
        is_trending: "0",
        seo_title: "",
        seo_description: "",
        tags: [],
        sku: "",
        quantity: "",

        // Language-specific fields
        ...Object.keys(languages).reduce((acc, code) => {
            acc[code + "_name"] = ""
            acc[code + "_description"] = ""
            acc[code + "_short_description"] = ""
            return acc
        }, {})
    })

    const handleStatusToggle = () => {
        setData("status", data.status === "1" ? "0" : "1")
    }

    const handleIsPopularToggle = () => {
        setData("is_popular", data.is_popular === "1" ? "0" : "1")
    }

    const handleIsTrendingToggle = () => {
        setData("is_trending", data.is_trending === "1" ? "0" : "1")
    }

    const handlePublish = (e) => {
        e.preventDefault()
        post(route("admin.products.store"))
    }

    useEffect(() => {
        setSelectedLang(tempLang)
    }, [tempLang])

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0]
            const errorFirstLang = firstErrorField.split("_")[0] ?? null
            const isErrorLangValid = languageArr.find((i) => i[0] === errorFirstLang)
            if (isErrorLangValid) {
                setSelectedLang(errorFirstLang)
            }
        }
    }, [errors])

    return (
        <AdminLayouts>
            <Head title="Create Product" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Create Product")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    {Object.entries(languages).map(([code, language]) => (
                                        <li className="nav-item" key={code}>
                                            <button
                                                type="button"
                                                onClick={() => setTempLang(code)}
                                                className={`nav-link ${selectedLang === code && "active"}`}
                                                style={{ outline: "none" }}
                                            >
                                                {language.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="name_translation">{translate("Product Name")} *</label>
                                            <TextInput
                                                title="Enter Product Name"
                                                type="text"
                                                id="name_translation"
                                                error={errors[`${selectedLang}_name`]}
                                                value={data[`${selectedLang}_name`]}
                                                onChange={(e) => setData(`${selectedLang}_name`, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="short_description">{translate("Short Description")}</label>
                                            <Editor
                                                onChange={(value) => setData(`${tempLang}_short_description`, value)}
                                                value={data[`${selectedLang}_short_description`]}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left d-flex">
                                    <h2 className="yoo-card-title mr-5">{translate("Product Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="price">
                                                {translate("Regular Price")} ({props.currency?.currency_code || "USD"}) *
                                            </label>
                                            <TextInput
                                                title="Enter Regular Price"
                                                type="number"
                                                step="0.01"
                                                id="price"
                                                error={errors?.price}
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="discount_price">
                                                {translate("Discount Price")} ({props.currency?.currency_code || "USD"}) *
                                            </label>
                                            <TextInput
                                                title="Enter Discount Price"
                                                type="number"
                                                step="0.01"
                                                id="discount_price"
                                                error={errors?.discount_price}
                                                value={data.discount_price}
                                                onChange={(e) => setData("discount_price", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="category">{translate("Category")} *</label>
                                            <div className="form-group form-group-md">
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        id="category"
                                                        error={errors?.category}
                                                        onChange={(e) => setData("category", e.target.value)}
                                                        value={data.category}
                                                    >
                                                        <option value="">{translate("Select Category")}</option>
                                                        {product_categories &&
                                                            product_categories.map((category) => (
                                                                <option key={`category_${category.id}`} value={category.id}>
                                                                    {category?.content?.title}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    <FormValidationError message={errors.category} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="description">{translate("Description")}</label>
                                            <Editor
                                                onChange={(value) => setData(`${tempLang}_description`, value)}
                                                value={data[`${selectedLang}_description`]}
                                            />
                                            <FormValidationError message={errors[`${selectedLang}_description`]} />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left d-flex">
                                    <h2 className="yoo-card-title mr-5">{translate("SEO Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="seo_title">{translate("SEO Title")}</label>
                                            <TextInput
                                                title="Enter SEO Title"
                                                type="text"
                                                id="seo_title"
                                                error={errors.seo_title}
                                                value={data.seo_title}
                                                onChange={(e) => setData("seo_title", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="seo_description">{translate("SEO Description")}</label>
                                            <TextInput
                                                title="Enter SEO Description"
                                                type="text"
                                                id="seo_description"
                                                error={errors.seo_description}
                                                value={data.seo_description}
                                                onChange={(e) => setData("seo_description", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b10 yoo-height-lg-b10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Product Status")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group form-group-md">
                                        <div className="d-flex">
                                            <label htmlFor="status">{translate("Is Active")}: </label>
                                            <div
                                                className={`yoo-switch ${data.status === "1" ? "active" : ""}`}
                                                onClick={handleStatusToggle}
                                                style={{
                                                    cursor: "pointer",
                                                    marginLeft: "20px"
                                                }}
                                            >
                                                <div className="yoo-switch-in"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-group-md">
                                        <div className="d-flex">
                                            <label htmlFor="is_popular">{translate("Is Popular")}: </label>
                                            <div
                                                className={`yoo-switch ${data.is_popular === "1" ? "active" : ""}`}
                                                onClick={handleIsPopularToggle}
                                                style={{
                                                    cursor: "pointer",
                                                    marginLeft: "20px"
                                                }}
                                            >
                                                <div className="yoo-switch-in"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group form-group-md">
                                        <div className="d-flex">
                                            <label htmlFor="is_trending">{translate("Is Trending")}: </label>
                                            <div
                                                className={`yoo-switch ${data.is_trending === "1" ? "active" : ""}`}
                                                onClick={handleIsTrendingToggle}
                                                style={{
                                                    cursor: "pointer",
                                                    marginLeft: "20px"
                                                }}
                                            >
                                                <div className="yoo-switch-in"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Tags")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <TagInput title="Tags" type="text" selectTag={(tags) => setData("tags", tags)} id="tags" />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Brands")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group form-group-md">
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="brand"
                                                error={errors?.brand}
                                                onChange={(e) => setData("brand", e.target.value)}
                                                value={data.brand}
                                            >
                                                <option value="">{translate("Select Brand")}</option>
                                                {brands &&
                                                    brands.map((brand) => (
                                                        <option key={`brand_${brand.id}`} value={brand.id}>
                                                            {brand?.content?.title}
                                                        </option>
                                                    ))}
                                            </select>
                                            <FormValidationError message={errors.brand} />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Inventory Information")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="sku">{translate("SKU")} *</label>
                                            <TextInput
                                                title="Enter SKU"
                                                type="text"
                                                id="sku"
                                                error={errors.sku}
                                                value={data.sku}
                                                onChange={(e) => setData("sku", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="quantity">{translate("Quantity")} *</label>
                                            <TextInput
                                                title="Enter Quantity"
                                                type="number"
                                                step="0.01"
                                                id="quantity"
                                                error={errors.quantity}
                                                value={data.quantity}
                                                onChange={(e) => setData("quantity", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>

                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <h2 className="yoo-card-title mr-5">{translate("Product Images")}</h2>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group">
                                        <label>{translate("Upload thumbnail image")} *</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.thumbnail_image = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.thumbnail_image = ""
                                                    })
                                                )
                                            }
                                            defaultValue={data.thumbnail_image}
                                        />
                                    </div>
                                    <FormValidationError message={errors?.thumbnail_image} />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group">
                                        <label>{translate("Upload Slider images")} *</label>
                                        <MultipleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.slider_images = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={(d) =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.slider_images = d
                                                    })
                                                )
                                            }
                                            defaultValue={data.slider_images}
                                        />
                                    </div>
                                    <FormValidationError message={errors?.slider_images} />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="mb-5">
                                        <button type="submit" className="btn btn-success">
                                            {translate("Publish")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
