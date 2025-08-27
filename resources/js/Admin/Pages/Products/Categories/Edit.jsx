import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import SuccessButton from "@/Admin/Components/Button/SuccessButton"
import { useState, useEffect } from "react"
import translate from "@/utils/translate"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import FormValidationError from "@/Admin/Components/Validation/FromValidationError"
import { produce } from "immer"

export default function Edit({ category, default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)

    // Initialize form with existing category data
    const { data, setData, errors, put, processing } = useForm({
        ...category
    })

    // Handle update submission
    const handleUpdate = (e) => {
        e.preventDefault()
        put(route("admin.product.categories.update", category))
    }

    useEffect(() => {
        setSelectedLang(tempLang)
    }, [tempLang])

    useEffect(() => {
        if (errors) {
            const [firstKey] = Object.keys(errors)
            const [errorLang] = firstKey?.split("_") || []
            if (errorLang && errorLang !== default_lang && languages.hasOwnProperty(errorLang)) {
                setSelectedLang(errorLang)
            }
        }
    }, [errors, default_lang, languages])

    return (
        <AdminLayouts>
            <Head title="Edit Category" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit Category")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handleUpdate}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Category Details")}</h2>
                                </div>
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
                                    <div className="form-group">
                                        <label>{translate("Upload category image")} *</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.category_image = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.category_image = ""
                                                    })
                                                )
                                            }
                                            defaultValue={data.category_image}
                                        />
                                        <FormValidationError message={errors?.category_image} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="title">
                                            {translate("Title")} ({languages[selectedLang].name}) *
                                        </label>
                                        <TextInput
                                            title={`${translate("Enter category title")} *`}
                                            type="text"
                                            id="title"
                                            error={errors[`${selectedLang}_title`]}
                                            value={data[`${selectedLang}_title`]}
                                            onChange={(e) => setData(`${selectedLang}_title`, e.target.value)}
                                        />
                                    </div>
                                    <SuccessButton isLoading={processing}>{translate("Update Category")}</SuccessButton>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                </div>
                            </div>
                        </div>
                        <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
