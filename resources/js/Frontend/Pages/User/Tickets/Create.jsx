import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import { Head, useForm, usePage } from "@inertiajs/react"
import React from "react"
import { useState } from "react"

export default function Create() {
    const { flash } = usePage().props
    const { data, setData, errors, post, processing, wasSuccessful } = useForm({
        subject: "",
        properly: "",
        message: "",
        documents: []
    })

    const handleFromSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("subject", data.subject)
        formData.append("properly", data.properly)
        formData.append("message", data.message)

        if (data.documents.length > 0) {
            Array.from(data.documents).forEach((file, index) => {
                formData.append(`documents[${index}]`, file)
            })
        }

        post(route("tickets.store"), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset("subject", "properly", "message", "documents")
                document.getElementById("documents").value = ""
            }
        })
    }
    // page header data
    let pageHeaderData = {
        title: translate("Open Ticket"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("User"), url: null },
            { label: translate("Open Ticket"), url: route("user.tickets.create") }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Open Tickets" />
            <div className="cs_dashboard_right">
                <div className="cs_dashboard_card">
                    <form onSubmit={handleFromSubmit} className="row cs_gap_y_20">
                        <div className="col-lg-6">
                            <label htmlFor="subject">{translate("Subject")}*</label>
                            <input
                                type="text"
                                id="subject"
                                className="cs_form_field cs_radius_20"
                                value={data.subject}
                                onChange={(e) => setData("subject", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.subject}</span>
                        </div>
                        <div className="col-lg-6">
                            <label htmlFor="properly">{translate("Priority")}*</label>
                            <select
                                id="properly"
                                className="cs_form_field cs_radius_20"
                                value={data.properly}
                                onChange={(e) => setData("properly", e.target.value)}
                            >
                                <option value="">{translate("Select Property")}</option>
                                <option value="high">High</option>
                                <option value="low">Low</option>
                            </select>
                            <span style={{ color: "red" }}>{errors.properly}</span>
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="message">{translate("Message")}*</label>
                            <textarea
                                cols={30}
                                rows={5}
                                id="message"
                                className="cs_form_field cs_radius_20"
                                defaultValue={""}
                                onChange={(e) => setData("message", e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.message}</span>
                        </div>
                        <div className="col-lg-12">
                            <label htmlFor="documents">{translate("Add Attachment (Optional)")}</label>
                            <input
                                type="file"
                                id="documents"
                                className="cs_form_field cs_radius_20"
                                accept="image/*,.pdf,.doc,.docx"
                                multiple
                                onChange={(e) => setData("documents", e.target.files)}
                            />
                            <span style={{ color: "red" }}>{errors.documents}</span>
                        </div>
                        {wasSuccessful && <span className="text-success">{flash.success}</span>}
                        <div className="col-lg-12 text-end">
                            {/* <Spacing lg="5" md="5" /> */}
                            <button type="submit" disabled={processing} className="cs_btn cs_style_1 cs_type_2 cs_primary_bg cs_white_color">
                                {translate("Submit")}
                                <span>
                                    <i>
                                        <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </i>
                                    <i>
                                        <svg width={11} height={11} viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M1 10L10 1M10 1L1 1M10 1L10 10"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </i>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </UserDashboardLayout>
    )
}
