import React from "react"
import { useSelector } from "react-redux"
import translate from "@/utils/translate"
import { usePage } from "@inertiajs/react"
import ContactInfoWidget from "../Widget/ContactInfoWidget"
import MenuWidget from "../Widget/MenuWidget"
import Newsletter from "../Widget/Newsletter"
import SocialWidget from "../Widget/SocialWidget"
import organizeMenusIntoHierarchy from "@/utils/organizeMenusIntoHierarchy"
import MenuItem from "../Widget/MenuItem"
import CookiePolicy from "../Cookie/CookiePolicy"
export default function Footer() {
    const { lang } = usePage().props
    const customize = useSelector((state) => state.customize)
    const { currentLang } = useSelector((state) => state.pages)
    const currentLanguage = currentLang ?? lang.default_lang
    const servicesMenu = localStorage.getItem("services_menu") ? JSON.parse(localStorage.getItem("services_menu")) : []
    const services_menu = servicesMenu ? organizeMenusIntoHierarchy(servicesMenu[currentLanguage]) : []

    const FooterMenu = localStorage.getItem("footer_menu") ? JSON.parse(localStorage.getItem("footer_menu")) : []
    const footer_menu = FooterMenu ? organizeMenusIntoHierarchy(FooterMenu[currentLanguage]) : []

    const resourcesMenu = localStorage.getItem("resources_menu") ? JSON.parse(localStorage.getItem("resources_menu")) : []
    const resources_menu = resourcesMenu ? organizeMenusIntoHierarchy(resourcesMenu[currentLanguage]) : []

    const usefulLinks = localStorage.getItem("useful_links") ? JSON.parse(localStorage.getItem("useful_links")) : []
    const useful_links = usefulLinks ? organizeMenusIntoHierarchy(usefulLinks[currentLanguage]) : []

    return (
        <footer className="cs_footer cs_primary_bg cs_ternary_color">
            <div className="cs_footer_main">
                <div className="container">
                    {Boolean(Number(customize?.footer?.footer_is_show_newslatter)) && (
                        <Newsletter
                            placeholder={translate("Email address")}
                            title={translate("Subscribe to our newsletter")}
                            btnClass="cs_btn cs_style_1 cs_type_2 cs_primary_color cs_white_bg"
                            titleClass="cs_newsletter_title cs_fs_53 cs_normal mb-0 cs_white_color"
                        />
                    )}
                    <div className="cs_footer_grid_4">
                        {customize?.footer?.footer_is_show_contact_logo_section && (
                            <div className="cs_footer_grid_item">
                                <div className="cs_footer_item">
                                    <div className="cs_text_widget">
                                        {customize.general.site_favicon && <img src={customize.general.site_logo_light} alt="Logo" />}
                                        <ContactInfoWidget />
                                    </div>
                                </div>
                            </div>
                        )}
                        {customize?.footer?.footer_is_show_useful_links_section && (
                            <div className="cs_footer_grid_item">
                                <div className="cs_footer_item">
                                    <MenuWidget menus={useful_links} title={translate("Useful Links")} />
                                </div>
                            </div>
                        )}
                        {customize?.footer?.footer_is_show_service_section && (
                            <div className="cs_footer_grid_item">
                                <div className="cs_footer_item">
                                    <MenuWidget menus={services_menu} title={translate("Service")} />
                                </div>
                            </div>
                        )}
                        {customize?.footer?.footer_is_show_resources_section && (
                            <div className="cs_footer_grid_item">
                                <div className="cs_footer_item">
                                    <MenuWidget menus={resources_menu} title={translate("Resources")} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="cs_bottom_footer_wrap">
                <div className="container">
                    <div className="cs_bottom_footer">
                        {customize.footer.footer_is_show_social_media == "1" && (
                            <div className="cs_bottom_footer_left">
                                <SocialWidget />
                            </div>
                        )}

                        <div
                            className="cs_copyright"
                            dangerouslySetInnerHTML={{
                                __html: customize.footer.copyright_text
                            }}
                        />

                        <div className="cs_bottom_footer_right">
                            <ul className="cs_footer_links cs_mp0">
                                {footer_menu.map((menu, index) => (
                                    <MenuItem key={index} menu={menu} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <CookiePolicy />
        </footer>
    )
}
