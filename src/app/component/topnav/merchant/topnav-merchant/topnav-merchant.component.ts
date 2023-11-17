import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { GlobalService } from "src/app/service/global.service"

@Component({
  selector: "app-topnav-merchant",
  templateUrl: "./topnav-merchant.component.html",
  styleUrl: "./topnav-merchant.component.css",
})
export class TopnavMerchantComponent {
  constructor(
    private router: Router,
    public gs: GlobalService,
  ) {}

  getUrl() {
    return this.router.url
  }
}
