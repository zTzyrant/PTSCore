import { Component } from "@angular/core"
import { lastValueFrom } from "rxjs"
import {
  MerchantData,
  RegisterMerchantForm,
} from "src/app/interface/register-merchant-form"
import { ApiService } from "src/app/service/api.service"

@Component({
  selector: "app-manage-merchant-ministry-content",
  templateUrl: "./manage-merchant-ministry-content.component.html",
  styleUrls: ["./manage-merchant-ministry-content.component.css"],
})
export class ManageMerchantMinistryContentComponent {
  registerdMerchant: MerchantData[] = []

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getMerchant()
  }

  async getMerchant() {
    try {
      const response = await lastValueFrom(this.apiService.getAllMerchant())
      this.registerdMerchant = response
      console.log(this.registerdMerchant)
    } catch (error) {
      console.log(error)
    }
  }
}
