import TextInput from "@/Admin/Components/Inputs/TextInput"
import SmallModal from "@/Admin/Components/Modal/SmallModal"
import { useForm } from "@inertiajs/react"
import { useEffect } from "react"

export default function EditSlug({ isModal, closeModal, editedData }) {
    const { data, setData, put, errors } = useForm({
        slug: ""
    })

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        put(route("admin.teams.update.slug", editedData), {
            slug: data.slug,
            onSuccess: () => {
                closeModal()
            }
        })
    }

    useEffect(() => {
        setData("slug", editedData.slug)
    }, [editedData])

    return (
        <SmallModal
            isModal={isModal}
            actionButtonTitle="Update Slug"
            dismissButtonTitle="Close"
            title="Update Team Slug"
            onSubmit={handleSubmit}
            closeModal={closeModal}
        >
            <TextInput
                title="Enter Slug *"
                type="text"
                id="slug"
                value={data.slug}
                error={errors?.slug}
                onChange={(e) => setData("slug", e.target.value)}
            />
        </SmallModal>
    )
}
