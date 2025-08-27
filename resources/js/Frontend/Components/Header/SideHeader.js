import React from "react"
import { Link } from "@inertiajs/react"
import SocialWidget from "../Widget/SocialWidget"
import translate from "@/utils/translate"
import { Icon } from "@iconify/react"
import Newsletter from "../Widget/Newsletter"

export default function SideHeader({ sideHeaderToggle, setSideHeaderToggle, customize }) {
    return (
        <div className={`cs_side_header${sideHeaderToggle ? " active" : ""}`}>
            <button className="cs_close" onClick={() => setSideHeaderToggle(!sideHeaderToggle)} />
            <div className="cs_side_header_overlay" onClick={() => setSideHeaderToggle(!sideHeaderToggle)} />
            <div className="cs_side_header_in">
                {Boolean(Number(customize.sidebar.is_show_logo)) && (
                    <Link className="cs_site_branding" to="/" href="/">
                        <img src={customize?.general?.site_logo_dark} alt="Logo" />
                    </Link>
                )}
                {Boolean(Number(customize?.sidebar?.is_show_contact_info)) && (
                    <>
                        <div className="cs_side_header_box">
                            <h2 className="cs_side_header_heading">{translate("Do you have a project in your mind? Keep connect us.")}</h2>
                        </div>
                        <div className="cs_side_header_box">
                            <h3 className="cs_side_header_title cs_primary_color">{translate("Contact Us")}</h3>
                            <ul className="cs_side_header_contact_info cs_mp0">
                                {customize?.contact?.contact_phone_number && (
                                    <li>
                                        <i className="cs_center">
                                            <Icon icon="lucide:phone" width="20" height="20" />
                                        </i>
                                        <span>
                                            <a href={`tel:${customize?.contact?.contact_phone_number}`}>{customize?.contact?.contact_phone_number}</a>
                                        </span>
                                    </li>
                                )}
                                {customize?.contact?.contact_email && (
                                    <li>
                                        <i className="cs_center">
                                            <Icon icon="lucide:mail" width="20" height="20" />
                                        </i>
                                        <span>
                                            <a href={`mailto:${customize?.contact?.contact_email}`}>{customize?.contact?.contact_email}</a>
                                        </span>
                                    </li>
                                )}
                                {customize?.contact?.contact_address && (
                                    <li>
                                        <i className="cs_center">
                                            <Icon icon="lucide:map-pin" width="20" height="20" />
                                        </i>
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: customize?.contact?.contact_address
                                            }}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </>
                )}
                {Boolean(Number(customize?.sidebar?.is_show_subscribe)) && (
                    <div className="cs_side_header_box">
                        <Newsletter
                            placeholder={translate("Email address")}
                            title={translate("Get early access")}
                            variant="cs_type_1"
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_white_color cs_primary_bg"
                            titleClass="cs_side_header_title cs_primary_color"
                        />
                        <div className="cs_newsletter_text" style={{ marginTop: "15px" }}>
                            {translate("Stay updated with our latest news and offers.")}
                        </div>
                    </div>
                )}
                {Boolean(Number(customize.sidebar.is_show_social_media)) && (
                    <div className="cs_side_header_box">
                        <h3 className="cs_side_header_title cs_primary_color">{translate("Follow Us")}</h3>
                        <SocialWidget />
                    </div>
                )}
            </div>
        </div>
    )
}
