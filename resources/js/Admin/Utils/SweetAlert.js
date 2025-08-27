import Swal from "sweetalert2"

export const showAlert = (title, text, confirmButtonText, confirmCallback) => {
    Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCallback() // Call the callback function if the user confirms
        }
    })
}
