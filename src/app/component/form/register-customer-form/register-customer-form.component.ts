import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { lastValueFrom } from "rxjs"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-register-customer-form",
  templateUrl: "./register-customer-form.component.html",
})
export class RegisterCustomerFormComponent {
  addCustomerForm: FormGroup = this.fb.group({
    fullname: ["", [Validators.required]],
    username: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        ),
      ],
    ],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,10}$/),
        ,
      ],
    ],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
      ],
    ],
    phone_number: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    date_of_birth: ["", [Validators.required]],
    tos: [false, [Validators.requiredTrue]],
  })

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private Swal: SwalService,
  ) {}

  // checkMerchantData with registerd merchant by username
  async checkUsernameUsed() {
    if (this.addCustomerForm.controls["username"].invalid) return
    try {
      const res = await lastValueFrom(
        this.apiService.checkIsUsernameExist(
          this.addCustomerForm.value.username,
        ),
      )
      this.addCustomerForm.controls["username"].setErrors({
        usernameUsed: null,
      })
      this.addCustomerForm.controls["username"].updateValueAndValidity()
    } catch (error: unknown) {
      if (error instanceof Object) {
        if ("status" in error && error.status === 409) {
          this.addCustomerForm.controls["username"].setErrors({
            usernameUsed: true,
          })
        }
      } else {
        this.addCustomerForm.controls["username"].setErrors({
          usernameUsed: true,
        })

        this.Swal.SwalNotif("Error", `Something went wrong, please try again`)
      }
      console.log(error)
    }
  }

  // checkMerchantData with registerd merchant
  async checkEmailUsed() {
    if (this.addCustomerForm.controls["email"].invalid) return
    try {
      const res = await lastValueFrom(
        this.apiService.checkIsEmailExist(this.addCustomerForm.value.email),
      )
      this.addCustomerForm.controls["email"].setErrors({
        emailUsed: null,
      })
      this.addCustomerForm.controls["email"].updateValueAndValidity()
    } catch (error: unknown) {
      if (error instanceof Object) {
        if ("status" in error && error.status === 409) {
          this.addCustomerForm.controls["email"].setErrors({
            emailUsed: true,
          })
        }
      } else {
        this.addCustomerForm.controls["email"].setErrors({
          emailUsed: true,
        })

        this.Swal.SwalNotif("Error", `Something went wrong, please try again`)
      }
      console.log(error)
    }
  }

  isPasswordVisible = false
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  isSubmit = false
  async onSubmit() {
    console.log(this.addCustomerForm.value)
    if (this.addCustomerForm.invalid) {
      this.addCustomerForm.markAllAsTouched()
      this.addCustomerForm.markAsDirty()
      this.Swal.SwalNotif("Error", `Please fill all required field`)
      return
    }
    this.isSubmit = true
    try {
      const res = await lastValueFrom(
        this.apiService.postCustomer(this.addCustomerForm.value),
      )
      if (res) {
        this.Swal.SwalNotif("Success", `Register Customer Success`)
        this.addCustomerForm.reset()
      } else {
        throw res
      }
    } catch (error: unknown) {
      if (error instanceof Object) {
        if ("status" in error && error.status === 409) {
          this.Swal.SwalNotif(
            "Error",
            `Username or Email already used, please try again`,
          )
        }
        if (
          "error" in error &&
          error.error instanceof Object &&
          "message" in error.error
        ) {
          console.log(error.error.message)
          this.Swal.SwalNotif("Error", `${error.error.message}`)
        }
      } else {
        this.Swal.SwalNotif("Error", `Something went wrong, please try again`)
      }
      console.log(error)
    }
    this.isSubmit = false
  }
}
