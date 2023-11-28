import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-view-products",
  templateUrl: "./view-products.component.html",
  styleUrl: "./view-products.component.css",
})
export class ViewProductsComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("View Products | Promo Tourism System")
  }
}
