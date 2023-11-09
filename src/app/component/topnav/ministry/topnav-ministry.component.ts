import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { GlobalService } from "src/app/shared/service/global.service"

@Component({
  selector: "app-topnav-ministry",
  templateUrl: "./topnav-ministry.component.html",
  styleUrls: ["./topnav-ministry.component.css"],
})
export class TopnavMinistryComponent {
  constructor(
    private router: Router,
    public gs: GlobalService,
  ) {}

  getUrl() {
    return this.router.url
  }
}
