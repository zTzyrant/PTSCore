import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { AuthService } from "../service/auth.service"

export const customerGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!token) {
    router.navigate(["/products"])
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    return false
  } else {
    try {
      const response = await lastValueFrom(authService.getIsCustomer())
      if (response.is_customer) {
        return true
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error) {
      console.log(error)
      router.navigate(["/products"])
      return false
    }
  }
}
