import { Component, ViewChild } from "@angular/core"
import { register } from "swiper/element/bundle"
import { HttpClient } from "@angular/common/http"
import { lastValueFrom } from "rxjs"
@Component({
  selector: "app-recently-added-slider",
  templateUrl: "./recently-added-slider.component.html",
  styleUrls: ["./recently-added-slider.component.css"],
})
export class RecentlyAddedSliderComponent {
  products: any = []

  constructor(private httpService: HttpClient) {}

  ngOnInit() {
    this.getRecentProducts()
  }

  async getRecentProducts() {
    try {
      this.products = await lastValueFrom(
        this.httpService.get("assets/fakeproduct.json"),
      )
      this.registerSwiper()
    } catch (err) {
      console.log(err)
    }
  }

  async registerSwiper() {
    register()
    const swiperEl = document.querySelector("swiper-container")
    if (swiperEl) {
      Object.assign(swiperEl, {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        },
      })
    }
  }
}
