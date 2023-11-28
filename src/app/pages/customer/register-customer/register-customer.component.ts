import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-register-customer",
  templateUrl: "./register-customer.component.html",
})
export class RegisterCustomerComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Register Customer | Promo Tourism System")
  }
}
