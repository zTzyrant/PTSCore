export interface RegisterMerchantForm {
  id: string
  merchantName: string
  merchantUsername: string
  contactNumber: string
  email: string
  merchantDescription: string
  address: string
  city: string
  state: string
  country: string
  doccument: Array<any>
}
