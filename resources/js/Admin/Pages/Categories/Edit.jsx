import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import SuccessButton from "@/Admin/Components/Button/SuccessButton"
import { useState } from "react"
import { useEffect } from "react"
import translate from "@/utils/translate"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"

export default function Edit({ categories, default_lang, languages, category }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)

    const { data, setData, errors, put, processing } = useForm({
        ...category
    })

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.categories.update", category))
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
            <Head title="Edit categories" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit category")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
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
                                    <div className="form-group category-custom-select">
                                        <label>{translate("Parent Category")}</label>
                                        <div className="form-group form-group-md">
                                            <div className="yoo-select">
                                                <select
                                                    className="form-control"
                                                    id="category"
                                                    onChange={(e) => setData("parent_id", e.target.value)}
                                                    value={data.parent_id}
                                                >
                                                    <option value="">{translate("Select Category")}</option>
                                                    {categories.data.map((category) => (
                                                        <option key={`category_${category.value}`} value={category.value}>
                                                            {category.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <FromValidationError message={errors.parent_id} />
                                            </div>
                                        </div>
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
