import { IonIcon } from "@ionic/react"
import { trashOutline } from "ionicons/icons"
import { showAlert } from "@/Admin/Utils/SweetAlert.js"
import { router } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function DeleteButton({ href }) {
    const handleDelete = () => {
        showAlert(`${translate("Are you sure")}?`, `${translate("You want to delete this item")}?`, translate("Delete") + "!", () => {
            router.delete(href)
        })
    }
    return (
        <a href="#" onClick={() => handleDelete()} className="badge badge-danger yoo-tooltip-wrap">
            <IonIcon
                icon={trashOutline}
                style={{
                    height: "16px",
                    width: "16px"
                }}
            />
            <span className="yoo-tooltip-body">Delete</span>
        </a>
    )
}
