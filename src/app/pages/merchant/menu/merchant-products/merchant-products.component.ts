import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { getMerchantProducts } from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-merchant-products",
  templateUrl: "./merchant-products.component.html",
  styleUrl: "./merchant-products.component.css",
})
export class MerchantProductsComponent {
  products: getMerchantProducts[] = []

  constructor(
    private router: Router,
    private Swal: SwalService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getMerchantProducts()
  }

  redirectToCreateProduct() {
    this.router.navigate(["/merchant/create-product"])
  }

  async getMerchantProducts() {
    try {
      const res = await lastValueFrom(this.apiService.getMerchantProducts())
      this.products = res
    } catch (error) {
      console.log("Get Merchant Products", error)
      this.Swal.SwalNotif("Error", "Failed to get merchant products")
    }
  }
}
