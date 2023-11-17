import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "src/app/service/auth.service"
import { GlobalService } from "src/app/service/global.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-menu-merchant",
  templateUrl: "./menu-merchant.component.html",
  styleUrls: ["./menu-merchant.component.css"],
})
export class MenuMerchantComponent {
  constructor(
    public gs: GlobalService,
    private authService: AuthService,
    private Swal: SwalService,
    private router: Router,
  ) {}

  logout() {
    this.Swal.SwalNotifWithConfirm(
      "Information",
      "Are you sure to logout?",
    ).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        this.router.navigate(["/merchant/login"])
      }
    })
  }
}
