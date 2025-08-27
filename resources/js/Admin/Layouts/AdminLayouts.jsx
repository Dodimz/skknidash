import Header from "@/Admin/Components/Header/index.jsx"
import Sidebar from "@/Admin/Components/Sidebar/Index.jsx"
import Footer from "@/Admin/Components/Footer/Index.jsx"
import toast, { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import {
    updateContact,
    updateFooter,
    updateGeneral,
    updateSidebar,
    updateSocialLink,
    updateSubscribe
} from "@/Redux/features/pages/Customize/customize"
import { useDispatch } from "react-redux"

export default function AdminLayouts({ children }) {
    const { props } = usePage()
    // const customizeSettings = localStorage.getItem('customize_settings') ? JSON.parse(localStorage.getItem('customize_settings')) : [];
    const dispatch = useDispatch()
    // show toast notification
    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success, {
                duration: 3000
            })
        } else if (props.flash.error) {
            toast.error(props.flash.error, {
                duration: 3000
            })
        }
    }, [props.flash])

    useEffect(() => {
        const customizeSettings = localStorage.getItem("customize_settings") ? JSON.parse(localStorage.getItem("customize_settings")) : []

        if (customizeSettings) {
            dispatch(updateGeneral(customizeSettings.general))
            dispatch(updateSidebar(customizeSettings.sidebar))
            dispatch(updateFooter(customizeSettings.footer))
            dispatch(updateContact(customizeSettings.contact))
            dispatch(updateSubscribe(customizeSettings.subscriber))
            dispatch(updateSocialLink(customizeSettings.social_links))
        }
    }, [dispatch])

    return (
        <>
            <div className="yoo-height-b60 yoo-height-lg-b60" />
            <Header />
            <Sidebar />
            <div className="yoo-content yoo-style1">
                {children}
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <Footer />
            </div>
            <Toaster />
        </>
    )
}
