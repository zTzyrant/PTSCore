import { getMerchantProducts } from "./globalInterface"
import { MerchantData } from "./register-merchant-form"
import { User } from "./user"

export interface PostOrder {
  product_id: string
  date_travel: string
  number_of_guest: number
  note: string
}

export interface Invoice {
  // order data
  date_travel: string
  number_of_guest: number
  note: string

  // amount data and rate
  amount_usd: number
  amount_myr: number
  rate: number

  // status invoice (pending, paid, cancel)
  status: string

  // payment data 3rd party (Paypal)
  response_code: string | null
  response_stringify: string | null

  customer_id: string
  merchant_id: string
  product_id: string
  _id: string
  created_at: string
}

export interface getInvoice {
  message: string
  invoice: Invoice
  payment: object | null
  payment_url: string | null
}

export interface getMerchantOrders {
  _id: string

  // order data
  date_travel: string
  number_of_guest: number
  note: string

  // amount data and rate
  amount_usd: number
  amount_myr: number
  rate: number

  // status invoice (pending, paid, cancel)
  status: string

  // payment data 3rd party (Paypal)
  response_code: string | null
  response_stringify: string | null

  // relation data
  customer_id: string
  merchant_id: string
  product_id: string
  created_at: string

  // customer data
  user: User[]
  product: getMerchantProducts[]
}

export interface getInvoiceOrders extends Invoice {
  product: getMerchantProducts[]
  payment_url: string | null
  user: User[] | null
  merchant: MerchantData[] | null
}

export interface getInvoiceOrdersReview extends getInvoiceOrders {
  review: Review[]
}

export interface modalReview {
  invoice_id: string | null
  name: string | null
}

export interface postReview {
  rating: number
  comment: string
  is_recommend: boolean
}

export interface Review {
  _id: string
  // review data
  rating: number
  comment: string
  is_recommend: boolean
  // relation data
  invoice_id: string
  customer_id: string
  merchant_id: string
  product_id: string
  // created_at: string
  created_at: string
}

export interface ReviewUser extends Review {
  user: User[]
}
