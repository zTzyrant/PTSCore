import { Component } from "@angular/core"
import { lastValueFrom } from "rxjs"
import { User } from "src/app/interface/user"
import { ApiService } from "src/app/service/api.service"

@Component({
  selector: "app-merchant-account",
  templateUrl: "./merchant-account.component.html",
  styleUrl: "./merchant-account.component.css",
})
export class MerchantAccountComponent {
  constructor(private apiService: ApiService) {
    this.getMyProfile()
  }

  account: User | null = null

  async getMyProfile() {
    try {
      const response = await lastValueFrom(this.apiService.getMyProfile())
      this.account = response
      console.log("account: ", this.account.fullname)
    } catch (error) {
      console.log("Failed to get my profile: ", error)
    }
  }
}
