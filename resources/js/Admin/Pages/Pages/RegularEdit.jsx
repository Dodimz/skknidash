import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, useForm } from "@inertiajs/react"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import SuccessButton from "@/Admin/Components/Button/SuccessButton.jsx"
import { useEffect } from "react"
import { useState } from "react"
import translate from "@/utils/translate"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"

export default function RegularEdit({ page, default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const languagesArr = Object.entries(languages)

    const { data, setData, errors, post, processing } = useForm({
        _method: "put",
        pageInfo: Object.keys(languages).reduce((acc, lang) => {
            // Populate with existing page content if available
            const existingContent = page.contents.find((content) => content.language_code === lang) || {}

            acc[lang] = {
                title: existingContent.title || "",
                breadcrumb_title: existingContent.breadcrumb_title || null,
                header_action_button_text: existingContent.header_action_button_text || null,
                header_action_button_url: existingContent.header_action_button_url || null,
                meta_title: existingContent.meta_title || null,
                meta_description: existingContent.meta_description || null,
                meta_tags: existingContent.meta_tags || null,
                meta_image: page.meta_image || null,
                is_show_breadcrumb: page.is_show_breadcrumb === "1",
                breadcrumb_image: page.breadcrumb_image || null,
                header_layout: page.header_layout || 1,
                footer_layout: page.footer_layout || 1
            }
            return acc
        }, {}),
        pageData: Object.keys(languages).reduce((acc, lang) => {
            acc[lang] = {}
            return acc
        }, {})
    })

    // handle update
    const handleUpdate = (e) => {
        e.preventDefault()

        post(route("admin.pages.update", page))
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

    return (
        <AdminLayouts>
            <Head title={`Edit ${page?.content?.title}`} />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">
                        {translate("Edit")} {page?.content?.title}
                    </h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handleUpdate}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">
                                        {page?.content?.title} {translate("Details")}
                                    </h2>
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
                                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                                <div className="yoo-padd-lr-20">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput
                                                title={`${translate("Title")} *`}
                                                type="text"
                                                id="title"
                                                error={errors[`pageInfo.${selectedLang}.title`]}
                                                value={data.pageInfo[selectedLang]?.title || ""}
                                                onChange={(e) =>
                                                    setData("pageInfo", {
                                                        ...data.pageInfo,
                                                        [selectedLang]: {
                                                            ...data.pageInfo[selectedLang],
                                                            title: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput
                                                title={translate("Meta Title")}
                                                type="text"
                                                id="meta_title"
                                                error={errors[`pageInfo.${selectedLang}.meta_title`]}
                                                value={data.pageInfo[selectedLang]?.meta_title || ""}
                                                onChange={(e) =>
                                                    setData("pageInfo", {
                                                        ...data.pageInfo,
                                                        [selectedLang]: {
                                                            ...data.pageInfo[selectedLang],
                                                            meta_title: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput
                                                title={translate("Meta Description")}
                                                type="text"
                                                id="meta_description"
                                                error={errors[`pageInfo.${selectedLang}.meta_description`]}
                                                value={data.pageInfo[selectedLang]?.meta_description || ""}
                                                onChange={(e) =>
                                                    setData("pageInfo", {
                                                        ...data.pageInfo,
                                                        [selectedLang]: {
                                                            ...data.pageInfo[selectedLang],
                                                            meta_description: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TextInput
                                                title={translate("Meta Tags")}
                                                type="text"
                                                id="meta_tags"
                                                error={errors[`pageInfo.${selectedLang}.meta_tags`]}
                                                value={data.pageInfo[selectedLang]?.meta_tags || ""}
                                                onChange={(e) =>
                                                    setData("pageInfo", {
                                                        ...data.pageInfo,
                                                        [selectedLang]: {
                                                            ...data.pageInfo[selectedLang],
                                                            meta_tags: e.target.value
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <label htmlFor="">Meta Image</label>
                                    <SingleMediaUploader
                                        onSelected={(e) => {
                                            setData("pageInfo", {
                                                ...data.pageInfo,
                                                [selectedLang]: {
                                                    ...data.pageInfo[selectedLang],
                                                    meta_image: e
                                                }
                                            })
                                        }}
                                        handleRemoved={() =>
                                            setData("pageInfo", {
                                                ...data.pageInfo,
                                                [selectedLang]: {
                                                    ...data.pageInfo[selectedLang],
                                                    meta_image: ""
                                                }
                                            })
                                        }
                                        defaultValue={data.pageInfo[selectedLang]?.meta_image}
                                    />
                                    <FromValidationError message={errors[`pageInfo.${selectedLang}.meta_image`]} />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="publish-button-group">
                                        <div>
                                            <SuccessButton isLoading={processing}>{translate("Update")}</SuccessButton>
                                        </div>
                                    </div>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
