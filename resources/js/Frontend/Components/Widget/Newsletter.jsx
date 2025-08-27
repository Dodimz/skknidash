import React from "react"
import { useForm, usePage } from "@inertiajs/react"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"

export default function Newsletter({ placeholder, title, variant, btnClass, titleClass }) {
    const { flash } = usePage().props
    const subscriber = useSelector((state) => state.customize.subscriber)
    const { errors, data, setData, post, processing, wasSuccessful, reset } = useForm({
        email: ""
    })

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("subscribe"), {
            preserveScroll: true,
            onSuccess: () => {
                reset("email")
            }
        })
    }
    return (
        <>
            <div className={`cs_newsletter cs_style_1 ${variant ? variant : ""}`}>
                <h2
                    className={titleClass}
                    dangerouslySetInnerHTML={{
                        __html: title
                    }}
                />
                <form onSubmit={handleSubmit} className="cs_newsletter_form">
                    <input
                        type="email"
                        onChange={(e) => setData("email", e.target.value)}
                        value={data.email}
                        className="cs_newsletter_input"
                        placeholder={placeholder}
                    />
                    <button disabled={processing} className={btnClass}>
                        {translate("Subscribe Now")}
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
                    {errors.email && <span className="text-danger">{errors.email}</span>}
                    {wasSuccessful && <span className="text-success">{flash.success}</span>}
                </form>
            </div>
        </>
    )
}
