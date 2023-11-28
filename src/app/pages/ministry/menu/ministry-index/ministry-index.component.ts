import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-ministry-index",
  templateUrl: "./ministry-index.component.html",
  styleUrls: ["./ministry-index.component.css"],
})
export class MinistryIndexComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Ministry Dashboard | Promo Tourism System")
  }
}
