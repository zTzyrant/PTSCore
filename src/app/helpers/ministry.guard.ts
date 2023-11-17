import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { Router } from "@angular/router"
import { AuthService } from "../service/auth.service"
import { lastValueFrom } from "rxjs"

export const MinistryGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token") == null
  const router = inject(Router)

  if (token) {
    router.navigate(["/ministry/login"])
    localStorage.removeItem("token")
    localStorage.removeItem("expiresIn")
    return false
  } else {
    try {
      const response = await lastValueFrom(inject(AuthService).getIsMinistry())
      if (response) {
        return true
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error) {
      localStorage.removeItem("token")
      localStorage.removeItem("expiresIn")
      router.navigate(["/ministry/login"])
      return false
    }
  }
}

export const MinistryLoginGuard: CanActivateFn = async (route, state) => {
  const token = localStorage.getItem("token") == null
  const router = inject(Router)
  if (token) {
    return true
  } else {
    try {
      const response = await lastValueFrom(inject(AuthService).getIsMinistry())
      if (response) {
        router.navigate(["/ministry"])
        return false
      } else {
        throw new Error("Unauthorized")
      }
    } catch (error) {
      return true
    }
  }
}
