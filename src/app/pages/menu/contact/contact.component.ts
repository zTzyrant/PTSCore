import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Contact | Promo Tourism System")
  }
}
