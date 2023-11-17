import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { Router } from "@angular/router"
import { AuthService } from "../service/auth.service"
import { lastValueFrom } from "rxjs"

export const MerchantGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!token) {
    router.navigate(["/merchant/login"])
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    return false
  } else {
    try {
      const response = await lastValueFrom(authService.getIsMerchant())
      if (response) {
        const isFirstLogin = await lastValueFrom(authService.getIsFirstLogin())
        if (isFirstLogin.isfirstlogin) {
          router.navigate(["/merchant/first-login"])
        }
        return true
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error: any) {
      console.log(error.status)
      localStorage.removeItem("token")
      localStorage.removeItem("expiresIn")
      router.navigate(["/merchant/login"])
      return false
    }
  }
}

export const MerchantFirstLoginGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!token) {
    router.navigate(["/merchant/login"])
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    return false
  } else {
    try {
      const response = await lastValueFrom(authService.getIsMerchant())
      if (response) {
        const isFirstLogin = await lastValueFrom(authService.getIsFirstLogin())
        if (isFirstLogin.isfirstlogin) {
          return true
        } else {
          router.navigate(["/merchant"])
          return false
        }
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error: any) {
      console.log(error.status)
      localStorage.removeItem("token")
      localStorage.removeItem("expiresIn")
      router.navigate(["/merchant/login"])
      return false
    }
  }
}

export const MerchantLoginGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token")
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!token) {
    return true
  } else {
    try {
      const response = await lastValueFrom(authService.getIsMerchant())
      if (response) {
        router.navigate(["/merchant"])
        return false
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error: any) {
      console.log(error.status)
      localStorage.removeItem("token")
      localStorage.removeItem("expiresIn")
      router.navigate(["/merchant/login"])
      return false
    }
  }
}
