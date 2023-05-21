import Swal, { SweetAlertResult } from "sweetalert2";

export class Alert {
    public static confirm(title: string, text: string): Promise<SweetAlertResult<any>> {
        return Swal.fire({
            title: title,
            text: text,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            icon: "warning",
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
            }
        });
    }

    public static success(message: string) {
        Swal.fire(message, '', 'success')
    }

    public static info(message: string) {
        Swal.fire(message, '', 'info')
    }
}