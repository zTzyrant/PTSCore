import { ChangeDetectorRef, Component } from "@angular/core"
import { register } from "swiper/element/bundle"
import { lastValueFrom } from "rxjs"
import { ApiService } from "src/app/service/api.service"
import { getMerchantProducts } from "src/app/interface/globalInterface"
import { BreakpointObserver } from "@angular/cdk/layout"
@Component({
  selector: "app-top-activities",
  templateUrl: "./top-activities.component.html",
  styleUrls: ["./top-activities.component.css"],
})
export class TopActivitiesComponent {
  products: getMerchantProducts[] = []

  constructor(
    private apiService: ApiService,
    private breakpointObserver: BreakpointObserver,
    private chageDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getRecentProducts()
    /**
     * @see: https://material.angular.io/cdk/layout/api#BreakpointObserver
     */
    this.breakpointObserver.observe(["(min-width: 640px)"]).subscribe((res) => {
      if (res.matches) {
        this.registerSwiper()
      }
    })
  }

  isFetching = false
  async getRecentProducts() {
    this.isFetching = true
    try {
      const res = await lastValueFrom(
        this.apiService.getProducts({
          search: "",
          categories: "",
          min_price: 0,
          max_price: 0,
          page: 1,
          page_size: 10,
          sort: "popular",
        }),
      )
      this.products = res.products
      this.isFetching = false
      this.registerSwiper()
    } catch (err) {
      console.log(err)
    }
  }

  async registerSwiper() {
    this.chageDetectorRef.detectChanges()
    register()
    const swiperEl = document.getElementById("swiper-1")
    if (swiperEl) {
      Object.assign(swiperEl, {
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
        },
      })
    }
  }
}
