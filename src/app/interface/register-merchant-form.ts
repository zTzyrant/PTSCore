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

export interface MerchantData {
  _id: string
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
  document: Array<documentMerchantData> | null
  created_at: string
}

export interface documentMerchantData {
  _id: string
  url: string
  filename: string
  description: string
  created_at: string
}
