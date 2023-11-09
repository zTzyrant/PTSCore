export interface RegisterMerchantForm {
  company_name: string
  company_username: string
  contact_number: string
  email: string
  company_description: string
  address: string
  city: string
  state: string
  country: string
  status: string
  document: Array<documentMerchantForm>
}

export interface documentMerchantForm {
  file: File
  filename: string
  description: string
}
