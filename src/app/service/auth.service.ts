import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "src/environments/environment.development"
import { LoginToken } from "../interface/login-token"
import moment from "moment"
import { loginForm } from "../interface/loginForm"
import { SwalService } from "./swal.service"
import { Router } from "@angular/router"
import { Isfirstlogin } from "../interface/isfirstlogin"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  API_URL: string = environment.apiUrl

  constructor(
    private http: HttpClient,
    private Swal: SwalService,
    private router: Router,
  ) {}

  setSession(authResult: LoginToken) {
    const expiresIn = moment().add(authResult.expiresIn, "second")
    localStorage.setItem("token", authResult.token)
    localStorage.setItem("expiresIn", JSON.stringify(expiresIn.valueOf()))
  }

  login(data: loginForm) {
    return this.http.post(`${this.API_URL}/auth/login`, data)
  }

  logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration())
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  getExpiration() {
    const expiration = localStorage.getItem("expiresIn")
    if (expiration) {
      const expiresIn = JSON.parse(expiration)
      return moment(expiresIn)
    } else {
      return null
    }
  }

  getIsMinistry() {
    return this.http.get(`${this.API_URL}/auth/is-ministry`)
  }

  getIsMerchant() {
    return this.http.get(`${this.API_URL}/auth/is-merchant`)
  }

  getIsFirstLogin() {
    return this.http.get<Isfirstlogin>(`${this.API_URL}/auth/is-first-login`)
  }

  putResetPassword(password: string) {
    return this.http.put(`${this.API_URL}/auth/reset-password`, { password })
  }
}
