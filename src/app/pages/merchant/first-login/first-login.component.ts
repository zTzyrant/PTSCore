import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { AuthService } from "src/app/service/auth.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-first-login",
  templateUrl: "./first-login.component.html",
})
export class FirstLoginComponent {
  formpassword = this.fb.group({
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/),
      ],
    ],
    confirmPassword: ["", [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private Swal: SwalService,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle("First Login | Promo Tourism System")
  }

  checkPasswordsMatch() {
    const password = this.formpassword.controls["password"].value
    const confirmPassword = this.formpassword.controls["confirmPassword"].value
    if (password !== confirmPassword) {
      this.formpassword.controls["confirmPassword"].setErrors({
        mismatch: true,
      })
    } else {
      this.formpassword.controls["confirmPassword"].setErrors(null)
      this.formpassword.controls["confirmPassword"].updateValueAndValidity()
    }
  }

  async submitRestPassword() {
    if (this.formpassword.invalid) {
      this.formpassword.markAllAsTouched()
      this.Swal.SwalNotif("error", "Please fill all the required fields")
      return
    }

    console.log(this.formpassword.value)
    try {
      const password = String(this.formpassword.controls["password"].value)
      const response = await lastValueFrom(
        this.authService.putResetPassword(password),
      )
      if (response) {
        this.Swal.SwalNotifWithThen("success", "Password reset success").then(
          () => {
            this.router.navigate(["/merchant/login"])
          },
        )
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("error", "Password reset failed")
    }
  }

  signOut() {
    this.Swal.SwalNotifWithConfirm(
      "Are you sure you want to logout?",
      "You will be redirected to login page",
    ).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
        this.router.navigate(["/merchant/login"])
      }
    })
  }
}
