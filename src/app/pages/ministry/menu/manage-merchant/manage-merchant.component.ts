import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-ministry-manage-merchant",
  templateUrl: "./manage-merchant.component.html",
  styleUrls: ["./manage-merchant.component.css"],
})
export class MinistryManageMerchantComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Manage Merchant | Promo Tourism System")
  }
}
