import { useForm, Head } from "@inertiajs/react"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import TextInput from "@/Admin/Components/Inputs/TextInput"
import translate from "@/utils/translate"

export default function Create({ edited_lang, languages }) {
    const { data, setData, errors, put, processing } = useForm({
        name: edited_lang?.name,
        language: edited_lang?.code,
        is_ltr: edited_lang?.is_ltr
    })

    // handle publish
    const handlePublish = (e) => {
        e.preventDefault()
        put(route("admin.languages.update", { language: data.language }))
    }

    return (
        <AdminLayouts>
            <Head title="Edit Language" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Edit Language")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Language Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <label htmlFor="name">{translate("Language Name")}</label>
                                    <TextInput
                                        title={translate("Language Name")}
                                        type="text"
                                        id="name"
                                        error={errors?.name}
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                    />
                                    <div className="form-group form-group-md">
                                        <label htmlFor="language">{translate("Languages")}</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="language"
                                                onChange={(e) => setData("language", e.target.value)}
                                                value={data.language}
                                                disabled
                                            >
                                                <option value="">{translate("Select language")}</option>
                                                {languages.map((language, index) => (
                                                    <option key={index} value={language.code}>
                                                        {language.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <FromValidationError message={errors?.language} />
                                        </div>
                                    </div>
                                    <div className="form-group form-group-md">
                                        <label htmlFor="is_ltr">{translate("Direction")}</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="is_ltr"
                                                onChange={(e) => setData("is_ltr", e.target.value)}
                                                value={data.is_ltr}
                                            >
                                                <option value="">{translate("Select direction")}</option>
                                                <option value="yes">LTR ( Left To Right )</option>
                                                <option value="no">RTL ( Right To Left )</option>
                                            </select>
                                            <FromValidationError message={errors?.is_ltr} />
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit" disabled={processing} className="btn btn-success">
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
