import { Component } from "@angular/core"
import { FormBuilder, Validators } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"
import { lastValueFrom } from "rxjs"
import {
  addProduct,
  getProductPicture,
  picturesProductForm,
} from "src/app/interface/globalInterface"
import { ApiService } from "src/app/service/api.service"
import { SwalService } from "src/app/service/swal.service"

@Component({
  selector: "app-add-edit-products",
  templateUrl: "./add-edit-products.component.html",
})
export class AddEditProductsComponent {
  categories: string[] = []
  isEditProduct = false

  productsForm = this.fb.group({
    // product
    name: ["", [Validators.required]],
    numberOfGuests: [1, [Validators.required, Validators.min(1)]],
    price: [10000, [Validators.required, Validators.min(10000)]],
    limitOrder: [1, [Validators.required, Validators.min(1)]],
    categories: [[], [Validators.required]],
    hotelGrade: [{ value: "-1", disabled: true }],

    // facility
    include_wifi: [false, [Validators.required]],
    include_foods: [false, [Validators.required]],
    include_hotel: [false, [Validators.required]],
    include_transportation: [false, [Validators.required]],

    // address
    address: ["", [Validators.required]],
    city: ["", [Validators.required]],
    state: ["", [Validators.required]],
    post_code: ["", [Validators.required]],
    country: ["Indonesia", [Validators.required]],

    // description
    description: ["", [Validators.required, Validators.maxLength(500)]],
  })

  constructor(
    private fb: FormBuilder,
    private Swal: SwalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getCategories()
    if (this.route.snapshot.params["id"]) {
      this.getProduct(this.route.snapshot.params["id"])
      this.isEditProduct = true
    }
  }

  setIncludeHotel() {
    const include_hotel = this.productsForm.controls["include_hotel"]
    const hotelGrade = this.productsForm.controls["hotelGrade"]
    if (!include_hotel.value) {
      hotelGrade.enable()
    } else {
      hotelGrade.disable()
      hotelGrade.setValue("-1")
    }
  }

  async getCategories() {
    try {
      const res = await lastValueFrom(this.apiService.getProductCategories())
      if (res.categories.length > 0) {
        console.log(res)
        this.categories = res.categories
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Failed to get categories")
    }
  }

  async submitForm() {
    if (this.productsForm.invalid) {
      this.Swal.SwalNotif("Error", "Please fill all required fields")
      return
    }

    if (this.product_pictures.length < 1) {
      this.product_pictures_touched = true
      this.Swal.SwalNotif("Error", "Please upload at least one picture")
      return
    }

    const product: addProduct = {
      name: this.productsForm.controls["name"].value,
      number_of_guests: this.productsForm.controls["numberOfGuests"].value,
      price: this.productsForm.controls["price"].value,
      limit_order: this.productsForm.controls["limitOrder"].value,
      categories: this.productsForm.controls["categories"].value,
      hotel_grade: this.productsForm.controls["hotelGrade"].value,
      include_wifi: this.productsForm.controls["include_wifi"].value,
      include_foods: this.productsForm.controls["include_foods"].value,
      include_hotel: this.productsForm.controls["include_hotel"].value,
      include_transportation:
        this.productsForm.controls["include_transportation"].value,
      address: this.productsForm.controls["address"].value,
      city: this.productsForm.controls["city"].value,
      state: this.productsForm.controls["state"].value,
      post_code: this.productsForm.controls["post_code"].value,
      country: this.productsForm.controls["country"].value,
      description: this.productsForm.controls["description"].value,
    }

    console.log(product)

    try {
      const res = await lastValueFrom(
        this.apiService.postMerchantProducts(product),
      )

      if (res._id) {
        // upload pictures
        const formData = new FormData()
        this.product_pictures.forEach((pic) => {
          formData.append("pictures", pic.pictures)
        })

        const res2 = await lastValueFrom(
          this.apiService.putPictruesProduct(res._id, formData),
        )

        if (res2) {
          this.Swal.SwalNotif("Success", "Product added successfully")
        } else {
          this.Swal.SwalNotif(
            "Success with error",
            "Success add product but failed to upload pictures",
          )
        }

        // then upload pictures
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Failed to add product")
    }
  }

  // product pictures
  product_pictures: picturesProductForm[] = []
  product_pictures_touched = false
  onFileChange(event: Event) {
    this.product_pictures_touched = true

    const target = event.target as HTMLInputElement
    const files = target.files as FileList
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (this.checkImageType(file)) {
        this.product_pictures.push({
          pictures: file,
          url: URL.createObjectURL(file),
        })
      }
    }
  }

  removePicture(index: number) {
    this.product_pictures.splice(index, 1)
  }

  checkImageType(file: File) {
    const imageType = /^image\/(jpeg|png|jpg)$/
    if (!file.type.match(imageType)) {
      this.Swal.SwalNotif(
        "Error",
        `Invalid image type ${file.name}, you can only upload image file (jpg, jpeg, png)`,
      )
      return false
    }

    if (file.size > 5 * 1024 * 1024) {
      this.Swal.SwalNotif(
        "Error",
        `Invalid image size ${file.name}, you can only upload image with size less than 5MB`,
      )
      return false
    }

    return true
  }

  clearAllPictures() {
    this.product_pictures = []
  }

  pictureGrabbed = false
  onPicDragOver(event: Event) {
    this.product_pictures_touched = true
    this.pictureGrabbed = true
    event.preventDefault()
  }

  onPicDragLeave() {
    this.pictureGrabbed = false
  }

  onPicDrop(event: DragEvent) {
    this.pictureGrabbed = false
    event.preventDefault()
    const files = event.dataTransfer?.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (this.checkImageType(file)) {
          this.product_pictures.push({
            pictures: file,
            url: URL.createObjectURL(file),
          })
        }
      }
    }
  }

  toFileSize(size: number) {
    return size > 1024
      ? size > 1048576
        ? Math.round(size / 1048576) + "mb"
        : Math.round(size / 1024) + "kb"
      : size + "b"
  }

  // get product for edit or delete product
  async getProduct(id: string) {
    try {
      const res = await lastValueFrom(
        this.apiService.getMerchantProductsById(id),
      )
      if (res) {
        this.productsForm.controls["name"].setValue(res.name)
        this.productsForm.controls["numberOfGuests"].setValue(
          res.number_of_guests,
        )
        this.productsForm.controls["price"].setValue(res.price)
        this.productsForm.controls["limitOrder"].setValue(res.limit_order)
        this.productsForm.controls["categories"].patchValue(
          res.categories as any,
        )
        this.productsForm.controls["hotelGrade"].setValue(res.hotel_grade)
        if (res.hotel_grade) {
          this.productsForm.controls["hotelGrade"].enable()
        }
        this.productsForm.controls["include_wifi"].setValue(res.include_wifi)
        this.productsForm.controls["include_foods"].setValue(res.include_foods)
        this.productsForm.controls["include_hotel"].setValue(res.include_hotel)
        this.productsForm.controls["include_transportation"].setValue(
          res.include_transportation,
        )
        this.productsForm.controls["address"].setValue(res.address)
        this.productsForm.controls["city"].setValue(res.city)
        this.productsForm.controls["state"].setValue(res.state)
        this.productsForm.controls["post_code"].setValue(res.post_code)
        this.productsForm.controls["country"].setValue(res.country)
        this.productsForm.controls["description"].setValue(res.description)

        this.isUpdateProduct = true
        if (res.pictures.length > 0) {
          res.pictures.forEach((pic) => {
            this.pictureProduct.push({
              _id: pic._id,
              product_id: pic.product_id,
              url: pic.url,
              filename: pic.filename,
              size: pic.size,
              created_at: pic.created_at,
            })
          })
          this.isUpdateProductWithPictures = true
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  // check if edit product
  isUpdateProduct = false
  isUpdateProductWithPictures = false

  // product pictures for edit
  pictureProduct: getProductPicture[] = []
  removedPictureProductId: string[] = []

  /* first check if isUpdateProductWithPictures then
   * check if old product pictures and new product pictures is null
   */
  isEditProductPictureNull() {
    if (this.pictureProduct.length < 1 && this.isUpdateProductWithPictures) {
      if (this.product_pictures.length < 1 && this.product_pictures_touched) {
        return true
      }
    }
    return false
  }

  // remove old picture product
  removePictureProduct(index: number) {
    this.product_pictures_touched = true
    if (this.pictureProduct[index]._id) {
      this.removedPictureProductId.push(this.pictureProduct[index]._id)
    }
    this.pictureProduct.splice(index, 1)
  }

  resetEditProduct() {
    this.isUpdateProduct = false
    this.isUpdateProductWithPictures = false
    this.pictureProduct = []
    this.removedPictureProductId = []
    this.product_pictures = []
    this.getProduct(this.route.snapshot.params["id"])
  }

  // edit product submit
  async updateProduct() {
    console.info("Edited Product", this.productsForm.value)
    console.info("Edited Product Pictures", {
      oldPicture: this.pictureProduct,
      removedPicture: this.removedPictureProductId,
      newPictureFile: this.product_pictures,
    })

    if (this.productsForm.invalid) {
      this.Swal.SwalNotif("Error", "Please fill all required fields")
      return
    }

    if (this.isEditProductPictureNull()) {
      this.Swal.SwalNotif("Error", "Please upload at least one picture")
      return
    }

    // create product<addProduct> object for submit to api
    const product: addProduct = {
      name: this.productsForm.controls["name"].value,
      number_of_guests: this.productsForm.controls["numberOfGuests"].value,
      price: this.productsForm.controls["price"].value,
      limit_order: this.productsForm.controls["limitOrder"].value,
      categories: this.productsForm.controls["categories"].value,
      hotel_grade: this.productsForm.controls["hotelGrade"].value,
      include_wifi: this.productsForm.controls["include_wifi"].value,
      include_foods: this.productsForm.controls["include_foods"].value,
      include_hotel: this.productsForm.controls["include_hotel"].value,
      include_transportation:
        this.productsForm.controls["include_transportation"].value,
      address: this.productsForm.controls["address"].value,
      city: this.productsForm.controls["city"].value,
      state: this.productsForm.controls["state"].value,
      post_code: this.productsForm.controls["post_code"].value,
      country: this.productsForm.controls["country"].value,
      description: this.productsForm.controls["description"].value,
    }

    try {
      const res = await lastValueFrom(
        this.apiService.putMerchantProductsById(
          this.route.snapshot.params["id"],
          product,
        ),
      )
      if (res) {
        // upload new pictures
        if (this.product_pictures.length > 0) {
          const formData = new FormData()
          this.product_pictures.forEach((pic) => {
            formData.append("pictures", pic.pictures)
          })

          await lastValueFrom(
            this.apiService.putPictruesProduct(
              this.route.snapshot.params["id"],
              formData,
            ),
          )
        }

        // remove old pictures
        if (this.removedPictureProductId.length > 0) {
          await lastValueFrom(
            this.apiService.patchProductPictures(
              this.route.snapshot.params["id"],
              this.removedPictureProductId,
            ),
          )
        }

        // if no error notify success
        this.Swal.SwalNotif("Success", "Product updated successfully")
      }
    } catch (error) {
      console.log(error)
      this.Swal.SwalNotif("Error", "Failed to update product")
    }
  }

  async deleteProduct() {
    this.Swal.SwalNotifWithConfirm(
      "Warning",
      "Are you sure to delete this product?",
    ).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await lastValueFrom(
            this.apiService.deleteMerchantProductsById(
              this.route.snapshot.params["id"],
            ),
          )
          if (res) {
            this.Swal.SwalNotifWithThen(
              "Success",
              "Product deleted successfully",
            ).then(() => {
              this.router.navigate(["/merchant/products"])
            })
          }
        } catch (error) {
          console.log(error)
          this.Swal.SwalNotif("Error", "Failed to delete product")
        }
      }
    })
  }
}
