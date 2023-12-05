import { Component } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { Title, Meta } from "@angular/platform-browser"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import {
  getMerchantProducts,
  getProducts,
} from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
})
export class ProductsComponent {
  categories: string[] = []
  selectedCategories: string = ""
  search: string = ""
  min_price: number = 0
  max_price: number = 0
  page: number = 1
  page_size: number = 10
  sort: string = ""

  // total pages
  total_pages: number = 1

  //products
  products: getMerchantProducts[] = []

  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Products | Promo Tourism System")
  }

  async ngOnInit() {
    this.getCategories()
    console.log("Query:", this.route.snapshot.queryParams)

    this.checkQueryParams()
    this.getProducts()
  }

  checkQueryParams() {
    this.route.queryParams.subscribe((params) => {
      if (params["search"]) {
        this.search = params["search"]
      }
      if (params["category"]) {
        this.selectedCategories = params["category"]
      }
      if (params["min_price"]) {
        this.min_price = parseFloat(params["min_price"])
      }
      if (params["max_price"]) {
        this.max_price = parseFloat(params["max_price"])
      }
      if (params["page"]) {
        this.page = parseInt(params["page"])
      }
      if (params["page_size"]) {
        this.page_size = parseInt(params["page_size"])
      }
      if (params["sort"]) {
        this.sort = params["sort"]
      }
    })
  }

  setMinPrice(input: number | string) {
    this.min_price = parseFloat(input.toString())
  }

  setMaxPrice(input: number | string) {
    this.max_price = parseFloat(input.toString())
  }

  async getCategories() {
    try {
      const res = await lastValueFrom(this.apiService.getProductCategories())
      if (res.categories.length > 0) {
        console.log("Categories:", res.categories)
        this.categories = res.categories
      }
    } catch (error) {
      console.info("Categories (error):", error)
      this.Swal.SwalNotif("Error", "Failed to get categories")
    }
  }

  // is fetch product
  isFetching: boolean = false

  async getProducts() {
    this.isFetching = true
    try {
      const res = await lastValueFrom(
        this.apiService.getProducts({
          search: this.search ? this.search : "",
          categories: this.selectedCategories ? this.selectedCategories : "",
          min_price: this.min_price ? this.min_price : 0,
          max_price: this.max_price ? this.max_price : 0,
          page: this.page ? this.page : 1,
          page_size: this.page_size ? this.page_size : 10,
          sort: this.sort ? this.sort : "",
        }),
      )
      this.total_pages = res.totalPages ? res.totalPages : 1
      if (res.products.length > 0) {
        this.products = res.products
        this.isFetching = false
        console.log("Products:", this.products)
      }
      this.isFetching = false
    } catch (error) {
      console.info("Products (error):", error)
      this.isFetching = false
      this.Swal.SwalNotif("Error", "Failed to get products")
    }
  }

  // is fetch more product
  isFetchingMore: boolean = false
  // load more products if available
  async loadMore() {
    this.page = this.page + 1
    this.isFetchingMore = true
    try {
      const res = await lastValueFrom(
        this.apiService.getProducts({
          search: this.search ? this.search : "",
          categories: this.selectedCategories ? this.selectedCategories : "",
          min_price: this.min_price ? this.min_price : 0,
          max_price: this.max_price ? this.max_price : 0,
          page: this.page ? this.page : 1,
          page_size: this.page_size ? this.page_size : 10,
          sort: this.sort ? this.sort : "",
        }),
      )
      this.total_pages = res.totalPages ? res.totalPages : 1
      if (res.products.length > 0) {
        this.isFetchingMore = false
        this.products = this.products.concat(res.products)
        console.log("Load Products:", this.products)
      }
      this.isFetchingMore = false
    } catch (error) {
      console.info("Load Products (error):", error)
      this.isFetching = false
      this.Swal.SwalNotif("Error", "Failed to get products")
    }
  }

  toggleCategory(category: string) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.replace(
        `${category},`,
        "",
      )
    } else {
      this.selectedCategories += `${category},`
    }
  }

  resetPrice() {
    this.min_price = 0
    this.max_price = 0
  }

  resetCategories() {
    this.categories = []
    this.selectedCategories = ""
    this.getCategories()
  }

  applyFilter() {
    this.getProducts()
    this.router.navigate(["/products"], {
      queryParams: {
        search: this.search ? this.search : "",
        category: this.selectedCategories ? this.selectedCategories : "",
        min_price: this.min_price ? this.min_price : 0,
        max_price: this.max_price ? this.max_price : 0,
        page: this.page ? this.page : 1,
        page_size: this.page_size ? this.page_size : 10,
      },
    })
  }
}
