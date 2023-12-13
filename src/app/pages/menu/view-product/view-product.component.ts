import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs/internal/lastValueFrom"
import {
  getMerchantProducts,
  getProductPicture,
} from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"
import { register } from "swiper/element/bundle"

// photoswipe
import PhotoSwipe from "photoswipe"
import { GlobalService } from "src/app/service/global.service"
import { AuthService } from "src/app/service/auth.service"
import { MerchantData } from "src/app/interface/register-merchant-form"
import { PostOrder } from "src/app/interface/payment"
import { Title } from "@angular/platform-browser"

@Component({
  selector: "app-view-product",
  templateUrl: "./view-product.component.html",
})
export class ViewProductComponent {
  product: getMerchantProducts | undefined
  merchantData: MerchantData | undefined

  images: getProductPicture[] = []
  lightbox_data: any = []

  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public globalService: GlobalService,
    private chageDetectorRef: ChangeDetectorRef,
    private titleService: Title,
  ) {
    this.titleService.setTitle("View Products | Promo Tourism System")
  }

  ngOnInit() {
    if (this.route.snapshot.params["id"]) {
      this.getProductById(this.route.snapshot.params["id"])
    }
  }

  isFetching: boolean = false
  async getProductById(id: string) {
    this.isFetching = true
    try {
      const data = await lastValueFrom(this.apiService.getProductById(id))
      this.product = data
      this.formOrder.controls["product_id"].setValue(data._id)
      this.formOrder.controls["number_of_guest"].setValidators([
        Validators.max(data.number_of_guests),
        Validators.min(1),
        Validators.required,
      ])
      if (data.pictures.length > 0) {
        this.images = data.pictures

        // Load items into the lightbox gallery
        this.lightbox_data = data.pictures.map((item) => {
          const imgSize = this.globalService.getImageMeta(item.url)
          return {
            src: item.url,
            alt: item.filename,
            height: imgSize && imgSize.imgHeight ? imgSize.imgHeight : "1000",
            width: imgSize && imgSize.imgWidth ? imgSize.imgWidth : "1000",
          }
        })

        // get merchant info
        const merchant = await lastValueFrom(
          this.apiService.getMerchantById(data.merchant_id),
        )
        this.merchantData = merchant
      }
      this.isFetching = false
      register()
      this.checkIfOverflowDiv()
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Error cannot get products")
    }
  }

  // lightbox refrence from
  // https://forum.ionicframework.com/t/photoswipe-5-lightbox-with-ionic-6-angular/222793
  lightbox_init: PhotoSwipe | undefined
  openLightbox(index: number = 0) {
    const options = {
      index: index,
      closeSVG: `<svg aria-hidden="true" class="pswp__icn" viewBox="0 0 512 512" width="100" height="125">
        <path d="M400 145.49L366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"/>
        </svg>`,
      zoom: false,
      arrowPrev: true,
      arrowNext: true,
      galery: "#gallery--responsive-images",
      bgOpacity: 1,
      dataSource: this.lightbox_data,
    }
    this.lightbox_init = new PhotoSwipe(options)
    // on() events go here (see below)
    this.lightbox_init.init()
  }

  // check if div or element is overflow it's still experimental start
  @ViewChild("productDesc") productDesc!: ElementRef
  isLineClamp: boolean = false
  isLineClampToggled = true
  checkIfOverflowDiv() {
    this.chageDetectorRef.detectChanges()
    if (this.productDesc) {
      const element = this.productDesc.nativeElement
      const isLineClamp = element.scrollHeight > element.clientHeight
      this.isLineClamp = isLineClamp
    }
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.checkIfOverflowDiv()
  }

  toggleLineClamp(bool: boolean) {
    this.isLineClampToggled = bool ? true : false
  }

  flatPickrConfig = {
    dateFormat: "Y-m-d",
    minDate: "today",
    // minDate: new Date(new Date().setDate(new Date().getDate() + 1)), // set min date to tomorrow
    altInput: true,
    altFormat: "F j, Y",
  }

  formOrder: FormGroup = this.fb.group({
    product_id: ["", [Validators.required]],
    date_travel: ["", [Validators.required]],
    number_of_guest: [null, [Validators.required, Validators.min(1)]],
    note: ["", [Validators.required, Validators.maxLength(200)]],
  })

  // checkout area
  isCheckout: boolean = false
  async checkOut() {
    console.log("checkout", this.formOrder.value)
    if (this.formOrder.invalid) {
      this.Swal.SwalNotif(
        "Info",
        "Please fill out all required order information.",
      )
      this.formOrder.markAllAsTouched()
      this.formOrder.markAsDirty()
      return
    }

    this.isCheckout = true
    if (this.authService.isLoggedIn()) {
      try {
        const res = await lastValueFrom(this.authService.getIsCustomer())
        if (res.is_customer) {
          this.isCheckout = true

          const order: PostOrder = {
            product_id: this.formOrder.value.product_id,
            date_travel: this.formOrder.value.date_travel,
            number_of_guest: this.formOrder.value.number_of_guest,
            note: this.formOrder.value.note,
          }
          try {
            const getInvoice = await lastValueFrom(
              this.apiService.postInvoice(order),
            )

            const getInvoicePay = await lastValueFrom(
              this.apiService.postInvoicePay(getInvoice.invoice._id),
            )

            console.log("Get Invoice Pay: ", getInvoicePay)
            console.log("Payment URL: ", getInvoicePay.payment_url)

            this.Swal.SwalNotifWithThenHtml(
              "Success generate invoice",
              "You will be redirected to the payment page, <br/>If you want to pay later, you can pay from your recent order page.",
            ).then(() => {
              // redirect to payment page
              if (getInvoicePay.payment_url) {
                window.open(getInvoicePay.payment_url, "_blank")
              }
            })
            this.isCheckout = false
          } catch (error) {
            console.log("Error post invoice", error)
            this.Swal.SwalNotif("Error", "Error cannot post invoice")
            this.isCheckout = false
          }
        }
      } catch (error) {
        console.log("Error valide user", error)
        this.Swal.SwalNotif("Info", "Please login first with customer account")
        this.isCheckout = false
      }
    } else {
      this.Swal.SwalNotifWithThen(
        "Info",
        "Please login first before checkout",
      ).then(() => {
        this.Swal.SwalNotifWithConfirm("Info", "Do you want to login?").then(
          (res) => {
            if (res.isConfirmed) {
              this.globalService.isModalLoginOpen = true
            }
          },
        )
      })
    }
    this.isCheckout = false
  }
}
