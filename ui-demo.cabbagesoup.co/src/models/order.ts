import { Product } from "./cart"

export type Order = {
    order_number: string,
    order_date: string,
    products: Product[],
    shipping_status: string,
    order_status: string,
    total: number
  }
  