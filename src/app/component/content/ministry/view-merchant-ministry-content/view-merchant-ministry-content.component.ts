import { Component } from "@angular/core"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { MerchantData } from "src/app/interface/register-merchant-form"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"
import moment from "moment"

@Component({
  selector: "app-view-merchant-ministry-content",
  templateUrl: "./view-merchant-ministry-content.component.html",
  styleUrls: ["./view-merchant-ministry-content.component.css"],
})
export class ViewMerchantMinistryContentComponent {
  merchantData = {} as MerchantData
  merchant_id = this.route.snapshot.params["id"]

  constructor(
    private route: ActivatedRoute,
    public apiService: ApiService,
    private router: Router,
    private Swal: SwalService,
  ) {
    if (this.merchant_id) {
      this.getMerchant()
    } else {
      this.router.navigate(["/ministry/manage-merchant"])
    }
  }

  async getMerchant() {
    try {
      const response = await lastValueFrom(
        this.apiService.getMerchantById(this.merchant_id),
      )
      this.merchantData = response
      this.merchantData.created_at = moment
        .utc(this.merchantData.created_at)
        .local()
        .format("ddd, DD MMM YYYY")
      console.log(response)
    } catch (error: any) {
      console.log(error)
      this.Swal.SwalNotifWithThen(
        "Error",
        "Something went wrong, please try again later",
      ).then(() => {
        this.router.navigate(["/ministry/manage-merchant"])
      })
    }
  }

  async approveMerchant() {
    try {
      const response = await lastValueFrom(
        this.apiService.approveMerchantById(this.merchant_id),
      )
      this.Swal.SwalNotif("Success", "Successfully approve merchant")
      this.getMerchant()
    } catch (error: any) {
      console.log(error)
      this.Swal.SwalNotif(
        "Error",
        "Something went wrong, please try again later",
      )
    }
  }

  async rejectMerchant() {
    try {
      const response = await lastValueFrom(
        this.apiService.rejectMerchantById(this.merchant_id),
      )
      this.Swal.SwalNotif("Success", "Successfully reject merchant")
      this.getMerchant()
    } catch (error: any) {
      console.log(error)
      this.Swal.SwalNotif(
        "Error",
        "Something went wrong, please try again later",
      )
    }
  }

  backToManage() {
    this.router.navigate(["/ministry/manage-merchant"])
  }
}
