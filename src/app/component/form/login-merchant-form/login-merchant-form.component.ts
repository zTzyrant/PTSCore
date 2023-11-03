import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"

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

  constructor(private fb: FormBuilder) {}

  // show or hide password
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }
}
