import { Icon } from "@iconify/react"

export default function SmallModal({ isModal, closeModal, title, actionButtonTitle, dismissButtonTitle, onSubmit, children, processing }) {
    return (
        <>
            {isModal && (
                <>
                    <div className="modal fade show" id="exampleModal" style={{ display: isModal ? "block" : "none" }}>
                        <form className="modal-dialog" onSubmit={onSubmit} style={{ position: "relative", zIndex: "9999" }}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title cs_fs_24 cs_normal" id="exampleModalLabel">
                                        {title}
                                    </h5>
                                    <button onClick={() => closeModal(false)} type="button" className="cs_modal_close">
                                        <Icon icon="lucide:x" width="18" height="18" />
                                    </button>
                                </div>
                                <div className="modal-body">{children}</div>
                                <div className="modal-footer">
                                    {dismissButtonTitle && (
                                        <button onClick={() => closeModal(false)} type="button" className="btn btn-secondary">
                                            {dismissButtonTitle}
                                        </button>
                                    )}
                                    {actionButtonTitle && (
                                        <button type="submit" className="btn btn-primary" disabled={processing}>
                                            {actionButtonTitle}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                        <div className="cs_modal_overlay" onClick={() => closeModal(false)}></div>
                    </div>
                </>
            )}
        </>
    )
}
