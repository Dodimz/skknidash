import { IonIcon } from "@ionic/react"
import { close } from "ionicons/icons"

export default function SmallModal({ isModal, closeModal, title, actionButtonTitle, dismissButtonTitle, onSubmit, children }) {
    return (
        <>
            {isModal && (
                <div className="modal fade show" id="exampleModal" style={{ display: isModal ? "block" : "none" }}>
                    <form className="modal-dialog" onSubmit={onSubmit}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    {title}
                                </h5>
                                <button onClick={() => closeModal(false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <IonIcon icon={close} role="img" className="md hydrated" aria-label="close" />
                                </button>
                            </div>
                            <div className="modal-body">{children}</div>
                            <div className="modal-footer">
                                <button onClick={() => closeModal(false)} type="button" className="btn btn-secondary">
                                    {dismissButtonTitle}
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {actionButtonTitle}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}
