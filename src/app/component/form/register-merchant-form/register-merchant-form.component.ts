import { Component, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { SwalService } from "../../../shared/service/swal.service"
import { RegisterMerchantForm } from "src/app/interface/register-merchant-form"
import { LocalstorageService } from "src/app/shared/service/localstorage.service"

@Component({
  selector: "app-register-merchant-form",
  templateUrl: "./register-merchant-form.component.html",
  styleUrls: ["./register-merchant-form.component.css"],
})
export class RegisterMerchantFormComponent {
  registerMerchant: any[] = []

  // Register merchant form
  formRegisterMerchant: FormGroup = this.fb.group({
    merchantName: ["", Validators.required],
    merchantUsername: [
      "",
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=[a-zA-Z0-9._]{6,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
        ),
      ],
    ],
    contactNumber: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(/^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/),
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
    private lsService: LocalstorageService
  ) {
    this.getLocalRegisterdMerchant()
  }

  // Submit register merchant form
  isSubmit: boolean = false
  isSubmitSuccess: boolean = false
  async submitRegisterMerchant() {
    if (this.formRegisterMerchant.invalid) {
      this.Swal.SwalNotif("Error", `Please check your input`)
      return
    }
    // // if (this.companyDocument.length < 1) {
    // //   this.Swal.SwalNotif(
    // //     "Error",
    // //     `Please upload your company document or license`
    // //   )
    // //   return
    // // }

    // localStorage.setItem(
    //   "registerMerchant",
    //   JSON.stringify([
    //     {
    //       merchantName: "Merchant Pertama 2",
    //       merchantUsername: "JanganRusak",
    //       contactNumber: "08213030429",
    //       email: "email@ac.ca",
    //       merchantDescription: "god",
    //       address: "Kfc  mekdi",
    //       city: "city",
    //       state: "of",
    //       country: "Indonesia",
    //       companyDocument: [],
    //     },
    //     this.formRegisterMerchant.value,
    //   ])
    // )

    // const lsRegisterMerchant = localStorage.getItem("registerMerchant")
    // if (lsRegisterMerchant) {
    //   const data = JSON.parse(lsRegisterMerchant)
    //   data.push(this.formRegisterMerchant.value)
    //   localStorage.setItem("registerMerchant", JSON.stringify(data))
    // } else {
    //   localStorage.setItem(
    //     "registerMerchant",
    //     JSON.stringify([this.formRegisterMerchant.value])
    //   )
    // }

    // this.Swal.SwalNotif("Success", `Register merchant success`)
    // this.isSubmitSuccess = true
    // console.log(this.formRegisterMerchant.value)
    this.isSubmitSuccess = true
    this.Swal.SwalNotif(
      "Success",
      `Register merchant success, please upload your company document or license.`
    )
  }

  // Get local registerd merchant
  async getLocalRegisterdMerchant() {
    this.registerMerchant = await this.lsService.getLocalRegisterdMerchant()
    console.log(this.registerMerchant)
  }

  // Check new merchant data with registerd merchant
  // TODO: checkMerchantData with registerd merchant
  checkEmailUsed(event: any) {
    const email = event.target.value
    const checkEmail = this.registerMerchant.find(
      (merchant) => merchant.email.toLowerCase() === email.toLowerCase()
    )

    if (checkEmail) {
      console.log("email used")
      this.formRegisterMerchant.controls["email"].setErrors({
        emailUsed: true,
      })
    }
  }

  // form submit doccument merchant
  isInputDocumentTouch: boolean = false

  // Document merchant form
  documentMerchantForm: FormGroup = this.fb.group({
    filename: ["", Validators.required],
    description: ["", Validators.required],
  })

  // check file type and size
  checkAllowedFile(files: any[]) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (
          files[i].type === "image/png" ||
          files[i].type === "image/jpeg" ||
          files[i].type === "image/jpg" ||
          files[i].type === "application/pdf" ||
          files[i].type === "application/msword" ||
          files[i].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          if (files[i].size < 5000000) {
            console.log(`${files[i].name} is allowed`)
          } else {
            console.log(`${files[i].name} File size must be less than 5MB`)
            this.Swal.SwalNotif(
              "Error",
              `${files[i].name} File size must be less than 5MB`
            )
            return false
          }
        } else {
          console.log(`${files[i].name} File type is not allowed`)
          this.Swal.SwalNotif(
            "Error",
            `${files[i].name} File type is not allowed`
          )
          return false
        }
      }
    }
    return true
  }

  // Remove document from companyDocument value
  removeDocument(index: number) {
    this.companyDocument.splice(index, 1)
    console.log(this.companyDocument)
  }

  // Files dropzone on hover prevent redirecting & add border bg color
  file_dropzone_leave: boolean = true
  dragFilesOver(event: any) {
    event.preventDefault()
    this.file_dropzone_leave = false
    this.isInputDocumentTouch = true
  }

  // Files dropzone leave disable class
  dragFilesLeave() {
    this.file_dropzone_leave = true
  }

  // When Files dropped set to form value
  filesDropped(event: any) {
    this.file_dropzone_leave = true
    event.preventDefault()
    const files = Array.from(event.dataTransfer.files)
    this.insertDocument(files)
  }

  // When Files selected set to form value
  inputFiles(event: any) {
    const files = Array.from(event.target.files)
    this.insertDocument(files)
    event.target.value = ""
    this.isInputDocumentTouch = true
  }

  // Insert files to companyDocument value
  insertDocument(files: any) {
    if (this.checkAllowedFile(files)) {
      Array.from(files).forEach((file: any) => {
        this.companyDocument.push(file)
      })
    }
  }

  submitDocumentMerchant() {
    if (this.documentMerchantForm.invalid) {
      this.Swal.SwalNotif("Error", `Please check your input`)
      return
    }
    this.isInputDocumentTouch = false

    let documentName: any = []
    this.companyDocument.forEach((file: any) => {
      documentName.push({
        filename: `${this.documentMerchantForm.controls["filename"].value}-${file.name}`,
        description: this.documentMerchantForm.controls["description"].value,
      })
    })
    let merchantData: RegisterMerchantForm = {
      id: this.lsService.generateId(
        this.formRegisterMerchant.controls["merchantUsername"].value
      ),
      merchantName: this.formRegisterMerchant.controls["merchantName"].value,
      merchantUsername:
        this.formRegisterMerchant.controls["merchantUsername"].value,
      contactNumber: this.formRegisterMerchant.controls["contactNumber"].value,
      email: this.formRegisterMerchant.controls["email"].value,
      merchantDescription:
        this.formRegisterMerchant.controls["merchantDescription"].value,
      address: this.formRegisterMerchant.controls["address"].value,
      city: this.formRegisterMerchant.controls["city"].value,
      state: this.formRegisterMerchant.controls["state"].value,
      country: this.formRegisterMerchant.controls["country"].value,
      doccument: documentName,
    }

    console.log(merchantData)
    this.lsService.saveLocalRegisteredMerchant(merchantData)
    this.formRegisterMerchant.reset()
    this.companyDocument = []
    this.documentMerchantForm.reset()
    this.isSubmitSuccess = false
    this.getLocalRegisterdMerchant()
    console.log("form has been reset")
  }
}
