import { Component } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"

@Component({
  selector: "app-root",
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = "Home | Promo Tourism System"
  constructor(
    private titleService: Title,
    private metaService: Meta,
  ) {
    this.titleService.setTitle(this.title)
    this.metaService.addTags([
      { name: "keywords", content: "Angular, Promo Tourism System, PTS" },
      {
        name: "description",
        content:
          "Promo Tourism System is a web platform where you can find the best deals for your next trip. Fyi this is a project for my assignment in my university.",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Muhammad Zein Akbar, Anak Agung Ari Wijaya" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { charset: "UTF-8" },
      { language: "English" },
    ])
  }
}
