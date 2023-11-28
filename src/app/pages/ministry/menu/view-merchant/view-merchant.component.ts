import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-view-merchant",
  templateUrl: "./view-merchant.component.html",
  styleUrls: ["./view-merchant.component.css"],
})
export class ViewMerchantComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("View Merchant | Promo Tourism System")
  }
}
