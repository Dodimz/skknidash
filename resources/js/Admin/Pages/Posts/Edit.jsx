import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, useForm } from "@inertiajs/react"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import Editor from "@/Admin/Components/Inputs/Editor.jsx"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError.jsx"
import TagInput from "@/Admin/Components/Inputs/TagInput.jsx"
import DangerButton from "@/Admin/Components/Button/DangerButton.jsx"
import SuccessButton from "@/Admin/Components/Button/SuccessButton.jsx"
import { useEffect } from "react"
import { useState } from "react"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import { produce } from "immer"
import translate from "@/utils/translate"

export default function Edit({ categories, edited_post, default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const languagesArr = Object.entries(languages)

    const { data, setData, errors, post, processing } = useForm({
        _method: "put",
        ...edited_post
    })

    // handle update
    const handleUpdate = (e) => {
        e.preventDefault()
        post(route("admin.posts.update", edited_post))
    }

    useEffect(() => {
        setSelectedLang(tempLang)
    }, [tempLang])

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorObj = Object.keys(errors)[0]
            const errorFirstLang = firstErrorObj.split("_")[0] ?? null
            const isErrorLangValid = languagesArr.find((i) => i[0] === errorFirstLang)
            if (isErrorLangValid) {
                setSelectedLang(errorFirstLang)
            }
        }
    }, [errors])

    const filteredCategories = categories.data[selectedLang]

    return (
        <AdminLayouts>
            <Head title="Edit post" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit Posts")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handleUpdate}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Post Details")}</h2>
                                </div>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    {languagesArr.map(([code, language]) => (
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
                                    <TextInput
                                        title={`${translate("Title")} *`}
                                        type="text"
                                        id="title"
                                        error={errors[`${selectedLang}_title`]}
                                        value={data[`${selectedLang}_title`]}
                                        onChange={(e) => setData(`${selectedLang}_title`, e.target.value)}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="">{`${translate("Content")} *`}</label>
                                        <Editor value={data[`${selectedLang}_content`]} onChange={(value) => setData(`${tempLang}_content`, value)} />
                                        <FromValidationError message={errors?.content} />
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("SEO Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput
                                                title={translate("Meta Title")}
                                                type="text"
                                                id="meta-title"
                                                error={errors[`${selectedLang}_meta_title`]}
                                                value={data[`${selectedLang}_meta_title`]}
                                                onChange={(e) => setData(`${selectedLang}_meta_title`, e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput
                                                title={translate("Meta Description")}
                                                type="text"
                                                id="meta-desc"
                                                error={errors[`${selectedLang}_meta_description`]}
                                                value={data[`${selectedLang}_meta_description`]}
                                                onChange={(e) => setData(`${selectedLang}_meta_description`, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Category")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <label htmlFor="category">{translate("Category")} *</label>
                                    <div className="form-group form-group-md">
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="category"
                                                onChange={(e) => setData("category", e.target.value)}
                                                value={data.category}
                                            >
                                                <option value="">{translate("Select Category")}</option>
                                                {filteredCategories.map((category) => (
                                                    <option key={`category_${category.key}`} value={category.key}>
                                                        {category.value}
                                                    </option>
                                                ))}
                                            </select>
                                            <FromValidationError message={errors.category} />
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
                                    <TagInput
                                        title={translate("Tags")}
                                        type="text"
                                        value={edited_post.tags}
                                        selectTag={(tags) => setData("tags", tags)}
                                        id="tags"
                                    />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Featured image")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
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
                                    <FromValidationError message={errors?.thumbnail_image} />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                        <div className="publish-button-group">
                            <div>
                                <DangerButton isLoading={processing && data.status === "0"} onClick={() => setData("status", "0")}>
                                    {translate("UnPublish")}
                                </DangerButton>
                                <SuccessButton isLoading={processing && data.status === "1"} onClick={() => setData("status", "1")}>
                                    {translate("Update")}
                                </SuccessButton>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
