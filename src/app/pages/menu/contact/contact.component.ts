import { Component } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Title } from "@angular/platform-browser"
import { lastValueFrom } from "rxjs"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent {
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private apiService: ApiService,
    private Swal: SwalService,
  ) {
    this.titleService.setTitle("Contact | Promo Tourism System")
  }

  contactForm: FormGroup = this.fb.group({
    fullname: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    message: ["", [Validators.required]],
  })

  isFetching = false
  async submit() {
    if (this.contactForm.invalid) {
      this.Swal.SwalNotif("error", "Please fill all the form")
      return
    }
    this.isFetching = true
    try {
      const response = await lastValueFrom(
        this.apiService.postContact({
          fullname: this.contactForm.value.fullname,
          email: this.contactForm.value.email,
          message: this.contactForm.value.message,
        }),
      )
      if (response) {
        this.Swal.SwalNotif("success", "Message sent successfully")
        this.contactForm.reset()
      }
    } catch (error) {
      console.log("Failed to send message", error)
      this.Swal.SwalNotif("error", "Failed to send message")
    }
    this.isFetching = false
  }
}
