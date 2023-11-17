import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "src/environments/environment.development"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"
@Injectable({
  providedIn: "root",
})
export class ApiService {
  API_URL: string = environment.apiUrl
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
}
