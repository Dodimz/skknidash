import SmallModal from "@/Admin/Components/Modal/SmallModal"
import TextInput from "@/Admin/Components/Inputs/TextInput.jsx"
import { useForm } from "@inertiajs/react"
import translate from "@/utils/translate"

export default function CreateTagModal({ isModal, closeModal }) {
    const { data, setData, post, processing, errors } = useForm({
        tag_name: ""
    })
    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("admin.tags.store"), {
            onSuccess: () => {
                closeModal()
            }
        })
    }

    return (
        <>
            <SmallModal
                isModal={isModal}
                actionButtonTitle={translate("Add New tag")}
                dismissButtonTitle={translate("Close")}
                title={translate("Add New tag")}
                onSubmit={handleSubmit}
                closeModal={closeModal}
            >
                <TextInput
                    title={translate("Enter tag name")}
                    type="text"
                    id="email"
                    error={errors?.tag_name}
                    onChange={(e) => setData("tag_name", e.target.value)}
                />
            </SmallModal>
        </>
    )
}
