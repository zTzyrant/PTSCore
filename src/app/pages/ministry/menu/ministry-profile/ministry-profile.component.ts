import { Component } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { lastValueFrom } from "rxjs"
import { User } from "src/app/interface/user"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-ministry-profile",
  templateUrl: "./ministry-profile.component.html",
})
export class MinistryProfileComponent {
  userdata: User | undefined

  constructor(
    private Swal: SwalService,
    private apiService: ApiService,
    private titleService: Title,
  ) {
    this.titleService.setTitle("Profile Customer | Promo Tourism System")
  }

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
