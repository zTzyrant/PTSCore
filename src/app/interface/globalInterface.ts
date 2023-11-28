import { Review, ReviewUser } from "./payment"

export interface productCategories {
  categories: string[]
}

export interface addProduct {
  // product
  name: string | null
  number_of_guests: number | null
  price: number | null
  limit_order: number | null
  categories: string[] | null
  hotel_grade: string | null

  // facility
  include_wifi: boolean | null
  include_foods: boolean | null
  include_hotel: boolean | null
  include_transportation: boolean | null

  // address
  address: string | null
  city: string | null
  state: string | null
  post_code: string | null
  country: string | null

  // description
  description: string | null
}

export interface picturesProductForm {
  pictures: File
  url: string
}

export interface getMerchantProducts {
  // merchant id
  merchant_id: string

  // product
  _id: string
  name: string
  number_of_guests: number
  price: number
  limit_order: number
  categories: string[]
  hotel_grade: string

  // facility
  include_wifi: boolean
  include_foods: boolean
  include_hotel: boolean
  include_transportation: boolean

  // address
  address: string
  city: string
  state: string
  post_code: string
  country: string

  // description
  description: string

  // pictures
  pictures: Array<getProductPicture>

  // review
  reviews: Array<ReviewUser>

  // average rating
  average_rating: number | null

  created_at: string
}

export interface getProductPicture {
  _id: string
  product_id: string
  url: string
  filename: string
  size: number
  created_at: string
}

export interface getProducts {
  products: getMerchantProducts[]
  totalProducts: number
  totalPages: number
  currentPage: number
  next: string
  prev: string
}

export interface getTopProduct {
  _id: string
  name: string
  price: number
  product_sold: number
  amount_sold: number
}

export interface MerchantApprovedName {
  _id: string
  company_name: string
}

export interface MyMerchantStatistic {
  total_sold: number
  total_amount: number
  total_product: number
  top_product: string
}

export interface MerchantStatusStatistic {
  merchantCount: number
  pendingMerchant: number
  approvedMerchant: number
  rejectedMerchant: number
}
