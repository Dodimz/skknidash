import { IonSpinner } from "@ionic/react"

export default function SuccessButton({ children, isLoading, ...props }) {
    return (
        <button {...props} type="submit" className="btn btn-success" disabled={isLoading}>
            {!isLoading && children} {isLoading && <IonSpinner name="dots" style={{ marginLeft: "5px" }}></IonSpinner>}
        </button>
    )
}
