import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  isSideBarOpen = false
  isModalLoginOpen = false

  setOpenSidebar(data: boolean) {
    this.isSideBarOpen = data
  }

  constructor() {}

  getImageMeta(url: string) {
    try {
      const img = new Image()
      img.src = url

      return {
        imgWidth: img.width,
        imgHeight: img.height,
        imgRatio: img.width / img.height,
      }
    } catch (error) {
      console.log("Error cannot get image meta", error)
      return false
    }
  }
}
