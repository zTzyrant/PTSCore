import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-login-ministry",
  templateUrl: "./login-ministry.component.html",
  styleUrls: ["./login-ministry.component.css"],
})
export class LoginMinistryComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Login Ministry | Promo Tourism System")
  }
}
