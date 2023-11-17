import { Component } from "@angular/core"
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms"
import { SwalService } from "../../../service/swal.service"
import { documentMerchantForm } from "src/app/interface/register-merchant-form"
import { ApiService } from "src/app/service/api.service"
import { lastValueFrom } from "rxjs"

@Component({
  selector: "app-register-merchant-form",
  templateUrl: "./register-merchant-form.component.html",
  styleUrls: ["./register-merchant-form.component.css"],
})
export class RegisterMerchantFormComponent {
  registerMerchant: [] = []

  // Register merchant form
  formRegisterMerchant: FormGroup = this.fb.group({
    merchantName: ["", Validators.required],
    merchantUsername: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
        ),
      ],
    ],
    contactNumber: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,10}$/),
      ],
    ],
    merchantDescription: ["", [Validators.required]],
    address: ["", [Validators.required]],
    city: ["", [Validators.required]],
    state: ["", [Validators.required]],
    country: ["Indonesia", [Validators.required]],
  })

  companyDocument: any[] = []

  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private apiService: ApiService,
  ) {}

  // Submit register merchant form
  isMerchantDataSaved: boolean = false
  async submitRegisterMerchant() {
    if (this.formRegisterMerchant.invalid) {
      console.log(this.formRegisterMerchant.value)
      this.formRegisterMerchant.markAllAsTouched()
      this.formRegisterMerchant.markAsDirty()
      this.Swal.SwalNotif("Error", `Please check your input`)
      return
    }

    this.checkUsernameUsed()

    this.isMerchantDataSaved = true
    this.Swal.SwalNotif(
      "Success",
      `Register merchant success, please upload your company document or license.`,
    )
  }

  // checkMerchantData with registerd merchant by username
  async checkUsernameUsed() {
    if (this.formRegisterMerchant.controls["merchantUsername"].invalid) return
    try {
      const res = await lastValueFrom(
        this.apiService.checkIsUsernameExist(
          this.formRegisterMerchant.value.merchantUsername,
        ),
      )
      this.formRegisterMerchant.controls["merchantUsername"].setErrors({
        usernameUsed: null,
      })
      this.formRegisterMerchant.controls[
        "merchantUsername"
      ].updateValueAndValidity()
    } catch (error: unknown) {
      if (error instanceof Object) {
        if ("status" in error && error.status === 409) {
          this.formRegisterMerchant.controls["merchantUsername"].setErrors({
            usernameUsed: true,
          })
        }
      } else {
        this.formRegisterMerchant.controls["merchantUsername"].setErrors({
          usernameUsed: true,
        })

        this.Swal.SwalNotif("Error", `Something went wrong, please try again`)
      }
      console.log(error)
    }
  }

  // checkMerchantData with registerd merchant
  async checkEmailUsed() {
    if (this.formRegisterMerchant.controls["email"].invalid) return
    try {
      const res = await lastValueFrom(
        this.apiService.checkIsEmailExist(
          this.formRegisterMerchant.value.email,
        ),
      )
      this.formRegisterMerchant.controls["email"].setErrors({
        emailUsed: null,
      })
      this.formRegisterMerchant.controls["email"].updateValueAndValidity()
    } catch (error: unknown) {
      if (error instanceof Object) {
        if ("status" in error && error.status === 409) {
          this.formRegisterMerchant.controls["email"].setErrors({
            emailUsed: true,
          })
        }
      } else {
        this.formRegisterMerchant.controls["email"].setErrors({
          emailUsed: true,
        })

        this.Swal.SwalNotif("Error", `Something went wrong, please try again`)
      }
      console.log(error)
    }
  }

  // documents form array
  documents = new FormArray([this.documentFG])
  get documentFG(): FormGroup {
    return this.fb.group({
      file: [null, Validators.required],
      filename: ["", Validators.required],
      description: ["", Validators.required],
    })
  }

  get documentsControls(): FormGroup[] {
    return this.documents.controls as FormGroup[]
  }

  addDocument() {
    this.documents.push(this.documentFG)
  }

  removeDocumentForm(index: number) {
    this.documents.removeAt(index)
  }

  removeFileByIndex(index: number) {
    this.documents.controls[index].patchValue({
      file: null,
    })
  }

  inputFile(event: EventTarget | null, index: number) {
    this.documents.controls[index].controls["file"].markAllAsTouched()
    const fileInput = event as HTMLInputElement | null
    const files = fileInput?.files ? fileInput.files[0] : null
    if (files) {
      if (this.checkAllowedFiles(files)) {
        this.documents.controls[index].patchValue({
          file: files,
        })
      }
    }
  }

  // check file type and size
  checkAllowedFiles(files: File) {
    if (
      files.type === "image/png" ||
      files.type === "image/jpeg" ||
      files.type === "image/jpg" ||
      files.type === "application/pdf" ||
      files.type === "application/msword" ||
      files.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      if (files.size < 5000000) {
        console.log(`${files.name} is allowed`)
        return true
      } else {
        console.log(`${files.name} File size must be less than 5MB`)
        this.Swal.SwalNotif(
          "Error",
          `${files.name} File size must be less than 5MB`,
        )
        return false
      }
    } else {
      console.log(`${files.name} File type is not allowed`)
      this.Swal.SwalNotif("Error", `${files.name} File type is not allowed`)
      return false
    }
  }

  // submit all form data
  isSubmit: boolean = false
  async submitMerchantData() {
    this.checkEmailUsed()
    this.checkUsernameUsed()
    if (this.documents.invalid) {
      console.log(this.documents.value)
      this.documents.markAllAsTouched()
      this.documents.markAsDirty()
      this.Swal.SwalNotif("Error", `Please check your input`)
      return
    }

    if (this.formRegisterMerchant.invalid) {
      console.log(this.formRegisterMerchant.value)
      this.formRegisterMerchant.markAllAsTouched()
      this.formRegisterMerchant.markAsDirty()
      this.isMerchantDataSaved = false
      this.Swal.SwalNotif("Error", `Please check your merchant data`)
      return
    }

    this.isSubmit = true
    try {
      // convert form register merchant & documents to FormData
      // by using FormData() constructor we can send file to backend
      const formData = new FormData()
      this.documents.value.forEach((e: documentMerchantForm) => {
        formData.append("file", e.file)
        formData.append("filename", e.filename)
        formData.append("file_description", e.description)
      })
      formData.append(
        "company_name",
        this.formRegisterMerchant.value.merchantName,
      )
      formData.append(
        "company_username",
        this.formRegisterMerchant.value.merchantUsername,
      )
      formData.append(
        "contact_number",
        this.formRegisterMerchant.value.contactNumber,
      )
      formData.append("email", this.formRegisterMerchant.value.email)
      formData.append(
        "company_description",
        this.formRegisterMerchant.value.merchantDescription,
      )
      formData.append("address", this.formRegisterMerchant.value.address)
      formData.append("city", this.formRegisterMerchant.value.city)
      formData.append("state", this.formRegisterMerchant.value.state)
      formData.append("country", this.formRegisterMerchant.value.country)
      formData.append("status", "pending")
      console.log(formData)

      const res = await lastValueFrom(this.apiService.postMerchant(formData))
      if (res) {
        this.Swal.SwalNotifWithThen(
          "Success",
          `Register merchant success, Please wait for ministry approval.`,
        ).then(() => {
          this.isSubmit = false
          this.formRegisterMerchant.reset()
          this.documents.reset()
          this.isMerchantDataSaved = false
        })
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", `Register merchant failed, please try again`)
    }
  }
}
