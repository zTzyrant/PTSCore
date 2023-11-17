import { Component } from "@angular/core"
import { GlobalService } from "src/app/service/global.service"

@Component({
  selector: "app-menu-ministry",
  templateUrl: "./menu-ministry.component.html",
  styleUrls: ["./menu-ministry.component.css"],
})
export class MenuMinistryComponent {
  constructor(public gs: GlobalService) {}
}
