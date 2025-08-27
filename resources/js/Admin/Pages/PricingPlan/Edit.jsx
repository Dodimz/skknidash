import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import { IonIcon } from "@ionic/react"
import { closeOutline } from "ionicons/icons"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import { useEffect } from "react"
import { useState } from "react"
import translate from "@/utils/translate"

export default function Create({ edited_pricingPlan, currencies, default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)
    const { data, setData, errors, put, processing } = useForm({
        ...edited_pricingPlan
    })

    // handle add new feature
    const addNewFeature = () => {
        const currentItems = [...data[`${selectedLang}_plan_features`], ""]
        setData(`${selectedLang}_plan_features`, currentItems)
    }

    // remove feature
    const removeFeature = (index) => {
        if (index > 0) {
            const currentItems = [...data[`${selectedLang}_plan_features`]]
            currentItems.splice(index, 1)
            setData(`${selectedLang}_plan_features`, currentItems)
        }
    }

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.pricing.plans.update", edited_pricingPlan))
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
            <Head title="Update Pricing Plan" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Update Pricing Plan")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Pricing Plan Details")}</h2>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <TextInput
                                                title={`${translate("Price")} *`}
                                                type="number"
                                                id="price"
                                                error={errors?.price}
                                                value={data.price}
                                                onChange={(e) => setData("price", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group form-group-md">
                                                <div className="yoo-select">
                                                    <select
                                                        className="form-control"
                                                        value={data.select_currency}
                                                        onChange={(e) => setData("select_currency", e.target.value)}
                                                    >
                                                        <option value="">{translate("Select Currency")}</option>
                                                        {currencies.map((currency, index) => (
                                                            <option key={index} value={currency.id}>
                                                                {currency.name} ( {currency.code} )
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <FromValidationError message={errors?.select_currency} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>
                                                {translate("Plan name")} ({languages[selectedLang].name}):{" "}
                                            </label>
                                            <TextInput
                                                title={`${translate("Name")} *`}
                                                type="text"
                                                id="name"
                                                error={errors[`${selectedLang}_name`]}
                                                value={data[`${selectedLang}_name`]}
                                                onChange={(e) => setData(`${selectedLang}_name`, e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="plan_duration">
                                                {translate("Plan Duration")} ({languages[selectedLang].name}):{" "}
                                            </label>
                                            <TextInput
                                                title={`${translate("Plan Duration")} *`}
                                                type="text"
                                                id="plan_duration"
                                                error={errors[`${selectedLang}_plan_duration`]}
                                                value={data[`${selectedLang}_plan_duration`]}
                                                onChange={(e) => setData(`${selectedLang}_plan_duration`, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <label>
                                        {translate("Plan subtitle")} ({languages[selectedLang].name}):{" "}
                                    </label>
                                    <TextInput
                                        title={`${translate("Plan subtitle")} *`}
                                        type="text"
                                        id="subtitle"
                                        error={errors[`${selectedLang}_subtitle`]}
                                        value={data[`${selectedLang}_subtitle`]}
                                        onChange={(e) => setData(`${selectedLang}_subtitle`, e.target.value)}
                                    />
                                    <div className="form-group plan-wrap">
                                        <label>
                                            {translate("Plan feature")} ({languages[selectedLang].name}):{" "}
                                        </label>
                                        {data[`${selectedLang}_plan_features`].map((item, fIndex) => (
                                            <div key={fIndex} className="feature-list-wrap d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    id={`item_${fIndex}`}
                                                    onChange={(e) => {
                                                        const currentItems = [...data[`${selectedLang}_plan_features`]]
                                                        currentItems[fIndex] = e.target.value
                                                        setData(`${selectedLang}_plan_features`, currentItems)
                                                    }}
                                                    value={item}
                                                />
                                                {fIndex > 0 && (
                                                    <button
                                                        type="button"
                                                        style={{
                                                            marginTop: "10PX",
                                                            background: "transparent",
                                                            height: "40px",
                                                            border: "none",
                                                            color: "red",
                                                            fontSize: "20px",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            outline: "none",
                                                            outlineColor: "initial",
                                                            outlineStyle: "none",
                                                            outlineWidth: "initial"
                                                        }}
                                                        onClick={() => removeFeature(fIndex)}
                                                    >
                                                        <IonIcon
                                                            icon={closeOutline}
                                                            style={{
                                                                width: "28px",
                                                                height: "28px",
                                                                marginBottom: "14px"
                                                            }}
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <div className="text-start">
                                            <a href="#" className="btn btn-sm btn-outline-primary" onClick={addNewFeature}>
                                                {translate("Add new")} <span className="yoo-add">+</span>
                                            </a>
                                        </div>
                                        <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-success">
                                            {translate("Update")}
                                        </button>
                                    </div>
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
