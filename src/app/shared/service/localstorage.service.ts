import { Injectable } from "@angular/core"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"
import { v4 as uuidv4 } from "uuid"
import { SwalService } from "./swal.service"

@Injectable({
  providedIn: "root",
})
export class LocalstorageService {
  constructor(private Swal: SwalService) {}

  generateId(input: string): string {
    return uuidv4().padEnd(36, input)
  }

  getLocalRegisterdMerchant(): any[] {
    const localRegisteredMerchant = localStorage.getItem("registeredMerchant")
    if (localRegisteredMerchant) {
      return JSON.parse(localRegisteredMerchant)
    } else {
      return []
    }
  }

  saveLocalRegisteredMerchant(data: RegisterMerchantForm): void {
    const localRegisteredMerchant = localStorage.getItem("registeredMerchant")
    if (localRegisteredMerchant) {
      const dataParsed = JSON.parse(localRegisteredMerchant)
      dataParsed.push(data)
      localStorage.setItem("registeredMerchant", JSON.stringify(dataParsed))
    } else {
      localStorage.setItem("registeredMerchant", JSON.stringify([data]))
    }
    this.Swal.SwalNotif(
      "Success",
      "Register merchant success, please wait for ministry approval."
    )
  }
}
