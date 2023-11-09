import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  isSideBarOpen = false

  setOpenSidebar(data: boolean) {
    this.isSideBarOpen = data
  }

  constructor() {}
}
