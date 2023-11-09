import { Component } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"

@Component({
  selector: "app-view-merchant-ministry-content",
  templateUrl: "./view-merchant-ministry-content.component.html",
  styleUrls: ["./view-merchant-ministry-content.component.css"],
})
export class ViewMerchantMinistryContentComponent {
  merchantData = {} as RegisterMerchantForm
  // constructor(
  //   private lsService: LocalstorageService,
  //   private route: ActivatedRoute,
  // ) {
  //   this.getMerchantDataById(this.route.snapshot.params["id"])
  // }

  // getMerchantDataById(id: string) {
  //   const res: RegisterMerchantForm =
  //     this.lsService.getLocalRegisterdMerchantById(id)
  //   if (res) this.merchantData = res
  //   console.log(this.merchantData)
  // }

  // setMerchantStatus(status: string) {
  //   this.lsService.setLocalRegisterdMerchantStatus(this.merchantData.id, status)
  //   this.getMerchantDataById(this.route.snapshot.params["id"])
  // }
}
