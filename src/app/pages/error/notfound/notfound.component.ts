import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-notfound",
  templateUrl: "./notfound.component.html",
  styleUrls: ["./notfound.component.css"],
})
export class NotfoundComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("404 Not Found | Promo Tourism System")
  }
}
