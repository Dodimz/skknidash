import { IonSpinner } from "@ionic/react"

export default function FormButton({ children, type = 1, isLoading }) {
    return (
        <button type="submit" className={`yoo-form-btn yoo-style${type} yoo-color${type}`} disabled={isLoading}>
            {!isLoading && children} {isLoading && <IonSpinner name="dots" style={{ marginLeft: "5px" }}></IonSpinner>}
        </button>
    )
}
