import TextInput from "@/Admin/Components/Inputs/TextInput"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { Head, useForm } from "@inertiajs/react"
import React from "react"

export default function Create() {
    const { data, setData, errors, processing, post } = useForm({
        tag_name: ""
    })

    const handlePublish = (e) => {
        e.preventDefault()
        post(route("admin.product.tags.store"))
    }

    return (
        <AdminLayouts>
            <Head title="Create Tag" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Create Tag")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <form className="row" onSubmit={handlePublish}>
                    <div className="col-lg-8">
                        <div className="yoo-card yoo-style1">
                            <div className="yoo-card-heading">
                                <div className="yoo-card-heading-left">
                                    <h2 className="yoo-card-title">{translate("Tag Details")}</h2>
                                </div>
                            </div>
                            <div className="yoo-card-body">
                                <div className="yoo-padd-lr-20">
                                    <label htmlFor="tag_name">{translate("Tag Name")}</label>
                                    <TextInput
                                        title="Enter Tag Name"
                                        type="text"
                                        id="tag_name"
                                        error={errors.tag_name}
                                        value={data.tag_name}
                                        onChange={(e) => setData("tag_name", e.target.value)}
                                    />
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <button type="submit" disabled={processing} className="btn btn-success">
                                        {translate("Submit")}
                                    </button>
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
