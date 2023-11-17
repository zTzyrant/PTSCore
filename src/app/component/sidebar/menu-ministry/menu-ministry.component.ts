import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "src/app/service/auth.service"
import { GlobalService } from "src/app/service/global.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-menu-ministry",
  templateUrl: "./menu-ministry.component.html",
  styleUrls: ["./menu-ministry.component.css"],
})
export class MenuMinistryComponent {
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
        this.router.navigate(["/ministry/login"])
      }
    })
  }
}
