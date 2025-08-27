import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm, Head } from "@inertiajs/react"
import SuccessButton from "@/Admin/Components/Button/SuccessButton"
import { useState } from "react"
import { useEffect } from "react"
import translate from "@/utils/translate"
import SingleMediaUploader from "@/Admin/Components/Media/SingleMediaUploader"
import { produce } from "immer"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import Editor from "@/Admin/Components/Inputs/Editor"
import { IonIcon } from "@ionic/react"
import { addOutline, closeOutline } from "ionicons/icons"

export default function Create({ default_lang, languages }) {
    const [selectedLang, setSelectedLang] = useState(default_lang)
    const [tempLang, setTempLang] = useState(selectedLang)

    const { data, setData, errors, post, processing } = useForm({
        payment_type: "custom_payment",
        status: "1",
        bank_information: [
            {
                bank_name: "",
                account_name: "",
                account_number: "",
                routing_number: "",
                branch_name: ""
            }
        ],

        ...Object.keys(languages).reduce((acc, code) => {
            acc[code + "_gateway_name"] = ""
            acc[code + "_instructions"] = ""
            return acc
        }, {})
    })

    // Handle adding new bank information entry
    const addNewBankInformation = (e) => {
        e.preventDefault()
        const newBankInfo = {
            bank_name: "",
            account_name: "",
            account_number: "",
            routing_number: "",
            branch_name: ""
        }

        setData(
            produce((draft) => {
                draft.bank_information.push(newBankInfo)
            })
        )
    }

    // Handle removing bank information entry
    const removeBankInformation = (index) => {
        if (data.bank_information.length > 1) {
            setData(
                produce((draft) => {
                    draft.bank_information.splice(index, 1)
                })
            )
        }
    }

    // Handle bank information field changes
    const handleBankInfoChange = (index, field, value) => {
        setData(
            produce((draft) => {
                draft.bank_information[index][field] = value
            })
        )
    }

    // Handle status toggle
    const handleStatusToggle = () => {
        setData("status", data.status === "1" ? "0" : "1")
    }

    // Handle form submission
    const handlePublish = (e) => {
        e.preventDefault()
        post(route("admin.manual.payment.gateway.store"))
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
            <Head title="Create Manual Payment Gateway" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Create Manual Payment Gateway")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Manual Payment Gateway Details")}</h2>
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
                                    <div className="form-group form-group-md">
                                        <label htmlFor="payment_type">{translate("Payment Type")}</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="payment_type"
                                                onChange={(e) => setData("payment_type", e.target.value)}
                                                value={data.payment_type}
                                            >
                                                <option value="custom_payment">{translate("Custom Payment")}</option>
                                                <option value="bank_payment">{translate("Bank Payment")}</option>
                                                <option value="cheque_payment">{translate("Cheque Payment")}</option>
                                            </select>
                                            <FromValidationError message={errors?.payment_type} />
                                        </div>
                                    </div>
                                    {data.payment_type === "bank_payment" && (
                                        <>
                                            <div className="form-group bank-info-wrapper">
                                                <label>{translate("Bank Information")}</label>
                                                {data.bank_information.map((bank, index) => (
                                                    <div key={index} className="bank-info-item card mb-3">
                                                        <div className="card-header d-flex justify-content-between align-items-center">
                                                            <h5 className="mb-0">{translate("Bank")} #{index + 1}</h5>
                                                            {data.bank_information.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-outline-danger"
                                                                    onClick={() => removeBankInformation(index)}
                                                                >
                                                                    <IonIcon icon={closeOutline} />
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>{translate("Bank Name")}</label>
                                                                        <TextInput
                                                                            type="text"
                                                                            value={bank.bank_name}
                                                                            onChange={(e) => handleBankInfoChange(index, "bank_name", e.target.value)}
                                                                            error={errors?.[`bank_information.${index}.bank_name`]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>{translate("Account Name")}</label>
                                                                        <TextInput
                                                                            type="text"
                                                                            value={bank.account_name}
                                                                            onChange={(e) => handleBankInfoChange(index, "account_name", e.target.value)}
                                                                            error={errors?.[`bank_information.${index}.account_name`]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>{translate("Account Number")}</label>
                                                                        <TextInput
                                                                            type="text"
                                                                            value={bank.account_number}
                                                                            onChange={(e) => handleBankInfoChange(index, "account_number", e.target.value)}
                                                                            error={errors?.[`bank_information.${index}.account_number`]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>{translate("Routing Number")}</label>
                                                                        <TextInput
                                                                            type="text"
                                                                            value={bank.routing_number}
                                                                            onChange={(e) => handleBankInfoChange(index, "routing_number", e.target.value)}
                                                                            error={errors?.[`bank_information.${index}.routing_number`]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label>{translate("Branch Name")}</label>
                                                                        <TextInput
                                                                            type="text"
                                                                            value={bank.branch_name}
                                                                            onChange={(e) => handleBankInfoChange(index, "branch_name", e.target.value)}
                                                                            error={errors?.[`bank_information.${index}.branch_name`]}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="text-start">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={addNewBankInformation}
                                                    >
                                                        {translate("Add New Bank")} <IonIcon icon={addOutline} />
                                                    </button>
                                                </div>
                                                <FromValidationError message={errors?.bank_information} />
                                            </div>
                                            <div className="yoo-height-b20 yoo-height-lg-b20" />
                                        </>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="gateway_name">
                                            {translate("Gateway Name")} ({languages[selectedLang].name}) *
                                        </label>
                                        <TextInput
                                            type="text"
                                            id="gateway_name"
                                            error={errors[`${selectedLang}_gateway_name`]}
                                            value={data[`${selectedLang}_gateway_name`]}
                                            onChange={(e) => setData(`${selectedLang}_gateway_name`, e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">{translate("Instructions")} ({languages[selectedLang].name}) *</label>
                                        <Editor
                                            onChange={(value) => setData(`${tempLang}_instructions`, value)}
                                            value={data[`${selectedLang}_instructions`]}
                                        />
                                        <FromValidationError message={errors[`${selectedLang}_instructions`]} />
                                    </div>
                                    <div className="form-group form-group-md">
                                        <div className="d-flex">
                                            <label htmlFor="status">{translate("Status")}: </label>
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
                                    <SuccessButton isLoading={processing && data.status === "1"}>{translate("Submit")}</SuccessButton>
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
