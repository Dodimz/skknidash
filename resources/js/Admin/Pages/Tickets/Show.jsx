import SuccessButton from "@/Admin/Components/Button/SuccessButton"
import Editor from "@/Admin/Components/Inputs/Editor"
import FromValidationError from "@/Admin/Components/Validation/FromValidationError"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Icon } from "@iconify/react"
import { Head, useForm } from "@inertiajs/react"
import moment from "moment"
import React from "react"

export default function Show({ ticket }) {
    const { data, setData, errors, post, processing, reset } = useForm({
        documents: [],
        message: "",
        status: ticket?.status
    })

    // handle publish
    const handleFromSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("message", data.message)

        if (data.documents.length > 0) {
            Array.from(data.documents).forEach((file, index) => {
                formData.append(`documents[${index}]`, file)
            })
        }

        post(route("admin.tickets.submit.reply", ticket), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => reset("message", "documents")
        })
    }
    return (
        <AdminLayouts>
            <Head title="Ticket Reply" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container">
                <div className="yoo-uikits-heading">
                    <h3 className="mb-md-0 fs-20 fw-700 text-dark">
                        #{ticket?.generate_id} ({ticket?.subject})
                    </h3>
                    <div className="mt-4 fs-14 d-flex">
                        <div className="mt-1 d-flex">
                            <h6 className="fw-700 text-dark">{ticket?.user?.name}</h6>
                            <span className="ml-3 text-secondary">{moment(ticket.created_at).format("dddd, Do MMMM YYYY [@] h:mm A z")}</span>
                        </div>
                        <span
                            className={`badge ml-3 ${
                                ticket?.status === "pending"
                                    ? "badge-warning"
                                    : ticket?.status === "open"
                                    ? "badge-info"
                                    : ticket?.status === "solved"
                                    ? "badge-success"
                                    : "badge-dark"
                            }`}
                        >
                            {ticket?.status}
                        </span>
                    </div>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>

                <div className="">
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-body">
                            <div className="yoo-padd-lr-20">
                                <form className="" onSubmit={handleFromSubmit}>
                                    <div className="yoo-height-b20 yoo-height-lg-b20" />
                                    <div className="form-group">
                                        <label>Ticket Reply</label>
                                        <Editor onChange={(data) => setData("message", data)} />
                                        <FromValidationError message={errors?.message} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">
                                            Add Attachment (Optional)
                                        </label>
                                        <div className="form-group form-group-file">
                                            <label for="replyTicketFileUpload">Chose File</label>
                                            <input
                                                type="file"
                                                className="form-control-file ml-1"
                                                id="replyTicketFileUpload"
                                                accept="image/*,.pdf,.doc,.docx"
                                                multiple
                                                onChange={(e) => setData("documents", e.target.files)}
                                            />
                                            <FromValidationError message={errors?.documents} />
                                        </div>
                                    </div>

                                    <div className="form-group form-group-md">
                                        <label htmlFor="exampleFormControlSelect1">Update Status:</label>
                                        <div className="yoo-select">
                                            <select
                                                className="form-control"
                                                id="exampleFormControlSelect1"
                                                onChange={(e) => setData("status", e.target.value)}
                                                value={data.status}
                                            >
                                                <option value="open">Open</option>
                                                <option value="solved">Solved</option>
                                            </select>
                                            <FromValidationError message={errors?.status} />
                                        </div>
                                    </div>

                                    <div className="form-group text-right mt-4">
                                        <SuccessButton isLoading={processing} type="submit">
                                            Send Reply
                                        </SuccessButton>
                                    </div>
                                </form>
                                <div className="yoo-height-b20 yoo-height-lg-b20" />

                                {/* Display replies below the form */}
                                <ul className="mt-4" style={{ listStyle: "none" }}>
                                    {ticket?.replies?.length > 0 ? (
                                        ticket?.replies
                                            ?.slice()
                                            .reverse()
                                            .map((reply, index) => (
                                                <li key={index} className="reply-card">
                                                    <div className="d-flex">
                                                        <div className="yoo-profile-nav-img">
                                                            <img
                                                                src={reply?.user?.image_url}
                                                                style={{
                                                                    width: "50px",
                                                                    height: "50px",
                                                                    borderRadius: "50%"
                                                                }}
                                                                alt="profile"
                                                            />
                                                        </div>
                                                        <div className="comment-header ml-3">
                                                            <h6 className="fw-700 text-dark">{reply.user?.name || "Unknown User"}</h6>
                                                            <span className="text-secondary mt-2">
                                                                {moment(reply.created_at).format("dddd, Do MMMM YYYY [@] h:mm A z")}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="mt-3"
                                                        dangerouslySetInnerHTML={{
                                                            __html: reply?.reply
                                                        }}
                                                    ></div>
                                                    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                                                        {reply?.documents &&
                                                            JSON.parse(reply.documents).map((document, docIndex) => (
                                                                <div key={docIndex}>
                                                                    <a href={`/${document}`} target="_blank" rel="noopener noreferrer" download>
                                                                        <Icon
                                                                            icon="fa6-regular:file"
                                                                            style={{ marginBottom: "4px", marginRight: "5px" }}
                                                                        />{" "}
                                                                        <span>Attachment {docIndex + 1}</span>
                                                                    </a>
                                                                </div>
                                                            ))}
                                                    </div>
                                                    <br />
                                                    <br />
                                                </li>
                                            ))
                                    ) : (
                                        <li className="list-group-item mb-5">No replies yet.</li>
                                    )}

                                    {/* Ticket Description */}
                                    {ticket && (
                                        <li className="reply-card">
                                            <div className="mt-4 mb-4">
                                                <div className="d-flex">
                                                    <div
                                                        className="yoo-profile-nav-img"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    >
                                                        <img
                                                            src={ticket?.user?.image_url}
                                                            style={{
                                                                width: "50px",
                                                                height: "50px",
                                                                borderRadius: "50%"
                                                            }}
                                                            alt="profile"
                                                        />
                                                    </div>
                                                    <div className="comment-header ml-3">
                                                        <h6 className="fw-700 text-dark">{ticket?.user?.name}</h6>
                                                        <span className="text-secondary mt-2">
                                                            {moment(ticket?.created_at).format("dddd, Do MMMM YYYY [@] h:mm A z")}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="mt-3"
                                                    dangerouslySetInnerHTML={{
                                                        __html: ticket?.message
                                                    }}
                                                ></div>
                                                <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                                                    {ticket?.documents &&
                                                        JSON.parse(ticket?.documents).map((document, docIndex) => (
                                                            <div key={docIndex}>
                                                                <a href={`/${document}`} target="_blank" rel="noopener noreferrer" download>
                                                                    <Icon
                                                                        icon="fa6-regular:file"
                                                                        style={{ marginBottom: "4px", marginRight: "5px" }}
                                                                    />{" "}
                                                                    <span>Attachment {docIndex + 1}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayouts>
    )
}
