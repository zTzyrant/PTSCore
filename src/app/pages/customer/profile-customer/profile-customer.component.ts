import { Component } from "@angular/core"
import { Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { User } from "src/app/interface/user"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-profile-customer",
  templateUrl: "./profile-customer.component.html",
})
export class ProfileCustomerComponent {
  userdata: User | undefined

  constructor(
    private router: Router,
    private Swal: SwalService,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    this.getUserData()
  }

  async getUserData() {
    try {
      const res = await lastValueFrom(this.apiService.getMyProfile())
      this.userdata = res
    } catch (error) {
      console.log("Error cannot get user data", error)
      this.Swal.SwalNotif("Error", "Failed to get user data")
    }
  }
}
