import SmallModal from "@/Admin/Components/Modal/SmallModal"
import translate from "@/utils/translate"
import { useForm } from "@inertiajs/react"

export default function MakeReviewModal({ isModal, closeModal, productId }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        rating: "",
        review: ""
    })

    // handle submit
    const handleSubmit = (e) => {
        e.preventDefault()
        post(route("user.review.make", { productId: productId }), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                closeModal(false)
            }
        })
    }

    return (
        <>
            <SmallModal
                isModal={isModal}
                actionButtonTitle={translate("Add New Review")}
                dismissButtonTitle={translate("Close")}
                title={translate("Add New Review")}
                onSubmit={handleSubmit}
                closeModal={closeModal}
                processing={processing}
            >
                <div>
                    <label htmlFor="rating">{translate("Rating")}*</label>
                    <input
                        type="number"
                        id="rating"
                        className="cs_form_field cs_radius_20"
                        value={data.rating}
                        onChange={(e) => setData("rating", e.target.value)}
                    />
                    <span style={{ color: "red" }}>{errors.rating}</span>
                </div>
                <div className="mt-3">
                    <label htmlFor="review">{translate("Review")}*</label>
                    <textarea
                        id="review"
                        className="cs_form_field cs_radius_20"
                        value={data.review}
                        onChange={(e) => setData("review", e.target.value)}
                        rows="4"
                        maxLength="1000"
                    ></textarea>
                    <span style={{ color: "red" }}>{errors.review}</span>
                </div>
            </SmallModal>
        </>
    )
}
