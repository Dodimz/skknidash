export default function FromValidationError({ message }) {
    return <>{message && <span className="form-validation-error">{message}</span>}</>
}
