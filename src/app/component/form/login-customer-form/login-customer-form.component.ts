import { Component } from "@angular/core"
import { Validators, FormBuilder } from "@angular/forms"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { LoginToken } from "src/app/interface/login-token"
import { loginForm } from "src/app/interface/loginForm"
import { AuthService } from "src/app/service/auth.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-login-customer-form",
  templateUrl: "./login-customer-form.component.html",
})
export class LoginCustomerFormComponent {
  isPasswordVisible = false

  loginCustomerForm = this.fb.group({
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
  isSubmit = false
  async submitLogin() {
    if (this.loginCustomerForm.invalid) {
      this.loginCustomerForm.markAllAsTouched()
      this.loginCustomerForm.markAsDirty()
      this.Swal.SwalNotif("error", "Please fill in the form correctly")
      return
    }

    this.isSubmit = true
    try {
      const data: loginForm = {
        email: this.loginCustomerForm.controls["email"].value,
        username: null,
        password: this.loginCustomerForm.controls["password"].value,
        isEmailLogin: true,
      }
      const response = await lastValueFrom(this.authService.login(data))
      if ("token" in response && "expiresIn" in response) {
        const data: LoginToken = {
          token: String(response.token),
          expiresIn: String(response.expiresIn),
        }
        this.authService.setSession(data)
        const isCustomer = await lastValueFrom(this.authService.getIsCustomer())
        console.log(isCustomer)

        if (isCustomer.is_customer) {
          this.Swal.SwalNotifWithThen("success", "Login success").then(
            (result) => {
              location.reload()
            },
          )
        } else {
          this.authService.logout()
          this.Swal.SwalNotif(
            "You are not a customer",
            "Please login with a customer account.",
          )
        }
      }
      console.log(response)
    } catch (error) {
      console.log(error)
      this.authService.logout()
      this.Swal.SwalNotif("error", "Email or password is incorrect")
    }
    this.isSubmit = false
  }
}
