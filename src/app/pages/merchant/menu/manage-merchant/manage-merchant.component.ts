import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import moment from "moment"
import { lastValueFrom } from "rxjs"
import { MerchantData } from "src/app/interface/register-merchant-form"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-manage-merchant",
  templateUrl: "./manage-merchant.component.html",
  styleUrl: "./manage-merchant.component.css",
})
export class ManageMerchantComponent {
  merchantData: MerchantData | null = null
  isFetchingResetPassword = false
  merchant_id: string | null = null

  constructor(
    private titleService: Title,
    public apiService: ApiService,
    private router: Router,
    private Swal: SwalService,
  ) {
    this.titleService.setTitle("Manage Merchant | Promo Tourism System")
  }

  ngOnInit() {
    this.getMerchant()
  }

  async getMerchant() {
    try {
      const profile = await lastValueFrom(this.apiService.getMyProfile())
      if (!profile.merchant_id) {
        this.router.navigate(["/merchant"])
        return
      }

      this.merchant_id = profile.merchant_id
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

  resetPassword() {
    this.Swal.SwalNotifWithConfirm(
      "Info",
      "Are you sure to reset password?",
    ).then(async (result) => {
      if (result.isConfirmed) {
        if (!this.merchant_id) {
          return
        }
        try {
          this.isFetchingResetPassword = true
          const response = await lastValueFrom(
            this.apiService.putMinistryResetMechantPasswordById(
              this.merchant_id,
            ),
          )
          this.Swal.SwalNotif("Success", "Successfully reset password")
          this.isFetchingResetPassword = false
        } catch (error: any) {
          this.isFetchingResetPassword = false
          console.log(error)
          this.Swal.SwalNotif(
            "Error",
            "Something went wrong, please try again later",
          )
        }
      }
    })
  }
}
