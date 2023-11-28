import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { getMerchantProducts } from "src/app/interface/globalInterface"
import { Invoice, getInvoiceOrders } from "src/app/interface/payment"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-recent-orders",
  templateUrl: "./recent-orders.component.html",
})
export class RecentOrdersComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private Swal: SwalService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Recent Orders | Promo Tourism System")
  }

  ngOnInit() {
    this.getOrders()
  }

  invoiceData: getInvoiceOrders[] | undefined
  async getOrders() {
    try {
      const res = await lastValueFrom(this.apiService.getMyOrders())
      this.invoiceData = res
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  async validatePayment(id: string) {
    try {
      const res = await lastValueFrom(this.apiService.getPaymentStatus(id))
      this.Swal.SwalNotifWithThen("Success", "You avilable to do payment").then(
        () => {
          this.getOrders()
        },
      )
    } catch (error: unknown) {
      console.log(error)
      this.Swal.SwalNotifWithThen(
        "Error Payment time expired",
        "Your payment time was expired, please create new order.",
      ).then(() => {
        this.getOrders()
      })
    }
  }

  isCreatePayment = false
  async createPayment(id: string) {
    try {
      this.isCreatePayment = true
      const res = await lastValueFrom(this.apiService.postInvoicePay(id))
      const payment_url = res.payment_url
      if (payment_url) {
        this.Swal.SwalNotifWithThen("Success", "Payment success created").then(
          () => {
            this.getOrders()
            this.Swal.SwalNotifWithConfirm(
              "Success generate invoice",
              "You will be redirected to the payment page, <br/>If you want to pay later, you can pay from your recent order page.",
            ).then((result) => {
              if (result.isConfirmed) {
                window.open(payment_url, "_blank")
              }
            })
          },
        )
      }
    } catch (error: unknown) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Payment failed created")
    }
    this.isCreatePayment = false
  }
}
