import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import SuccessButton from "@/Admin/Components/Button/SuccessButton"
import { useState } from "react"
import { useEffect } from "react"

export default function Create({ default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const languagesArr = Object.entries(languages)
    const { data, setData, errors, post, processing } = useForm({
        ...Object.keys(languages).reduce((lang, code) => {
            lang[code + "_title"] = ""
            return lang
        }, {})
    })

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        post(route("admin.services.categories.store"))
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
            <Head title="Create categories" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Create category</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">Category Details</h2>
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
                                    <div className="form-group">
                                        <label>Title ({languages[selectedLang].name}) *</label>
                                        <TextInput
                                            title="Enter category title"
                                            type="text"
                                            id="email"
                                            error={errors[`${selectedLang}_title`]}
                                            value={data[`${selectedLang}_title`]}
                                            onChange={(e) => setData(`${selectedLang}_title`, e.target.value)}
                                        />
                                    </div>
                                    <SuccessButton isLoading={processing && data.status === "1"}>Add New Category</SuccessButton>
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
