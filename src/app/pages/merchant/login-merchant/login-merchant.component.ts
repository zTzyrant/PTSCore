import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-login-merchant",
  templateUrl: "./login-merchant.component.html",
  styleUrls: ["./login-merchant.component.css"],
})
export class LoginMerchantComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Login Merchant | Promo Tourism System")
  }
}
