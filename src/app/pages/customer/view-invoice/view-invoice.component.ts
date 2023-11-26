import { Component } from "@angular/core"
import { FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import { getInvoiceOrders } from "src/app/interface/payment"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import * as htmlToImage from "html-to-image"

@Component({
  selector: "app-view-invoice",
  templateUrl: "./view-invoice.component.html",
})
export class ViewInvoiceComponent {
  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params["id"]) {
      this.getInvoice()
    }
  }

  invoiceData: getInvoiceOrders | undefined
  async getInvoice() {
    try {
      const res = await lastValueFrom(
        this.apiService.getInvoiceById(this.route.snapshot.params["id"]),
      )
      this.invoiceData = res
      console.log(this.invoiceData)
    } catch (error) {
      console.log("Error", error)
      this.Swal.SwalNotif("Error", "Invoice not found")
    }
  }

  async validatePayment(id: string) {
    try {
      const res = await lastValueFrom(this.apiService.getPaymentStatus(id))
      this.Swal.SwalNotifWithThen("Success", "You avilable to do payment").then(
        () => {
          this.getInvoice()
        },
      )
    } catch (error: unknown) {
      console.log(error)
      this.Swal.SwalNotifWithThen(
        "Error Payment time expired",
        "Your payment time was expired, please create new order.",
      ).then(() => {
        this.getInvoice()
      })
    }
  }

  /**
   * generate png image
   * @param id invoice id
   * @see https://betterprogramming.pub/heres-why-i-m-replacing-html2canvas-with-html-to-image-in-our-react-app-d8da0b85eadf
   * i dont know why html2canvas not working in angular 17,
   * with tailwindcss but html-to-image is working fine, so i use html-to-image
   */
  isGeneratePDF = false
  async generatePDF(id: string) {
    this.isGeneratePDF = true
    const element = document.getElementById("invoice")
    if (element) {
      await htmlToImage.toCanvas(element).then(function (dataUrl) {
        let fileWidth = 208
        let fileHeight = (dataUrl.height * fileWidth) / dataUrl.width
        const FILEURI = dataUrl.toDataURL("image/png")
        let PDF = new jsPDF("p", "mm", "a4")
        let position = 0
        PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight)
        PDF.save(`invoice-${id}-${Date.now()}.pdf`)
      })
      this.isGeneratePDF = false
    }
  }

  /**
   * generate png image
   * @param id invoice id
   * @see https://betterprogramming.pub/heres-why-i-m-replacing-html2canvas-with-html-to-image-in-our-react-app-d8da0b85eadf
   * i dont know why html2canvas not working in angular 17,
   * with tailwindcss but html-to-image is working fine, so i use html-to-image
   */
  isGeneratePNG = false
  async generatePNG(id: string) {
    const element = document.getElementById("invoice")
    if (element) {
      this.isGeneratePNG = true
      await htmlToImage.toPng(element).then(function (dataUrl) {
        const virtualElement = document.createElement("a")
        virtualElement.href = dataUrl
        virtualElement.download = `invoice-${id}-${Date.now()}.pdf`
        virtualElement.click()
      })
      this.isGeneratePNG = false
    }
  }

  print() {
    window.print()
  }
}
