import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"

@Component({
  selector: "app-register-merchant",
  templateUrl: "./register-merchant.component.html",
  styleUrls: ["./register-merchant.component.css"],
})
export class RegisterMerchantComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Register Merchant | Promo Tourism System")
  }
}
