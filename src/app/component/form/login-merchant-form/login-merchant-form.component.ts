import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { LoginToken } from "src/app/interface/login-token"
import { loginForm } from "src/app/interface/loginForm"
import { AuthService } from "src/app/service/auth.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-login-merchant-form",
  templateUrl: "./login-merchant-form.component.html",
  styleUrls: ["./login-merchant-form.component.css"],
})
export class LoginMerchantFormComponent {
  isPasswordVisible = false

  loginMerchantForm = this.fb.group({
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/),
      ],
    ],
    password: ["", [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private authService: AuthService,
    private router: Router,
  ) {}

  // show or hide password
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  // submit form (login)
  async submitLogin() {
    if (this.loginMerchantForm.invalid) {
      this.loginMerchantForm.markAllAsTouched()
      this.loginMerchantForm.markAsDirty()
      this.Swal.SwalNotif("error", "Please fill in the form correctly")
      return
    }

    try {
      const data: loginForm = {
        email: this.loginMerchantForm.controls["email"].value,
        username: null,
        password: this.loginMerchantForm.controls["password"].value,
        isEmailLogin: true,
      }
      const response = await lastValueFrom(this.authService.login(data))
      if ("token" in response && "expiresIn" in response) {
        const data: LoginToken = {
          token: String(response.token),
          expiresIn: String(response.expiresIn),
        }
        this.authService.setSession(data)
        const isMerchant = await lastValueFrom(this.authService.getIsMerchant())
        if (isMerchant) {
          this.Swal.SwalNotifWithThen("success", "Login success").then(
            (result) => {
              this.router.navigate(["/merchant"])
            },
          )
        }
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("error", "Email or password is incorrect")
    }
  }
}
