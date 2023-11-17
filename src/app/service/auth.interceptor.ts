import { HttpInterceptor } from "@angular/common/http"

export class authInterceptor implements HttpInterceptor {
  intercept(req: any, next: any) {
    const token = localStorage.getItem("token")
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`),
      })
      return next.handle(authReq)
    } else {
      return next.handle(req)
    }
  }
}
