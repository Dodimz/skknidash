import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { Head } from "@inertiajs/react"

export default function Show({ response }) {
    // Handle the response data whether it's a string or already parsed object
    const getResponseData = () => {
        try {
            if (typeof response.response_data === "string") {
                return JSON.parse(response.response_data)
            }
            return response.response_data
        } catch (error) {
            console.error("Error parsing response data:", error)
            return {}
        }
    }

    const responseData = getResponseData()

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    const convertToTitleCase = (str) => {
        return str.split("_").map(capitalizeFirstLetter).join(" ")
    }

    const formatValue = (value) => {
        if (Array.isArray(value)) {
            return value.join(", ")
        }
        if (value === null || value === undefined) {
            return ""
        }
        if (typeof value === "object") {
            return JSON.stringify(value)
        }
        return value
    }

    const filteredKeys = responseData ? Object.keys(responseData).filter((key) => key !== "captchaToken") : []

    return (
        <AdminLayouts>
            <Head title="Response Details" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Details")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                {responseData ? (
                    <ul className="yoo-contact-info-list yoo-mp0">
                        {filteredKeys.map((key, index) => (
                            <li key={index}>
                                <div className="yoo-contact-info-label">{convertToTitleCase(key)}</div>
                                <div className="yoo-contact-info-details">{formatValue(responseData[key])}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No response data available</p>
                )}

                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
