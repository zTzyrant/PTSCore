import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment"
import {
  MerchantData,
  RegisterMerchantForm,
} from "../interface/register-merchant-form"
import {
  MerchantApprovedName,
  MerchantStatusStatistic,
  MyMerchantStatistic,
  addProduct,
  getMerchantProducts,
  getProducts,
  getTopProduct,
  productCategories,
} from "../interface/globalInterface"
import { User } from "../interface/user"
import {
  PostOrder,
  getInvoice,
  getInvoiceOrders,
  getInvoiceOrdersReview,
  getMerchantOrders,
  postReview,
} from "../interface/payment"

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public API_URL: string = environment.apiUrl
  constructor(private http: HttpClient) {}

  checkIsEmailExist(email: string) {
    return this.http.get(`${this.API_URL}/auth/check-email/${email}`)
  }

  checkIsUsernameExist(username: string) {
    return this.http.get(`${this.API_URL}/auth/check-username/${username}`)
  }

  postMerchant(data: FormData) {
    return this.http.post(`${this.API_URL}/api/merchant`, data)
  }

  getAllMerchant() {
    return this.http.get<MerchantData[]>(
      `${this.API_URL}/api/merchant_all_without_pagination`,
    )
  }

  getMerchantById(id: string) {
    return this.http.get<MerchantData>(`${this.API_URL}/api/merchant/${id}`)
  }

  approveMerchantById(id: string) {
    return this.http.put(`${this.API_URL}/ministry/approve/${id}`, {})
  }

  rejectMerchantById(id: string) {
    return this.http.put(`${this.API_URL}/ministry/reject/${id}`, {})
  }

  getProductCategories() {
    return this.http.get<productCategories>(
      `${this.API_URL}/api/product/categories`,
    )
  }

  getMerchantProducts() {
    return this.http.get<getMerchantProducts[]>(
      `${this.API_URL}/merchant/products`,
    )
  }

  getMerchantProductsById(id: string) {
    return this.http.get<getMerchantProducts>(
      `${this.API_URL}/merchant/products/${id}`,
    )
  }

  postMerchantProducts(data: addProduct) {
    return this.http.post<getMerchantProducts>(
      `${this.API_URL}/merchant/products`,
      data,
    )
  }

  putPictruesProduct(product_id: string, data: FormData) {
    return this.http.put(
      `${this.API_URL}/merchant/products/${product_id}/picture/upload`,
      data,
    )
  }

  patchProductPictures(product_id: string, picture_id: string[]) {
    return this.http.patch(
      `${this.API_URL}/merchant/products/${product_id}/picture/remove`,
      { picture: picture_id },
    )
  }

  putMerchantProductsById(id: string, data: addProduct) {
    return this.http.put(`${this.API_URL}/merchant/products/${id}`, data)
  }

  deleteMerchantProductsById(id: string) {
    return this.http.delete(`${this.API_URL}/merchant/products/${id}`)
  }

  getProducts(filter: {
    search: string
    categories: string
    min_price: number
    max_price: number
    page: number
    page_size: number
    sort: string
  }) {
    return this.http.get<getProducts>(`${this.API_URL}/api/products`, {
      params: {
        search: filter.search ? filter.search : "",
        categories: filter.categories ? filter.categories : "",
        min_price: filter.min_price.toString()
          ? filter.min_price.toString()
          : "",
        max_price: filter.max_price.toString()
          ? filter.max_price.toString()
          : "",
        page: filter.page.toString() ? filter.page.toString() : "1",
        page_size: filter.page_size.toString()
          ? filter.page_size.toString()
          : "10",
        sort: filter.sort ? filter.sort : "",
      },
    })
  }

  getProductById(id: string) {
    return this.http.get<getMerchantProducts>(
      `${this.API_URL}/api/products/${id}`,
    )
  }

  putMinistryResetMechantPasswordById(id: string) {
    return this.http.put(
      `${this.API_URL}/ministry/reset-password/merchant/${id}`,
      {},
    )
  }

  postCustomer(data: User) {
    return this.http.post(`${this.API_URL}/auth/customer`, data)
  }

  /**
   * create invoice in database first default status is pending
   */
  postInvoice(order: PostOrder) {
    return this.http.post<getInvoice>(`${this.API_URL}/payment/invoice`, order)
  }

  /**
   * update invoice status to unpaid (ready to pay)
   */
  postInvoicePay(invoice_id: string) {
    return this.http.post<getInvoice>(
      `${this.API_URL}/payment/invoice/${invoice_id}/pay`,
      {},
    )
  }

  getMerchantOrders() {
    return this.http.get<getMerchantOrders[]>(`${this.API_URL}/merchant/orders`)
  }

  getMyProfile() {
    return this.http.get<User>(`${this.API_URL}/auth/user/profile`)
  }

  getMyOrders() {
    return this.http.get<getInvoiceOrders[]>(
      `${this.API_URL}/customer/my_order`,
    )
  }

  getPaymentStatus(invoice_id: string) {
    return this.http.get(`${this.API_URL}/payment/invoice/${invoice_id}`)
  }

  getPaymentCapture(invoice_id: string) {
    return `${this.API_URL}/payment/invoice/${invoice_id}/capture`
  }

  getInvoiceById(invoice_id: string) {
    return this.http.get<getInvoiceOrders>(
      `${this.API_URL}/api/invoice/${invoice_id}`,
    )
  }

  getMyOrdersToReview() {
    return this.http.get<getInvoiceOrdersReview[]>(
      `${this.API_URL}/customer/my_order/review`,
    )
  }

  postReview(invoice_id: string, data: postReview) {
    return this.http.post(
      `${this.API_URL}/customer/my_order/review/${invoice_id}`,
      data,
    )
  }

  getMerchantStatusStatistic() {
    return this.http.get<MerchantStatusStatistic>(
      `${this.API_URL}/ministry/merchant/analytics`,
    )
  }

  getTop5MerchantProduct() {
    return this.http.get<getTopProduct[]>(
      `${this.API_URL}/ministry/merchant/top_product?limit=5`,
    )
  }

  getTopMerchantProducts(id: string | null) {
    return this.http.get<getTopProduct[]>(
      `${this.API_URL}/ministry/merchant/top_product?merchant_id=${
        id ? id : ""
      }`,
    )
  }
  getApprovedMerchants() {
    return this.http.get<MerchantApprovedName[]>(
      `${this.API_URL}/ministry/merchant/approved`,
    )
  }

  getTop5Product() {
    return this.http.get<getTopProduct[]>(
      `${this.API_URL}/merchant/top_product?limit=5`,
    )
  }

  getProductAnalytics() {
    return this.http.get<getTopProduct[]>(`
    ${this.API_URL}/merchant/top_product`)
  }

  getMyMerchantStatistic() {
    return this.http.get<MyMerchantStatistic>(`
    ${this.API_URL}/merchant/product/statistic`)
  }

  postContact(data: { fullname: string; email: string; message: string }) {
    return this.http.post(`${this.API_URL}/api/contact_us`, data)
  }
}
