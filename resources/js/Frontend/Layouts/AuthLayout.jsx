import { Link, usePage } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { updateGeneral } from "@/Redux/features/pages/Customize/customize"
import { useDispatch, useSelector } from "react-redux"
import NavigationLink from "@/Components/NavigationLink"
import Footer from "../Components/Footer"

export default function AuthLayout({ children }) {
    const customize = localStorage.getItem("customize_settings") ? JSON.parse(localStorage.getItem("customize_settings")) : []
    const [footer, setFooter] = useState({})
    const { lang } = usePage().props
    const dispatch = useDispatch()
    const defaultLang = lang?.default_lang || "en"
    const { auth_bg_image } = JSON.parse(localStorage.getItem("page_settings")) || {}

    useEffect(() => {
        const headerFooterData = localStorage.getItem("header_footer")
        const headerFooter = headerFooterData ? JSON.parse(headerFooterData) : { footers: {} }
        const generalSettings = localStorage.getItem("general_settings") ? JSON.parse(localStorage.getItem("general_settings")) : {}
        dispatch(updateGeneral(generalSettings))
        setFooter(headerFooter.footers[defaultLang] || {})
    }, [dispatch])

    return (
        <>
            <div className="cs_auth_card">
                <div className="cs_card_left">
                    <div className="cs_card_card_out">
                        <NavigationLink href={route("home")} className="cs_login_logo">
                            <img src={customize?.general?.site_logo_dark} alt="" />
                        </NavigationLink>
                        {children}
                    </div>
                </div>
                <div className="cs_card_right cs_bg_filed" style={{ backgroundImage: `url(${auth_bg_image})` }} />
            </div>
            {footer?.data && <Footer data={footer.data} />}
        </>
    )
}
