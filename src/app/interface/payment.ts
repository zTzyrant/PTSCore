export interface PostOrder {
  product_id: string
  date_travel: string
  number_of_guest: number
  note: string
}

export interface Invocie {
  // order data
  date_travel: string
  number_of_guest: number
  note: string

  // amount data and rate
  amount_usd: number
  amount_idr: number
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
  invoice: Invocie
  payment: object | null
  payment_url: string | null
}
