import { Component, ElementRef, ViewChild } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { AuthService } from "src/app/service/auth.service"
import { GlobalService } from "src/app/service/global.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  isDropdownOpen = false

  // query params for search products
  categories: string[] = []
  selectedCategories: string = ""
  search: string = ""
  min_price: number = 0
  max_price: number = 0
  page: number = 1
  page_size: number = 10

  isMobileSearch = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private Swal: SwalService,
    public globalService: GlobalService,
  ) {
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
    })
  }

  ngOnInit() {
    this.checkIsCustomer()
  }

  setIsMobileSearch(data: boolean) {
    this.isMobileSearch = data ? data : false
    if (this.isMobileSearch) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }
  toggle_dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  setSearch(event: string) {
    this.search = event
  }

  searchProduct() {
    console.log(this.search)
    this.router.navigate(["/products"], {
      queryParams: {
        search: this.search ? this.search : "",
        category: this.selectedCategories ? this.selectedCategories : "",
        min_price: this.min_price.toString() ? this.min_price.toString() : "",
        max_price: this.max_price.toString() ? this.max_price.toString() : "",
        page: this.page.toString() ? this.page.toString() : "1",
        page_size: this.page_size.toString() ? this.page_size.toString() : "10",
      },
    })
  }

  isCustomer = false
  async checkIsCustomer() {
    try {
      const res = await lastValueFrom(this.authService.getIsCustomer())
      this.isCustomer = res.is_customer
    } catch (error) {
      console.log(error)
    }
  }

  // isModalOpen = false
  openModal(bool: boolean) {
    this.globalService.isModalLoginOpen = bool
  }

  logout() {
    this.Swal.SwalNotifWithConfirm(
      "Are you sure?",
      "You will be logged out",
    ).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        this.Swal.SwalNotifWithThen("success", "Logout success").then(
          (result) => {
            location.reload()
          },
        )
      }
    })
  }
}
