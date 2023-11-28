import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-view-orders",
  templateUrl: "./view-orders.component.html",
  styleUrl: "./view-orders.component.css",
})
export class ViewOrdersComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("View Orders | Promo Tourism System")
  }
}
