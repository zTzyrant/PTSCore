import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-manage-merchant",
  templateUrl: "./manage-merchant.component.html",
  styleUrl: "./manage-merchant.component.css",
})
export class ManageMerchantComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Manage Merchant | Promo Tourism System")
  }
}
