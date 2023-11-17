import { Injectable } from "@angular/core"
import Swal from "sweetalert2"

@Injectable({
  providedIn: "root",
})
export class SwalService {
  constructor() {}

  SwalNotif(status: string, message: string) {
    Swal.fire({
      title: `${status}`,
      text: `${message}`,
      buttonsStyling: false,
      customClass: {
        popup: "modal-box",
        title: "text-lg font-bold font-poppins text-neutral text-left p-0",
        htmlContainer: "!px-0 !m-0 !py-4 !font-normal !text-left text-sm",
        actions: "flex justify-end w-full ",
        confirmButton:
          "btn btn-primary btn-active w-auto px-6 py-2 text-sm transition-none animation-none",
      },
      confirmButtonText: "Close",
    })
  }

  SwalNotifWithConfirm(status: string, message: string) {
    return Swal.fire({
      title: `${status}`,
      text: `${message}`,
      buttonsStyling: false,
      customClass: {
        popup: "modal-box",
        title: "text-lg font-bold font-poppins text-neutral text-left p-0",
        htmlContainer: "!px-0 !m-0 !py-4 !font-normal !text-left text-sm",
        actions: "flex justify-end w-full ",
        confirmButton:
          "btn btn-primary btn-active w-auto px-6 py-2 text-sm transition-none animation-none mr-2",
        cancelButton:
          "btn btn-outline-primary btn-active w-auto px-6 py-2 text-sm transition-none animation-none",
      },
      confirmButtonText: "Ok",
      showCancelButton: true,
    })
  }

  SwalNotifWithThen(status: string, message: string) {
    return Swal.fire({
      title: `${status}`,
      text: `${message}`,
      buttonsStyling: false,
      customClass: {
        popup: "modal-box",
        title: "text-lg font-bold font-poppins text-neutral text-left p-0",
        htmlContainer: "!px-0 !m-0 !py-4 !font-normal !text-left text-sm",
        actions: "flex justify-end w-full ",
        confirmButton:
          "btn btn-primary btn-active w-auto px-6 py-2 text-sm transition-none animation-none mr-2",
        cancelButton:
          "btn btn-outline-primary btn-active w-auto px-6 py-2 text-sm transition-none animation-none",
      },
      confirmButtonText: "Ok",
    })
  }
}
