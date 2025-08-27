import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head, Link } from "@inertiajs/react"
import "./style.scss"

export default function index({ themes }) {
    return (
        <AdminLayouts>
            <Head title="Themes" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Themes</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <div className="row">
                    {themes.map((theme, index) => (
                        <div key={index} className="col-xl-3 col-lg-4 col-sm-6 mb-4 single-theme-list">
                            <div className="theme-wrap">
                                <img src={theme.thumbnail_image} alt="" />
                                <div className="theme-bottom-bar">
                                    <h2 className="theme-name">
                                        {theme.is_active === "1" && <span>Active: </span>}
                                        {theme.name}
                                    </h2>
                                    <div className="theme-action-button">
                                        {theme.is_active === "1" ? (
                                            <Link href={route("admin.pages.edit", 1)} className="btn btn-sm btn-primary">
                                                Customize
                                            </Link>
                                        ) : (
                                            <Link href={route("admin.themes.activate", theme)} className="btn btn-sm btn-success">
                                                Activate
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
