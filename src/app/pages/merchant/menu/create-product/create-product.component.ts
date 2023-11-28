import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrl: "./create-product.component.css",
})
export class CreateProductComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle("Create Product | Promo Tourism System")
  }
}
