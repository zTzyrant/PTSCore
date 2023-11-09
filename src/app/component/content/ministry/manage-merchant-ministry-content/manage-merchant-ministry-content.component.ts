import { Component } from "@angular/core"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"

@Component({
  selector: "app-manage-merchant-ministry-content",
  templateUrl: "./manage-merchant-ministry-content.component.html",
  styleUrls: ["./manage-merchant-ministry-content.component.css"],
})
export class ManageMerchantMinistryContentComponent {
  registerdMerchant: RegisterMerchantForm[] = []

  ngOnInit() {
    // const response = this.lsService.getLocalRegisterdMerchant()
    // if (response.length > 0) {
    //   response.forEach((element: RegisterMerchantForm) => {
    //     this.registerdMerchant.push(element)
    //   })
    // }
  }
}
