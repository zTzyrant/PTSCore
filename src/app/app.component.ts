import { Component } from "@angular/core"
import { Meta, Title } from "@angular/platform-browser"
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from "@angular/router"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  title = "Home | Promo Tourism System"
  // Sets initial value to true to show loading spinner on first load
  // refer to https://stackoverflow.com/a/58739854/13197639
  loading = true

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e)
    })

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

  // Shows and hides the loading spinner during RouterEvent changes
  // refer to https://stackoverflow.com/a/58739854/13197639
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    // refer to https://stackoverflow.com/a/58739854/13197639
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
