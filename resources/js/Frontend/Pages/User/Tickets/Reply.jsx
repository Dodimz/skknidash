import { Head, useForm, usePage } from "@inertiajs/react"
import React from "react"
import moment from "moment"
import { Icon } from "@iconify/react"
import UserDashboardLayout from "@/Frontend/Layouts/UserDashboardLayout"
import translate from "@/utils/translate"
import DOMPurify from "dompurify"

export default function Reply({ ticket }) {
    const { flash } = usePage().props
    const { data, setData, errors, post, processing, wasSuccessful, reset } = useForm({
        message: "",
        documents: []
    })

    const handleFromSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("message", data.message)

        if (data.documents.length > 0) {
            Array.from(data.documents).forEach((file, index) => {
                formData.append(`documents[${index}]`, file)
            })
        }

        post(route("tickets.submit.reply", ticket), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset("message", "documents")
        })
    }
    // page header data
    let pageHeaderData = {
        title: translate("Reply Ticket"),
        breadcrumb: [
            { label: translate("Home"), url: "/" },
            { label: translate("User"), url: null },
            { label: translate("Reply Ticket"), url: route("tickets.reply", ticket.id) }
        ]
    }

    return (
        <UserDashboardLayout pageHeaderData={pageHeaderData}>
            <Head title="Reply Ticket" />
            <div className="cs_dashboard_right">
                <div className="cs_dashboard_card">
                    <form onSubmit={handleFromSubmit} className="row cs_gap_y_20">
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
                                {translate("Submit Reply")}
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
                {ticket?.replies
                    ?.slice()
                    .reverse()
                    .map((reply, index) => (
                        <div key={index} className="card mt-4 border-0 bg-transparent">
                            <div className="single-reply">
                                <div className="left">
                                    <h6>{reply?.user?.name}</h6>
                                </div>
                                <div className="right">
                                    <small>
                                        {translate("Posted on")} {moment(reply?.created_at).format("dddd, Do MMMM YYYY [@] h:mm A z")}
                                    </small>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(reply?.reply)
                                        }}
                                    ></p>
                                    <div className="documents">
                                        {reply?.documents &&
                                            JSON.parse(reply.documents).map((document, docIndex) => (
                                                <div key={docIndex}>
                                                    <a href={`/${document}`} target="_blank" rel="noopener noreferrer" download>
                                                        <Icon
                                                            icon="fa6-regular:file"
                                                            style={{
                                                                marginBottom: "4px",
                                                                marginRight: "5px"
                                                            }}
                                                        />{" "}
                                                        <span>
                                                            {translate("Attachment")} {docIndex + 1}
                                                        </span>
                                                    </a>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </UserDashboardLayout>
    )
}
