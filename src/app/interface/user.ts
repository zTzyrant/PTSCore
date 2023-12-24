export interface User {
  id: string
  username: string
  email: string
  password: string
  fullname: string
  phone_number: string
  is_ministry: boolean
  is_merchant: boolean
  is_customer: boolean
  merchant_id: string | null
  date_of_birth: string | null
}
