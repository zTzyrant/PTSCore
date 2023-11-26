import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import {
  getInvoiceOrders,
  getInvoiceOrdersReview,
  modalReview,
  postReview,
} from "src/app/interface/payment"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-orders-review",
  templateUrl: "./orders-review.component.html",
})
export class OrdersReviewComponent {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private Swal: SwalService,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.getOrders()
  }

  invoiceData: getInvoiceOrdersReview[] | undefined
  async getOrders() {
    try {
      const res = await lastValueFrom(this.apiService.getMyOrdersToReview())
      this.invoiceData = res
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  orderToReview: modalReview = {
    invoice_id: null,
    name: null,
  }

  setOrderToReview(invoice_id: string, name: string) {
    this.orderToReview.invoice_id = invoice_id
    this.orderToReview.name = name
    this.openModalReview()
  }

  isModalOpen = false
  openModalReview() {
    this.isModalOpen = true
  }

  closeModalReview() {
    this.isModalOpen = false
    this.orderToReview = {
      invoice_id: null,
      name: null,
    }
  }

  reviewForm: FormGroup = this.fb.group({
    rating: [5, Validators.required],
    comment: ["", Validators.required],
    is_recommend: [false, Validators.required],
  })

  isSubmitReview = false
  async submitReview() {
    if (this.reviewForm.invalid) {
      this.Swal.SwalNotif("error", "Please fill all form")
      this.reviewForm.markAllAsTouched()
      this.reviewForm.markAsDirty()
      return
    }

    if (this.orderToReview.invoice_id === null) {
      this.Swal.SwalNotif("error", "Something went wrong")
      return
    }

    const { rating, comment, is_recommend } = this.reviewForm.value
    const data: postReview = {
      rating,
      comment,
      is_recommend,
    }

    this.isSubmitReview = true
    try {
      const res = await lastValueFrom(
        this.apiService.postReview(this.orderToReview.invoice_id, data),
      )
      if (res) {
        this.Swal.SwalNotif("success", "Review success")
        this.closeModalReview()
        this.getOrders()
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("error", "Something went wrong")
    }
    this.isSubmitReview = false
  }
}
