import MediaPopup from "@/Admin/Components/Media/MediaPopup"
import AdminLayouts from "@/Admin/Layouts/AdminLayouts"
import { Head } from "@inertiajs/react"

export default function Media() {
    return (
        <AdminLayouts>
            <Head title="Media Library" />
            <div className="media-library-page">
                <MediaPopup defaultMedia="" isShow={true} />
            </div>
        </AdminLayouts>
    )
}
