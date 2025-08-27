import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import translate from "@/utils/translate"
import { Head, Link } from "@inertiajs/react"

export default function Show({ contact }) {
    return (
        <AdminLayouts>
            <Head title="Contact Details" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">{translate("Details")}</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <ul className="yoo-contact-info-list yoo-mp0">
                    <li>
                        <div className="yoo-contact-info-label">{translate("Name")}</div>
                        <div className="yoo-contact-info-details">{contact.name}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Email")}</div>
                        <div className="yoo-contact-info-details">{contact.email}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Mobile Number")}</div>
                        <div className="yoo-contact-info-details">{contact.mobile_number}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">{translate("Project Type")}</div>
                        <div className="yoo-contact-info-details">{contact.project_type}</div>
                    </li>
                </ul>
                <div className="mt-3">
                    <strong>{translate("Message")}</strong> <br />
                    <p>{contact.message}</p>
                </div>

                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
