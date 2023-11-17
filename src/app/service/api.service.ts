import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment.development"
import {
  MerchantData,
  RegisterMerchantForm,
} from "../interface/register-merchant-form"
import {
  addProduct,
  getMerchantProducts,
  productCategories,
} from "../interface/globalInterface"

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
}
