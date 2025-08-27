import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, useForm } from "@inertiajs/react"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import { useState } from "react"
import { useEffect } from "react"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import { produce } from "immer"
import translate from "@/utils/translate"

export default function Edit({ testimonial, default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const languagesArr = Object.entries(languages)
    const { data, setData, errors, post, processing } = useForm({
        _method: "put",
        ...testimonial
    })

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("admin.testimonials.update", testimonial))
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
            <Head title="Edit testimonial" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit testimonial")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="card">
                                <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span>{translate("Testimonial details")}</span>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ backgroundColor: "#f2f2f6" }}>
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
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="">{translate("Client image")}</label>
                                        <SingleMediaUploader
                                            onSelected={(e) => {
                                                setData(
                                                    produce((draft) => {
                                                        draft.client_image = e
                                                    })
                                                )
                                            }}
                                            handleRemoved={() =>
                                                setData(
                                                    produce((draft) => {
                                                        draft.client_image = ""
                                                    })
                                                )
                                            }
                                            defaultValue={data.client_image}
                                        />
                                        {errors?.client_image && <span className="text-danger">{errors.client_image}</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="rating">{translate("Rating")} *</label>
                                                <TextInput
                                                    title={`${translate("Rating")} *`}
                                                    type="number"
                                                    id="rating"
                                                    error={errors?.rating}
                                                    value={data.rating}
                                                    onChange={(e) => setData("rating", e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name">
                                                    {translate("Client Name")} ({languages[selectedLang].name}) *
                                                </label>
                                                <TextInput
                                                    title={`${translate("Client Name")} *`}
                                                    type="text"
                                                    id="name"
                                                    error={errors[`${selectedLang}_client_name`]}
                                                    value={data[`${selectedLang}_client_name`]}
                                                    onChange={(e) => setData(`${selectedLang}_client_name`, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="designation">
                                                    {translate("Client Designation")} ({languages[selectedLang].name}) *
                                                </label>
                                                <TextInput
                                                    title={`${translate("Client Designation")} *`}
                                                    type="text"
                                                    id="designation"
                                                    error={errors[`${selectedLang}_client_designation`]}
                                                    value={data[`${selectedLang}_client_designation`]}
                                                    onChange={(e) => setData(`${selectedLang}_client_designation`, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">
                                            {translate("Review Description")} ({languages[selectedLang].name})
                                        </label>
                                        <textarea
                                            name=""
                                            id=""
                                            className="form-control"
                                            value={data[`${selectedLang}_description`]}
                                            onChange={(e) => setData(`${selectedLang}_description`, e.target.value)}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="card-footer text-right">
                                    <button type="submit" disabled={processing} className="btn btn-sm btn-success">
                                        {translate("Update")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayouts>
    )
}
