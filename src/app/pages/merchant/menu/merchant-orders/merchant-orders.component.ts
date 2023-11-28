import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { getMerchantOrders } from "src/app/interface/payment"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-merchant-orders",
  templateUrl: "./merchant-orders.component.html",
  styleUrl: "./merchant-orders.component.css",
})
export class MerchantOrdersComponent {
  constructor(
    private router: Router,
    private Swal: SwalService,
    private apiService: ApiService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Merchant Orders | Promo Tourism System")
  }

  ngOnInit() {
    this.getMerchantOrders()
  }

  orders_data: getMerchantOrders[] = []
  async getMerchantOrders() {
    try {
      const res = await lastValueFrom(this.apiService.getMerchantOrders())
      this.orders_data = res
      console.log("Order", res)
    } catch (error) {
      this.Swal.SwalNotif("Error", "Failed to get merchant orders")
    }
  }
}
